import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { getAllSlugs, getProductByHandle } from '@/lib/shopify/product';

import Product from '@/components/organisms/product';
import Layout from '@/components/templates/layout';

export default function StoreItem({ product }) {
    const router = useRouter();
    // show `loader` if page isn't pre-rendered
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <NextSeo
                title={product.title}
                description={product.description}
            />
            <Product product={product} />
        </Layout>
    );
}

export async function getStaticPaths() {
    const slugs = await getAllSlugs();

    const paths = slugs.map((_item) => {
        const slug = String(_item.node.handle);

        return {
            params: { slug },
        };
    });

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    const product = await getProductByHandle(params.slug);

    if (!product) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            product,
        },
        revalidate: 300,
    };
}
