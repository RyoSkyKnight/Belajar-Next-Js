import { FC } from "react";

interface TabListProps {
    label: string;
    value: string | number;
    isActive?: boolean;
    onClick?: (value: string | number) => void;
}

const TabList: FC<TabListProps> = ({ label, value, isActive = false, onClick }) => {
    const handleClick = () => {
        if (onClick) {
            onClick(value);
        }
    };

    return (
        <li
            onClick={handleClick}
            className={`
                w-auto
                border
                py-2
                px-3
                cursor-pointer
                rounded-[10px]
                text-sm
                hover:bg-gray-100
                focus:outline-none
                focus:ring-2
                focus:ring-opacity-50
                transition-all
                duration-200
                ${
                    isActive
                        ? 'border-main-color font-bold bg-main-color text-black'
                        : 'border-black/40 text-gray-400'
                }
            `}
        >
            {label}
        </li>
    );
};

export default TabList;
