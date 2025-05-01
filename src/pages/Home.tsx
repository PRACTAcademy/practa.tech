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
            <div className="relative z-10 p-4">
                <h1 className="text-4xl font-bold text-white ml-15 mt-10">
                    Welcome to MITPA
                </h1>
                <p className="ml-15 mt-1">
                    Welcome to the MITPA educational community, where students <br/> prepare for the SAT and admission to MIT.
                </p>
                <button
                    title="Learn More"
                    className="bg-transparent text-white py-2 border border-white mt-120 ml-15 px-12"
                >
                    Donate
                </button>
                <p className="text-right mt-0">
                    Background Picture: Getty Images
                </p>
            </div>
        </div>
    );
}
