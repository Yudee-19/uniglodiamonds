import React from "react";
import BannerSection from "@/components/shared/BannerSection";
import BannerImage from "@/assets/services/the-best-price-for-your-diamonds/banner1.png";
import ArticleLayout from "@/components/shared/ArticleLayout";
import FedexImage from "@/assets/home/blog_3.jpg";
import Image from "next/image";

const page = () => {
    return (
        <div className="min-h-screen ">
            <BannerSection
                image={BannerImage}
                text="Supply Chain Policy & Procedure"
                textClassName="left-10 top-90 text-4xl"
                imageClassName="h-100 object-cover"
            />
            <section className="max-w-7xl mx-auto px-10 my-20 pb-20">
                <div className="block after:clear-both after:block">
                    <Image
                        src={FedexImage.src}
                        alt="FedEx shipping diamond"
                        width={500}
                        height={500}
                        className="w-full md:w-[600px] h-auto object-cover rounded float-left mr-10 mb-6"
                    />
                    <div>
                        <div className="text-primary-yellow-1 text-lg font-lora mb-2">
                            EDUCATION
                        </div>
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond font-semibold mb-6">
                            Supply Chain Policy & Procedure
                        </h2>
                        <ol className="list-decimal list-inside text-slate-700 text-lg font-lora space-y-4">
                            <li>
                                Uniglo is a Diamond & Jewelry Trading Company.
                                This policy confirms Uniglo’s commitment to
                                respect human rights, avoid contributing to the
                                finance of conflict and comply with all relevant
                                UN sanctions, resolutions and laws.
                            </li>
                            <li>
                                Uniglo is a member of the Responsible Jewellery
                                Council (RJC). As such, we commit to proving,
                                through independent third-party verification,
                                that we:
                                <ul className="list-disc ml-6 mt-2 space-y-1">
                                    <li>
                                        respect human rights according to the
                                        Universal Declaration of Human Rights
                                        and International Labour Organization
                                        Fundamental Rights at Work;
                                    </li>
                                    <li>
                                        do not engage in or tolerate bribery,
                                        corruption, money laundering or finance
                                        of terrorism;
                                    </li>
                                    <li>
                                        support transparency of government
                                        payments and rights-compatible security
                                        forces in the extractives industry;
                                    </li>
                                    <li>
                                        do not provide direct or indirect
                                        support to illegal armed groups;
                                    </li>
                                    <li>
                                        enable stakeholders to voice concerns
                                        about the jewellery supply chain.
                                    </li>
                                    <li>
                                        are implementing the OECD 5-Step
                                        framework as a management process for
                                        risk based due diligence for responsible
                                        supply chains of minerals from
                                        conflict-affected and high-risk areas.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                We also commit to using our influence to prevent
                                abuses by others. Our supplier is not from CAHRA
                                and we do not procure goods from CAHRA. Our
                                Supplier is RJC Certified member and hence is
                                compliant to OECD Guidelines.
                            </li>
                            <li>
                                <span className="font-semibold">
                                    Regarding serious abuses associated with the
                                    extraction, transport or trade of
                                    diamonds/coloured gemstones:
                                </span>
                                <ul className="list-disc ml-6 mt-2 space-y-1">
                                    <li>
                                        We will neither tolerate nor profit
                                        from, contribute to, assist or
                                        facilitate the commission of:
                                    </li>
                                    <li>
                                        torture, cruel, inhuman and degrading
                                        treatment;
                                    </li>
                                    <li>forced or compulsory labour;</li>
                                    <li>the worst forms of child labour;</li>
                                    <li>
                                        human rights violations and abuses; or
                                    </li>
                                    <li>
                                        war crimes, violations of international
                                        humanitarian law, crimes against
                                        humanity or genocide.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                We will immediately stop engaging with upstream
                                suppliers if we find a reasonable risk that they
                                are committing abuses described in 4 or are
                                sourcing from, or linked to, any party
                                committing these abuses.
                            </li>
                            <li>
                                <span className="font-semibold">
                                    Regarding direct or indirect support to
                                    non-state armed groups.
                                </span>{" "}
                                We only sell or purchase
                                jewellery/diamonds/coloured gemstones that are
                                fully compliant with the Kimberley Process
                                Certification Scheme and Dodd Frank Act and, as
                                such, will not tolerate direct or indirect
                                support to non-state armed groups, including,
                                but not limited to, procuring diamonds/coloured
                                gemstones from, making payments to, or otherwise
                                helping or equipping non-state armed groups or
                                their affiliates who illegally:
                                <ul className="list-disc ml-6 mt-2 space-y-1">
                                    <li>
                                        control mine sites, transportation
                                        routes, points where diamonds/coloured
                                        gemstones are traded and upstream actors
                                        in the supply chain; or
                                    </li>
                                    <li>
                                        tax or extort money or diamonds/coloured
                                        gemstones at mine sites, along
                                        transportation routes or at points where
                                        diamonds/coloured gemstones are traded,
                                        or from intermediaries, export companies
                                        or international traders.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                We will immediately stop engaging with upstream
                                suppliers if we find a reasonable risk that they
                                are sourcing from, or are linked to, any party
                                providing direct or indirect support to
                                non-state armed groups as described in paragraph
                                6.
                            </li>
                            <li>
                                <span className="font-semibold">
                                    Regarding public or private security forces.
                                </span>{" "}
                                We affirm that the role of public or private
                                security forces is to provide security to
                                workers, facilities, equipment and property in
                                accordance with the rule of law, including law
                                that guarantees human rights. We will not
                                provide direct or indirect support to public or
                                private security forces that commit abuses
                                described in paragraph 4 or that act illegally
                                as described in paragraph 6.
                            </li>
                            <li>
                                <span className="font-semibold">
                                    Regarding bribery and fraudulent
                                    misrepresentation of the origin of
                                    diamonds/coloured gemstones.
                                </span>{" "}
                                We will not offer, promise, give or demand
                                bribes, and will resist the solicitation of
                                bribes, to conceal or disguise the origin of
                                diamonds/coloured gemstones, or to misrepresent
                                taxes, fees and royalties paid to governments
                                for the purposes of extraction, trade, handling,
                                transport and export of diamonds.
                            </li>
                            <li>
                                <span className="font-semibold">
                                    Regarding money laundering.
                                </span>{" "}
                                We will support and contribute to efforts to
                                eliminate money laundering where we identify a
                                reasonable risk resulting from, or connected to,
                                the extraction, trade, handling, transport or
                                export of diamonds/coloured gemstones.
                            </li>
                        </ol>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default page;
