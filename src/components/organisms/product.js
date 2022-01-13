import Image from 'next/image';

import ProductForm from '@/components/molecules/productForm'

export default function Product({ product }) {

    return (
        <div>
            <Image
                src={product.images.edges[0].node.url}
                alt={product.images.edges[0].node.altText}
                layout='fixed'
                width={300}
                height={300}
                quality={95}
            />
            <ProductForm product={product} />
        </div>
    );
}

