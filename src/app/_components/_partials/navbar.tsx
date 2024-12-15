'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    const navItems = [
        { label: 'Data Diri', path: '/' },
        { label: 'Program', path: '/program' },
        { label: 'Akomodasi', path: '/akomodasi' },
        { label: 'Konfirmasi', path: '/konfirmasi' },
    ];

    return (
        <nav className="w-full">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-row  items-center justify-center gap-8 py-4 ">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`relative px-2 py-1 transition-all duration-200 ${
                                pathname === item.path
                                    ? 'font-bold text-black'
                                    : 'text-gray-600 hover:text-main-color'
                            }`}
                        >
                            {item.label}
                            {pathname === item.path && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400" />
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;