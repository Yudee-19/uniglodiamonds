import React from "react";
import Marquee from "react-fast-marquee";
import partner2 from "@/assets/our-partners/gia-removebg-preview.png";
import partner3 from "@/assets/our-partners/hrd-removebg-preview.png";
import partner4 from "@/assets/our-partners/igi.jpg";
import Image from "next/image";
const partnerLogos = [
    { src: partner2, alt: "GIA Certified Diamonds" },
    { src: partner3, alt: "HRD Certified Diamonds" },
    { src: partner4, alt: "IGI Certified Diamonds" },
];
const CertificatesMarqueeSection = () => {
    return (
        <section className="bg-white py-24 font-cormorantGaramond">
            <div className=" px-4 md:px-8">
                <div className="max-w-5xl mx-auto text-center mb-10">
                    <span className="text-primary-yellow-1 text-lg uppercase font-lora tracking-widest">
                        CERTIFIED DIAMOND ASSURANCE
                    </span>
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold mt-2 mb-4">
                        OUR PARTNERS IN CERTIFICATION
                    </h2>
                    <p className="text-slate-600 font-lora text-base max-w-3xl mx-auto">
                        Assessed using internationally accepted grading criteria
                    </p>
                    <p className="text-slate-600 font-lora text-base max-w-3xl mx-auto">
                        We work with globally trusted diamond authorities like
                        HRD, GIA and IGI to ensure every Uniglo diamond is
                        authentically graded. Their expertise guarantees
                        transparency, ethical sourcing, and uncompromised
                        quality in every piece you choose.
                    </p>
                </div>
                <div className="my-16">
                    <Marquee
                        gradient={false}
                        speed={40}
                        pauseOnHover={true}
                        className="flex items-center gap-16  max-w-7xl mx-auto "
                        autoFill={true}
                    >
                        {partnerLogos.map((logo, idx) => (
                            <div
                                key={idx}
                                className="mx-12 flex flex-col items-center"
                            >
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={180}
                                    height={80}
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    );
};

export default CertificatesMarqueeSection;
