import Header from '@/components/organisms/header';

export default function Layout({ children }) {
    return (
        <div className='p-4 lg:p-20'>
            <Header />
            <main>{children}</main>
            <footer className='text-center mt-4 lg:mt-20'>
                <span className='text-ocean'>ecommerce.</span>
                <span className='text-palm'>sample.</span>
                <span className='text-miami-pink'>webnos</span>
            </footer>
        </div>
    );
}