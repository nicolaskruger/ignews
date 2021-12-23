import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { getPrismicClient } from "../../service/primic";
import { getSession } from "next-auth/react";
import { RichText } from "prismic-dom";
import styles from "./post.module.scss"

type PostType = {
    slug: string,
    title: string,
    content: string,
    updatedAt: string,
}

type Result = {
    post: PostType
}

const Post: NextPage<Result> = ({ post }) => {
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
                    <div className={styles.postContent}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<Result> = async ({ req, params }) => {
    const session = await getSession({ req });

    const { slug } = params;

    const prismic = getPrismicClient(req);

    const response = await prismic.getByUID('publication', String(slug), {

    });

    const post: PostType = {
        slug: String(slug),
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: "numeric"
        })
    }
    return {
        props: {
            post
        }
    }

}


export default Post;