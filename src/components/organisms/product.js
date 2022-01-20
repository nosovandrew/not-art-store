import ProductForm from '@/components/molecules/productForm';
import ImageRenderer from '@/components/atoms/imageRenderer';

export default function Product({ product }) {
    const { title, availableForSale } = product;

    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] m-4 drop-shadow-pixel'>
                <ImageRenderer
                    src={product.images.edges[0].node.url}
                    alt={product.images.edges[0].node.altText}
                    layout='intrinsic'
                    width={900}
                    height={900}
                    quality={95}
                />
            </div>
            {/* check if product is abailable for sale (in stock) */}
            {
                availableForSale ? (
                    <ProductForm product={product} />
                ) : (
                    <div className='flex flex-col items-center m-4 space-y-4'>
                        <h1>{title}</h1>
                        <p className='text-red-500 px-4 py-2 border-red-500 border-2'>Нет в наличии</p>
                    </div>
                )
            }
        </div>
    );
}
