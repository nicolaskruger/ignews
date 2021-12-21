import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { fauna } from "../../service/fauna";
import { stripe } from "../../service/stripe";
import { query as q } from "faunadb";

type User = {
    ref: {
        id: string
    },
    data: {
        email: string,
        stripe_customer_id: string
    }
}

const subscribe = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {


        const session = await getSession({ req })

        const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email)
                )
            )
        )

        let cutumerId = user.data.stripe_customer_id;

        if (!cutumerId) {
            const stripeCustomer = await stripe.customers.create({
                email: session.user.email,
            })
            cutumerId = stripeCustomer.id;
        }


        await fauna.query(
            q.Update(
                q.Ref(q.Collection("users"), user.ref.id),
                {
                    data: {
                        stripe_customer_id: cutumerId
                    }
                }
            )
        )

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: cutumerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { price: "price_1K7PXOHiZTVAcD3pPgWLXytF", quantity: 1 }
            ],
            mode: "subscription",
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCES_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        });
        return res.status(200).json({
            sessionId: stripeCheckoutSession.id
        });
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method not allowed");
    }
}

export default subscribe;