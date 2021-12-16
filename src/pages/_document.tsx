import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html lang="en">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,900&display=swap" rel="stylesheet" />
                    <title>IgNews</title>
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}