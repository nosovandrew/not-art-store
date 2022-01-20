import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center'>
            <h1 className='mb-4'>Страница не найдена :(</h1>
            <Link href='/'>
                <a className='link-wrapper button'>
                    На главную
                </a>
            </Link>
        </div>
    );
}
