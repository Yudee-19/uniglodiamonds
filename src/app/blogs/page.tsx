import React from "react";
import BannerSection from "@/components/shared/BannerSection";
import Image from "next/image";

// Replace with your actual image paths
import BannerImage from "@/assets/fancy-colored-diamonds/banner.png";
import EngagementRingBlog1 from "@/assets/home/blog_1.jpg";
import BuyDiamondsOnlineBlog1 from "@/assets/home/blog_3.jpg";
import EngagementRingBlog2 from "@/assets/home/blog_2.1.jpg";
import BuyDiamondsOnlineBlog2 from "@/assets/home/blog_4.jpg";
import SubFooter from "@/components/shared/SubFooter";

const blogs = [
    {
        id: 1,
        title: "How to Choose a Diamond Engagement Ring",
        author: "Uniglo Diamonds",
        date: "October 25, 2024",
        image: EngagementRingBlog1,
        excerpt:
            "Learn the essential tips and tricks for selecting the perfect diamond engagement ring that matches your style and budget.",
        slug: "how-to-choose-diamond-engagement-ring",
    },
    {
        id: 2,
        title: "Best Places to Buy Diamonds Online",
        author: "Uniglo Diamonds",
        date: "October 25, 2024",
        image: BuyDiamondsOnlineBlog1,
        excerpt:
            "Discover the top online platforms and trusted retailers for purchasing authentic diamonds with confidence and quality assurance.",
        slug: "best-places-to-buy-diamonds-online",
    },
    {
        id: 3,
        title: "How to Choose a Diamond Engagement Ring",
        author: "Uniglo Diamonds",
        date: "October 25, 2024",
        image: EngagementRingBlog2,
        excerpt:
            "Explore in-depth guide on selecting the perfect diamond cut, color, clarity, and carat weight for your engagement ring.",
        slug: "how-to-choose-diamond-engagement-ring-guide",
    },
    {
        id: 4,
        title: "Best Places to Buy Diamonds Online",
        author: "Uniglo Diamonds",
        date: "October 25, 2024",
        image: BuyDiamondsOnlineBlog2,
        excerpt:
            "Complete resource for finding reputable online diamond sellers with verified certifications and excellent customer reviews.",
        slug: "best-places-buy-diamonds-online-trusted",
    },
];

const page = () => {
    return (
        <div className="min-h-screen  mb-20">
            <BannerSection
                image={BannerImage}
                text="Blog"
                textClassName="left-10 top-1/2 text-5xl md:text-6xl"
                imageClassName="h-64 md:h-96 object-cover"
            />

            {/* All Blogs Section */}
            <section className="w-full bg-brand-gradient py-20 px-4 ">
                <div className="max-w-7xl mx-auto">
                    {/* Section Title */}
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-white mb-16">
                        All Blogs
                    </h2>

                    {/* Blogs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="flex flex-col h-full overflow-hidden hover:shadow-2xl transition-all duration-300"
                            >
                                {/* Blog Image */}
                                <div className="relative w-full h-64 md:h-72 overflow-hidden rounded-sm mb-6">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Blog Content */}
                                <div className="flex flex-col flex-1">
                                    {/* Title */}
                                    <h3 className="text-2xl md:text-3xl font-cormorantGaramond font-semibold text-[#bb923a] mb-3 leading-tight hover:text-white transition-colors cursor-pointer">
                                        {blog.title}
                                    </h3>

                                    {/* Meta Info */}
                                    <p className="text-white/70 font-lora text-sm mb-4">
                                        {blog.author} {blog.date}
                                    </p>

                                    {/* Excerpt */}
                                    <p className="text-white/80 font-lora text-base leading-relaxed mb-6 grow line-clamp-3">
                                        {blog.excerpt}
                                    </p>

                                    {/* Read More Button */}
                                    <a
                                        href={`/blogs/${blog.slug}`}
                                        className="inline-block bg-[#bb923a] text-white px-6 py-2 text-sm font-bold font-lora uppercase tracking-wider hover:bg-[#9a7a2f] transition-colors w-fit rounded-sm"
                                    >
                                        Read More
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <SubFooter />
        </div>
    );
};

export default page;
