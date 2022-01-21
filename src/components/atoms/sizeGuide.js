import { useState } from 'react';

export default function SizeGuide() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='w-full border-2 border-black flex flex-col'>
            <button className='px-4 py-2' onClick={() => setIsOpen(true)}>
                Размерная таблица
            </button>
            {isOpen && (
                <>
                    <ul className='mt-4 text-center space-y-2'>
                        <li>S — 25x25см</li>
                        <li>M — 50x50см</li>
                        <li>L — 75x75см</li>
                    </ul>
                    <button className='mt-4 pt-2 pb-6' onClick={() => setIsOpen(false)}>Закрыть</button>
                </>
            )}
        </div>
    );
}
