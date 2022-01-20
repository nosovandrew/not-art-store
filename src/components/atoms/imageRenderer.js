import { useState } from 'react';
import Image from 'next/image';

export default function ImageRenderer({ src, alt, ...props }) {
    const [isLoaded, setIsLoaded] = useState(false); // loading state

    return (
        <>
            {!isLoaded && <div className='absolute w-inherit h-inherit bg-gray-300 rounded-sm'></div>}
            <Image
                onLoadingComplete={() => setIsLoaded(true)} // runs when next/image is loaded
                src={src}
                alt={alt}
                {...props} // next/image layout props
            />
        </>
    );
}
