import { NextPage } from "next";
import { AppProps } from "next/app"
import { Header } from "../components/Header";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import "../styles/global.scss";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return <NextAuthProvider session={pageProps.session}>
    <Header />
    <Component {...pageProps} />
  </NextAuthProvider>
}

export default MyApp;
