import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../service/primic";
import styles from "./styles.module.scss";
import Prismic from "@prismicio/client";

const Posts: NextPage = () => {
    return (
        <>
            <Head>
                <title>
                    Posts | Ignews
                </title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    {"_".repeat(3).split("").map((_, index) => (
                        <a href="#" key={index}>
                            <time>
                                12 de março de 2021
                            </time>
                            <strong>
                                Creating a Monorepo with Lerna & Yarn Workspaces
                            </strong>
                            <p>
                                In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process.
                            </p>

                        </a>
                    ))}
                </div>
            </main>
        </>
    )
}

export default Posts

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.predicates.at("document.type", "publication")
    ], {
        fetch: ['publication.title', 'publication.content'],
    }
    )

    return ({
        props: {

        },
        revalidate: 60 * 60 // 1h
    })
}
