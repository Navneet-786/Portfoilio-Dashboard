import { cn } from "@/lib/utils";

export const BentoGrid = ({ className, children }) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[12rem] grid-cols-1 md:grid-cols-4 gap-4 w-full mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    onClick,
}) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "row-span-1 rounded-3xl group/bento hover:shadow-2xl hover:shadow-indigo-500/10 transition duration-300 shadow-sm p-6 bg-white border border-slate-200 justify-between flex flex-col space-y-4 cursor-pointer relative overflow-hidden",
                className
            )}
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {icon}
            </div>
            {header}
            <div className="group-hover/bento:translate-x-1 transition duration-200 relative z-10">
                <div className="font-sans font-bold text-slate-900 mb-1 mt-2 text-lg">
                    {title}
                </div>
                <div className="font-sans font-medium text-slate-500 text-xs tracking-wide">
                    {description}
                </div>
            </div>
        </div>
    );
};
