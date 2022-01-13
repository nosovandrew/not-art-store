import Image from 'next/image';
import Link from 'next/link';

import { formatPrice } from '@/utils/formats';
import { getProductList } from '@/lib/shopify/product';

export default function Main({ products }) {
    return (
        <>
            <h1>Hello E-commerce world!</h1>
            <ul>
                {products.map((_product, _index) => (
                    <li key={_index}>
                        <Link href={`/items/${_product.node.handle}`} passHref>
                            <a>
                                <Image
                                    src={_product.node.images.edges[0].node.url}
                                    alt={_product.node.images.edges[0].node.altText}
                                    width={200}
                                    height={200}
                                />
                                <h2>{_product.node.title}</h2>
                                <span>{formatPrice(_product.node.priceRange.minVariantPrice.amount)}</span>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export async function getStaticProps() {
    // get products from Shopify
    const products = await getProductList();

    // return 404 page if date wasn't fetched
    if (!products) {
        return {
            notFound: true,
        };
    }

    // revalidate set the time (in sec) of re-generate page (it imitate SSR)
    return {
        props: { products },
        revalidate: 300,
    };
}
