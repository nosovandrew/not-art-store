import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel='preconnect'
                        href='https://fonts.googleapis.com'
                    />
                    <link
                        rel='preconnect'
                        href='https://fonts.gstatic.com'
                        crossOrigin='true'
                    />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'
                        rel='stylesheet'
                    />
                </Head>
                <body className='font-primary text-black bg-ivory'>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}