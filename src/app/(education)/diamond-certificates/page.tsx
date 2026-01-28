import React from "react";
import Image from "next/image";
import BannerSection from "@/components/shared/BannerSection";
import ArticleLayout from "@/components/shared/ArticleLayout";

// Placeholder imports - Replace with your actual assets
import BannerImage from "@/assets/diamond-certificates/certiBanner.jpeg";
import FedexImage from "@/assets/diamond-certificates/image-1.png";
import InspectionImage from "@/assets/diamond-certificates/image-2.png";

// Certificate Images (Placeholders)
import GiaReport from "@/assets/our-partners/gia-full.png";
import IgiReport from "@/assets/our-partners/igi-full.png";
import HrdReport from "@/assets/our-partners/hrd-full.png";
import SubFooter from "@/components/shared/SubFooter";

const articles = [
    {
        title: "Portfolio Building And Expert Advice",
        subtitle: "Welcome",
        paragraphs: [
            "A diamond certificate or dossier is a formal document which intricately details out all the diamond's unique characteristics – like its cut, carat weight, colour and clarity. At times it may also include the diamond's finish which refers to its polish and symmetry, as well as a diamond's fluorescence. The most widely recognised and appreciated diamond grading laboratories in the world are the Gemological Institute of America and the European Gemological Laboratory.",
            "Certification by one of these labs or a lab of the same or similar repute is crucial for assurance of your diamond's quality. It also serves as a proof of your diamond's identity. These labs grade your diamonds in an unbiased format and you can rest assured that the information that is on your diamond certificate is accurate. This certificate also helps in future valuation of the diamond – for insurance or in the case of re-sale of the diamond.",
        ],
        image: {
            src: FedexImage.src,
            alt: "Diamond Certificate",
        },
        reverse: false,
    },
    {
        title: "We Offer GIA, IGI and HRD Certified Diamonds",
        subtitle: "Welcome",
        paragraphs: [
            "When purchasing a certified diamond from Uniglo, you will receive the original diamond grading certificate which highlights your diamond's unique 4Cs. Through this certificate, you are guaranteed for a lifetime, that what is stated on your certificate is in fact what you have purchased.",
            "Do note, a grading certificate is different from an appraisal or valuation certificate. The appraisal certificate tends to be less comprehensive and places the monetary value of the stone – which relies on estimations influenced by the supply and demand of diamonds, global economic trends and more.",
        ],
        image: {
            src: InspectionImage.src,
            alt: "Diamond Inspection",
        },
        reverse: true,
    },
];

const certificates = [
    {
        title: "GIA Certification",
        description:
            "Established in 1931, GIA is the world’s foremost authority on diamonds, colored stones, and pearls. A public benefit, nonprofit institute, GIA is the leading source of knowledge, standards, and education in gems and jewelry.",
        image: GiaReport, // Replace with actual image import
    },
    {
        title: "IGI Certification",
        description:
            "A certificate from IGI represents the all-important 5th C that no one should be without: Confidence. As the world’s largest independent gem certification and appraisal institute for diamonds, colored gemstones and jewelry, IGI is a standard of excellence for industry professionals and consumers around the globe.",
        image: IgiReport, // Replace with actual image import
    },
    {
        title: "HRD Certification",
        description:
            "An HRD Antwerp grading report represents the hallmark of authentic European quality and allows any consumer to purchase diamonds or jewellery in full confidence.",
        image: HrdReport, // Replace with actual image import
    },
];

const page = () => {
    return (
        <div className="min-h-screen ">
            <BannerSection
                image={BannerImage}
                text="Diamond Certificates"
                textClassName="left-10 top-90 text-5xl"
                imageClassName="h-100 object-cover"
            />

            {/* Articles Section */}
            <section className="max-w-7xl mx-auto px-10 mt-20 mb-20">
                {/* Article 1 */}
                <div className="mb-20">
                    <ArticleLayout {...articles[0]} floatImages={true} />
                    <p className="mt-6 text-slate-600 text-lg leading-relaxed font-lora text-justify">
                        Uniglo specialises in conflict-free diamonds, and will
                        be able to produce the Kimberley Process certificate
                        with each diamond you purchase.
                    </p>
                </div>

                {/* Article 2 */}
                <div>
                    <ArticleLayout {...articles[1]} floatImages={true} />
                </div>
            </section>

            {/* Certificate Showcase Section */}
            <section className="w-full bg-brand-gradient py-24">
                <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {certificates.map((cert, idx) => (
                        <div key={idx} className="flex flex-col">
                            {/* Image Card */}
                            <div className="bg-white p-2 mb-8 rounded-sm h-64 flex items-center justify-center overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-500">
                                {/* Use Next.js Image or img tag depending on your asset type */}
                                <Image
                                    src={cert.image}
                                    alt={cert.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            {/* Content */}
                            <h3 className="text-[#bb923a] text-3xl font-cormorantGaramond font-semibold mb-4">
                                {cert.title}
                            </h3>
                            <p className="text-white/80 font-lora text-base leading-relaxed text-justify">
                                {cert.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
            <SubFooter />
        </div>
    );
};
export default page;
