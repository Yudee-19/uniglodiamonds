import React from "react";
import Image from "next/image";

// Replace these with your actual image paths
import Diagram4Cs from "@/assets/diamond-4cs/4csImage.jpeg";
import CutBanner from "@/assets/diamond-4cs/cut-banner.jpg";
import ColorScale from "@/assets/diamond-4cs/color-scale.jpg";
import ClarityBanner from "@/assets/diamond-4cs/clarity-banner.jpg";
import CaratBanner from "@/assets/diamond-4cs/carat-banner.jpg";
import AdImage from "@/assets/subFooter/recent-post.png";
import GiaLogo from "@/assets/our-partners/gia-removebg-preview.png";
import HrdLogo from "@/assets/our-partners/hrd-removebg-preview.png";
import IgiLogo from "@/assets/our-partners/igi.jpg";
import { Clock1, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import BannerSection from "@/components/shared/BannerSection";
import BannerImage from "@/assets/diamond-4cs/banner4c.jpeg";
const page = () => {
    return (
        <div className="min-h-screen  mb-20">
            <BannerSection
                image={BannerImage}
                text="The Diamond 4Cs"
                textClassName="left-10 top-90 text-5xl"
                imageClassName="h-100 object-cover"
            />
            <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-12">
                {/* Main Content Column */}
                <div className="w-full lg:w-2/3 font-lora text-slate-700 pb-10">
                    {/* Intro Diagram */}
                    <div className="mb-10 flex justify-center">
                        <Image
                            src={Diagram4Cs}
                            alt="The 4Cs of Diamond Quality"
                            className="max-w-md w-full h-auto object-contain"
                        />
                    </div>

                    <p className="mb-8 text-lg leading-relaxed">
                        Please take a moment to read more about the significance
                        and definition of these 4 criteria. They will both help
                        you understand a diamond’s characteristics and increase
                        your pleasure during and long after the purchase
                        process.
                    </p>

                    {/* Every Stone Has A Different Story */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-cormorantGaramond font-semibold mb-4 text-black">
                            Every Stone Has A Different Story To Tell
                        </h2>
                        <p className="mb-4 text-lg leading-relaxed">
                            Every diamond is a unique miracle of nature, created
                            billions of years ago deep below the earth’s surface
                            by forces beyond our imagination. They are the
                            ultimate symbols of love, emotion, commitment and
                            purity. Like snowflakes, no two are exactly alike.
                        </p>
                        <p className="mb-4 text-lg leading-relaxed">
                            While their beauty, rarity and ability to arouse our
                            emotions have always been their most cherished
                            qualities, a system was also needed to help place a
                            quantifiable value on them. This system is called
                            the 4Cs of Diamond Quality: Cut, Colour, Clarity and
                            Carat weight.
                        </p>
                        <p className="text-lg leading-relaxed">
                            The creation of the Diamond 4Cs ensured diamond
                            quality could be communicated in a universal
                            language and diamond customers could now know
                            exactly what they were about to purchase.
                        </p>
                    </div>

                    {/* 1. Cut */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-cormorantGaramond font-semibold mb-4 text-black">
                            1. Cut
                        </h3>
                        <p className="mb-4 text-lg leading-relaxed">
                            The cut (not to be confused with "shape") of a
                            diamond is the key that unlocks a diamond’s most
                            important quality: its brilliance, created by a
                            combination of brightness, fire and scintillation.
                        </p>
                        <ul className="list-none space-y-2 mb-6 text-lg">
                            <li>
                                <span className="text-[#bb923a] mr-2">❖</span>
                                <strong>Brightness:</strong> Internal and
                                external white light reflected from a diamond
                            </li>
                            <li>
                                <span className="text-[#bb923a] mr-2">❖</span>
                                <strong>Fire:</strong> The scattering of white
                                light into all the colors of the rainbow
                            </li>
                            <li>
                                <span className="text-[#bb923a] mr-2">❖</span>
                                <strong>Scintillation:</strong> The amount of
                                sparkle a diamond produces, and the pattern of
                                light and dark areas caused by reflections
                                within the diamond
                            </li>
                        </ul>
                        <p className="mb-6 text-lg leading-relaxed">
                            Cut is generally described as a diamond’s most
                            important characteristic, playing the leading role
                            in influencing a diamond’s beauty. The better a
                            diamond is cut, the more sparkle it will have. It
                            takes great skill and experience to cut a stone to
                            deliver that magnificent play of light only possible
                            in a diamond. The cut of a diamond is an art,
                            reflecting the skill of the craftsmen who cut and
                            polished it.
                        </p>
                        {/* Cut Banner */}
                        <div className="relative w-full h-40 mb-6  overflow-hidden">
                            <Image
                                src={CutBanner}
                                alt="Diamond Cut"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6">
                                <p className="text-white text-xl md:text-2xl font-cormorantGaramond text-center font-semibold">
                                    A diamond’s cut grade is an objective
                                    assessment of how well the diamond’s facets
                                    interact with light.
                                </p>
                            </div>
                        </div>
                        <p className="text-lg leading-relaxed">
                            It takes account of many aspects, including its
                            weight relative to its diameter, the thickness of
                            the girdle (important for its durability), the
                            symmetry of the facets and how well these have been
                            polished. When a diamond is cut with the proper
                            proportions, light is returned out of the top (the
                            "table") of the diamond. If it is cut too shallow,
                            light leaks out of the bottom; too deep and it
                            escapes out of the side.
                        </p>
                    </div>

                    {/* 2. Color */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-cormorantGaramond font-semibold mb-4 text-black">
                            2. Color
                        </h3>
                        <p className="mb-6 text-lg leading-relaxed">
                            GIA’s diamond D-to-Z colour-grading scale is the
                            industry’s most widely accepted grading system. The
                            scale begins with the letter D, representing
                            colourless, and continues, with increasing presence
                            of colour, to the letter Z.
                        </p>
                        {/* Color Scale Image */}
                        <div className="mb-6">
                            <Image
                                src={ColorScale}
                                alt="Diamond Color Scale"
                                className="w-full h-auto object-cover "
                            />
                        </div>
                        <p className="mb-6 text-lg leading-relaxed">
                            Colour manifests itself in a diamond as a pale
                            yellow. A chemically pure and structurally perfect
                            diamond has no hue, like a drop of pure water, and
                            consequently, a higher value.
                        </p>
                        <ul className="list-none space-y-3 mb-6 text-lg">
                            <li>
                                <span className="text-[#bb923a] mr-2">➤</span>D
                                grade diamonds are considered to be "absolutely
                                colourless". They are extremely rare and
                                therefore command the highest values.
                            </li>
                            <li>
                                <span className="text-[#bb923a] mr-2">➤</span>
                                E-F grades are also considered "colourless",
                                although an expert gemologist will be able to
                                see minute traces of colour. These diamonds are
                                also very rare.
                            </li>
                            <li>
                                <span className="text-[#bb923a] mr-2">➤</span>
                                G-J grades are described as "near-colourless".
                                They need to be compared side-by-side against
                                diamonds of better grades for the differences in
                                colour to be visible.
                            </li>
                            <li>
                                <span className="text-[#bb923a] mr-2">➤</span>
                                K-M grades are described as "faint", with a
                                faint yellow colour.
                            </li>
                            <li>
                                <span className="text-[#bb923a] mr-2">➤</span>
                                N-Z grades go from "very light" to "light", with
                                some noticeable colour ranging from a very light
                                yellow (or brown) to a light yellow (or brown).
                            </li>
                        </ul>
                        <p className="text-lg leading-relaxed">
                            Naturally coloured diamonds outside the normal
                            colour range are called fancy-colour diamonds, with
                            yellow being the most common. When the colour
                            becomes intense or vivid, the price of some yellow
                            diamonds may be higher than the price of a D colour
                            diamond. Diamonds in other colours are rare and can
                            be very expensive.
                        </p>
                    </div>

                    {/* 3. Clarity */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-cormorantGaramond font-semibold mb-4 text-black">
                            3. Clarity
                        </h3>
                        <p className="mb-6 text-lg leading-relaxed">
                            Natural diamonds are the result of carbon exposed to
                            tremendous heat and pressure deep in the earth. This
                            process can result in a variety of internal
                            characteristics called ‘inclusions’ and external
                            characteristics called ‘blemishes’. Diamonds with
                            the least and smallest imperfections receive the
                            highest clarity grades. Because these imperfections
                            tend to be microscopic, they do not generally affect
                            a diamond’s beauty in any discernible way.
                        </p>
                        {/* Clarity Banner */}
                        <div className="relative w-full h-32 mb-6  overflow-hidden">
                            <Image
                                src={ClarityBanner}
                                alt="Diamond Clarity"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6">
                                <p className="text-white text-xl md:text-2xl font-cormorantGaramond text-center font-semibold">
                                    Clarity is the measure of the number and
                                    size of the tiny imperfections that occur in
                                    almost all diamonds.
                                </p>
                            </div>
                        </div>
                        <p className="mb-4 text-lg leading-relaxed">
                            The industry uses a scale with 6 categories, some of
                            which are further divided, for a total of 11
                            specific grades. The clarity grade of a diamond is
                            determined by a trained grader under 10x
                            magnification, or use of a microscope or a diamond
                            loupe.
                        </p>
                        <ul className="list-none space-y-2 mb-6 text-lg">
                            <li>
                                <span className="text-[#bb923a] mr-2">➤</span>
                                <strong>FL:</strong> Flawless (No inclusions and
                                no blemishes visible under 10x magnification)
                            </li>
                            <li>
                                <span className="text-[#bb923a] mr-2">➤</span>
                                <strong>IF:</strong> Internally Flawless (No
                                inclusions visible under 10x magnification)
                            </li>
                            <li>
                                <span className="text-[#bb923a] mr-2">➤</span>
                                <strong>VVS1 and VVS2:</strong> Very, Very
                                Slightly Included (Inclusions so slight they are
                                difficult for a skilled grader to see under 10x
                                magnification)
                            </li>
                            <li>
                                <span className="text-[#bb923a] mr-2">➤</span>
                                <strong>VS1 and VS2:</strong> Very Slightly
                                Included (Inclusions are observed with effort
                                under 10x magnification, but can be
                                characterized as minor)
                            </li>
                            <li>
                                <span className="text-[#bb923a] mr-2">➤</span>
                                <strong>SI1 and SI2:</strong> Slightly Included
                                (Inclusions are noticeable under 10x
                                magnification)
                            </li>
                            <li>
                                <span className="text-[#bb923a] mr-2">➤</span>
                                <strong>I1, I2, and I3:</strong> Included
                                (Inclusions are obvious under 10x magnification
                                or even to the unaided eye, which may affect
                                transparency and brilliance)
                            </li>
                        </ul>
                    </div>

                    {/* 4. Carat */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-cormorantGaramond font-semibold mb-4 text-black">
                            4. Carat
                        </h3>
                        <p className="mb-6 text-lg leading-relaxed">
                            Although extensively used while purchasing and
                            sourcing for just the right diamond, carat or ct, is
                            often confused with size. However, the carat
                            actually refers to the weight of gems and diamonds.
                            This is also not to be confused with karat, which
                            refers to the purity of gold.
                        </p>
                        {/* Carat Banner */}
                        <div className="relative w-full h-32 mb-6  overflow-hidden">
                            <Image
                                src={CaratBanner}
                                alt="Diamond Carat"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6">
                                <p className="text-white text-xl md:text-2xl font-cormorantGaramond text-center font-semibold">
                                    Carat weight refers to the weight of gems
                                    and diamonds, not the size!
                                </p>
                            </div>
                        </div>
                        <p className="text-lg leading-relaxed">
                            The form and kind of gemstone will show its weight
                            differently, because of the different densities of
                            each stone. Diamonds that have the same carat weight
                            can have varying costs due to the impact of the
                            other Cs that come into play. Like, for example, a
                            diamond’s cut influences how large the carat weight
                            will appear. Diamonds of a smaller carat weight will
                            appear larger and with higher cut grades. Total
                            carat weight refers to the total of the individual
                            carat weights of all diamonds in one piece of
                            jewelry.
                        </p>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="w-full lg:w-1/3 space-y-10">
                    {/* Popular Post */}
                    <div className="bg-[#f7f8fa] p-8 ">
                        <h4 className="text-2xl font-cormorantGaramond mb-6 border-b border-slate-200 pb-2">
                            Popular Post
                        </h4>
                        <ul className="space-y-4 font-lora text-slate-700">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#bb923a] transition-colors"
                                >
                                    Supply Chain Policy & Procedure
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#bb923a] transition-colors"
                                >
                                    The Diamonds 4Cs
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#bb923a] transition-colors"
                                >
                                    Diamonds Certificates
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#bb923a] transition-colors"
                                >
                                    Diamonds Shapes
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#bb923a] transition-colors"
                                >
                                    Fancy Coloured Diamonds
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Our Partners */}
                    <div>
                        <h4 className="text-2xl font-cormorantGaramond mb-6 border-b border-slate-200 pb-2">
                            Our Partners
                        </h4>
                        <div className="flex gap-4 items-center justify-start">
                            <Image
                                src={GiaLogo}
                                alt="GIA"
                                width={60}
                                height={30}
                                className="object-contain"
                            />
                            <Image
                                src={HrdLogo}
                                alt="HRD"
                                width={80}
                                height={30}
                                className="object-contain"
                            />
                            <Image
                                src={IgiLogo}
                                alt="IGI"
                                width={60}
                                height={30}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Find Us */}
                    <div className="bg-[#f7f8fa] p-8 ">
                        <h4 className="text-2xl font-cormorantGaramond mb-6 border-b border-slate-200 pb-2">
                            Find Us
                        </h4>
                        <div className="space-y-6 font-lora text-slate-700 text-sm">
                            <div className="flex gap-3">
                                <span className="text-[#bb923a] text-xl">
                                    <MapPin />
                                </span>
                                <div>
                                    <strong className="block text-black mb-1">
                                        Address
                                    </strong>
                                    <p>
                                        Hoveniersstraat 30, Suite 663, Bus 250
                                        2018 Antwerp
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-[#bb923a] text-xl">
                                    <Clock1 />
                                </span>
                                <div>
                                    <strong className="block text-black mb-1">
                                        Hours
                                    </strong>
                                    <p>
                                        Monday—Friday: 10:00 – 18:00
                                        <br />
                                        Saturday & Sunday: On Appointment
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ad Section */}
                    <div className="bg-black flex flex-col items-center justify-center p-10 min-h-[400px]">
                        <div className="flex flex-col items-center">
                            <h3 className="text-white text-3xl md:text-4xl font-cormorantGaramond text-center mb-8">
                                BROWSE THOUSANDS
                                <br />
                                OF LOOSE DIAMONDS
                            </h3>
                            <Button className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-black transition px-8 py-4 text-lg font-lora tracking-wide rounded-none mt-2">
                                ONLINE INVENTORY
                            </Button>
                            <Image
                                src={AdImage} // Replace with your diamond ring image path
                                alt="Diamond Ring"
                                width={250}
                                height={250}
                                className="mt-10 w-60 h-auto aspect-square object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>{" "}
        </div>
    );
};
export default page;
