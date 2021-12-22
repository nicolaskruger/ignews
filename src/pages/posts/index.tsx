import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../service/primic";
import styles from "./styles.module.scss";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

type Post = {
    slug: string,
    title: string,
    excerpt: string,
    updatedAt: string,
}

type Result = {
    posts: Post[]
}

const Posts: NextPage<Result> = ({ posts }) => {
    return (
        <>
            <Head>
                <title>
                    Posts | Ignews
                </title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map((post) => (
                        <a href="#" key={post.slug}>
                            <time>
                                {post.updatedAt}
                            </time>
                            <strong>
                                {post.title}
                            </strong>
                            <p>
                                {post.excerpt}
                            </p>

                        </a>
                    ))}
                </div>
            </main>
        </>
    )
}

export default Posts

export const getStaticProps: GetStaticProps<Result> = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.predicates.at("document.type", "publication")
    ], {
        fetch: ['publication.title', 'publication.content'],
    }
    )

    const posts: Post[] = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === "paragraph")?.text ?? "",
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: "numeric"
            })
        }
    })

    return ({
        props: {
            posts
        },
        revalidate: 60 * 60 // 1h
    })
}
