import { formatPrice } from '@/utils/formats';

import ImageRenderer from '@/components/atoms/imageRenderer';
import QtyManager from '@/components/atoms/qty';

export default function CartItem({
    id,
    imageSrc,
    imageAlt,
    title,
    variantTitle,
    variantQuantity,
    variantPrice,
}) {
    return (
        <div className='p-4 w-full flex items-start space-x-8 border-black border-2'>
            <div className='drop-shadow-pixel'>
                <ImageRenderer
                    src={imageSrc}
                    alt={imageAlt}
                    layot='fixed'
                    width={80}
                    height={80}
                />
            </div>
            <div className='flex flex-col items-start justify-start space-y-2'>
                <h3>{`${title} ${variantTitle}`}</h3>
                <p>{formatPrice(variantPrice)}</p>
                <QtyManager itemId={id} itemQty={variantQuantity} />
            </div>
        </div>
    );
}
