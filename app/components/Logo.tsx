import Image from 'next/image';

interface LogoProps {
    className?: string;
}

export const Logo = ({ className = "h-8" }: LogoProps) => (
    <div className={`flex items-center gap-2 ${className}`}>
        <div className="relative w-10 h-10 flex items-center justify-center">
            <Image
                src="/logo-mundo-fit-col.svg"
                alt="MundoFit Logo"
                width={40}
                height={40}
                className="object-contain"
            />
        </div>
        <div className="flex flex-col leading-none">
            <span className="text-xl font-black italic tracking-tighter text-white">
                MUNDO <span className="bg-gradient-to-r from-[#E11D74] to-[#6A1B9A] bg-clip-text text-transparent">FIT</span>
            </span>
            <span className="text-[8px] tracking-[0.2em] text-gray-400 font-bold uppercase">Wellness Experience</span>
        </div>
    </div>
);
