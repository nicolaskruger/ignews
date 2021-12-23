import { query as q } from "faunadb";
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { fauna } from "../../../service/fauna";

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: 'read:user'
                }
            }
        }),
    ],
    callbacks: {
        session: async ({ session }) => {
            try {
                const useActiveSubscription = await fauna.query(
                    q.Get(
                        q.Intersection(
                            [q.Match(
                                q.Index('subscription_by_user_ref'),
                                q.Select(
                                    "ref",
                                    q.Get(
                                        q.Match(
                                            q.Index('user_by_email'),
                                            q.Casefold(session.user.email)
                                        )
                                    )
                                )
                            ),
                            q.Match(
                                q.Index("subscription_by_status"),
                                "active"
                            )]
                        )
                    )
                )
                return { ...session, activeSubscription: useActiveSubscription }

            } catch (error) {
                return { ...session, activeSubscription: null }
            }
        },
        signIn: async ({ user, account, profile }) => {


            const { email } = user;

            try {
                const user = await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(email)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'),
                            { data: { email } }
                        ),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(email)
                            )
                        )
                    )
                )

                return true;
            } catch (error) {
                console.error(error)
                return false;
            }
        }
    }
})