"use client";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import banner from "@/assets/banner_3.jpg";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
    return (
        <div className="pt-20 h-[200vh]">
            <section className="w-full  min-h-screen flex items-center justify-center">
                <Carousel
                    className="w-full  p-0 m-0"
                    plugins={[
                        Autoplay({
                            delay: 6000,
                        }),
                    ]}
                >
                    <CarouselContent className="w-full  p-0 m-0">
                        <CarouselItem className="p-0 m-0">
                            <Image
                                src={banner}
                                alt="Description"
                                className="w-full h-full transform -scale-x-100"
                            />
                        </CarouselItem>
                        <CarouselItem className="p-0 m-0">
                            <Image
                                src={banner}
                                alt="Description"
                                className="w-full h-full "
                            />
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </section>
        </div>
    );
}
