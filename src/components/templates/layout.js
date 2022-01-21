import Header from '@/components/organisms/header';

export default function Layout({ children }) {
    return (
        <div className='min-h-screen flex flex-col justify-between p-4 lg:p-20'>
            <Header />
            <main>{children}</main>
            <footer className='flex flex-col items-center justify-center lg:flex-row mt-4 lg:mt-20'>
                <span className='text-ocean'>ecommerce.</span>
                <span className='text-palm'>sample.</span>
                <span className='text-miami-pink'>webnos</span>
            </footer>
        </div>
    );
}
