import { DefaultSeo } from 'next-seo';

import CartContextProvider from '@/context/cart/context';
import '../styles/globals.css';
import { SEO } from '../../seo.config';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <DefaultSeo {...SEO} />
            <CartContextProvider>
                <Component {...pageProps} />
            </CartContextProvider>
        </>
    );
}

export default MyApp;
