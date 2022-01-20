import Link from 'next/link';

import ImageRenderer from '@/components/atoms/imageRenderer';

export default function ProductPreview({ itemPath, imageSrc, imageAlt, title, price, availableForSale }) {
    return (
        <Link href={itemPath} passHref>
            <a className='link-wrapper'>
                <div className='flex flex-col items-center p-4 cursor-pointer space-y-4'>
                    <div className='w-[250px] h-[250px] m-4'>
                        <ImageRenderer
                            src={imageSrc}
                            alt={imageAlt}
                            layout='intrinsic'
                            width={900}
                            height={900}
                        />
                    </div>
                    <p className='text-center'>{title}</p>
                    {
                        availableForSale ? (
                            <p className='text-center'>{price}</p>
                        ) : (
                            <p className='text-center'>Нет в наличии</p> 
                        )
                    }
                </div>
            </a>
        </Link>
    );
}
