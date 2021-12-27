import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getPrismicClient } from "../../../service/primic";
import { getSession, useSession } from "next-auth/react";
import { RichText } from "prismic-dom";
import styles from "../post.module.scss"
import Prismic from "@prismicio/client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";


type PostType = {
    slug: string,
    title: string,
    content: string,
    updatedAt: string,
}

type Result = {
    post: PostType
}

const PostPreview: NextPage<Result> = ({ post }) => {

    const { data: session } = useSession();

    const { push } = useRouter();

    useEffect(() => {
        if (session?.activeSubscription) {
            push(`/posts/${post.slug}`)
        }
    }, [session])

    return (
        <>
            <head>
                <title>
                    {post.title} | Ignews
                </title>
            </head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>
                        {post.title}
                    </h1>
                    <time>
                        {post.updatedAt}
                    </time>
                    <div className={`${styles.postContent} ${styles.previewContent}`}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className={styles.continueReading}>
                        Wanna continue reading ?
                        <Link href="/">
                            <a>Subscribe now 🤗</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    )
}

type Path = {
    slug: string
}

export const getStaticPaths: GetStaticPaths<Path> = async () => {

    const prismic = getPrismicClient();


    const response = await prismic.query([
        Prismic.predicates.at("document.type", "publication")
    ], {
        fetch: [],
    }
    )

    return {
        paths: response.results.map(post => ({ params: { slug: post.uid } })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<Result> = async ({ params }) => {


    const { slug } = params;


    const prismic = getPrismicClient();

    const response = await prismic.getByUID('publication', String(slug), {

    });

    const post: PostType = {
        slug: String(slug),
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: "numeric"
        })
    }
    return {
        props: {
            post
        },
        revalidate: 60 * 60 * 24 // 24h
    }

}


export default PostPreview;