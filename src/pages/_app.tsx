import { NextPage } from "next";
import { AppProps } from "next/app"
import { Header } from "../components/Header";
import "../styles/global.scss";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return <>
    <Header />
    <Component {...pageProps} />;
  </>
}

export default MyApp;
