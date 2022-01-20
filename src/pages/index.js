import { formatPrice } from '@/utils/formats';
import { getProductList } from '@/lib/shopify/product';

import Layout from '@/components/templates/layout';
import ProductPreview from '@/components/molecules/productPreview';

export default function Main({ products }) {
    return (
        <Layout>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 justify-items-center'>
                {products.map((_product, _index) => (
                    <ProductPreview
                        key={_index}
                        itemPath={`/items/${_product.node.handle}`}
                        imageSrc={_product.node.images.edges[0].node.url}
                        imageAlt={_product.node.images.edges[0].node.altText}
                        title={_product.node.title}
                        price={formatPrice(_product.node.priceRange.minVariantPrice.amount)}
                        availableForSale={_product.node.availableForSale}
                    />
                ))}
            </div>
        </Layout>
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
