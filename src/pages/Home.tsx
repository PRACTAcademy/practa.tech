import Image from 'next/image';
import backgroundImage from '../assets/website_landscape.png';

export default function Home() {
    return (
        <div className="relative min-h-screen">
            <Image
                src={backgroundImage}
                alt="Background"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="z-0"
            />
            <div className="relative z-10 p-4 md:p-8 lg:p-12">
                <h1 className="text-4xl font-bold text-white ml-15 mt-10 md:text-5xl lg:text-6xl">
                    Welcome to MITPA
                </h1>
                <p className="ml-15 mt-1 md:mt-2 lg:mt-3 md:text-lg lg:text-xl">
                    Welcome to the MITPA educational community, where students <br/> prepare for the SAT and admission to MIT.
                </p>
                <button
                    title="Learn More"
                    className="bg-transparent text-white py-2 border border-white mt-120 ml-15 px-12 md:py-3 md:px-16 lg:py-4 lg:px-20"
                >
                    Donate
                </button>
                <p className="text-right mt-0 md:mt-1 lg:mt-2 md:text-sm lg:text-base">
                    Background Picture: Getty Images
                </p>
            </div>
        </div>
    );
}
