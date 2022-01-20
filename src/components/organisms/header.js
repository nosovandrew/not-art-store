import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

import { CartContext } from '@/context/cart/context';

export default function Header() {
    const { cart } = useContext(CartContext);

    return (
        <div className='flex flex-col items-center mb-4 lg:mb-20'>
            <Link href='/' passHref>
                <a className='link-wrapper mb-8'>
                    <Image
                        src='/assets/logo.png'
                        alt='Логотип Not Art Store' 
                        layout='fixed'
                        width={120}
                        height={97}
                    />
                </a>
            </Link>
            <Link href='/cart'>
                <a className='link-wrapper'>
                    {`Корзина ${cart.length ? `(${cart.length})` : ''}`}
                </a>
            </Link>
        </div>
    );
}
