import { NextPage } from "next";
import style from "../styles/home.module.scss";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Início | IgNews</title>
      </Head>

      <h1 className={style.title}>
        Hello <span>Word</span>
      </h1>
    </>
  )
}

export default Home;
