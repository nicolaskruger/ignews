import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../service/stripe";
import styles from "./home.module.scss";

type Result = {
  product: {
    priceId: string,
    amount: number
  }
}

const formatDollar = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}

const Home: NextPage<Result> = ({ product }) => {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1> News about the <span>React</span> world.</h1>
          <p>
            get access to all the publications <br />
            <span>for {formatDollar(product.amount)} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<Result> = async () => {
  const price = await stripe.prices.retrieve("price_1K7PXOHiZTVAcD3pPgWLXytF");

  const product = {
    priceId: price.id,
    amount: (price.unit_amount / 100),
  }

  return ({
    props: {
      product: {
        ...product
      },
    },
    revalidate: 60 * 60 * 24 // 24 h
  });
}

export default Home;
