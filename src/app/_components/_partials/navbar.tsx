'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    const navItems = [
        { label: 'Data Diri', path: '/' },
        { label: 'Program', path: '/pages/program' },
        { label: 'Akomodasi', path: '/pages/akomodasi' },
        { label: 'Konfirmasi', path: '/pages/konfirmasi' },
    ];

    return (
        <nav className="w-auto">
            <div className="w-auto mx-auto">
                <div className="w-auto flex flex-row  items-center justify-center lg:gap-6  gap-2 py-4 ">
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