// import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const MyCarousel = () => {
  return (
    <Carousel>
      <CarouselContent className={`max-h-550px`}>
        <CarouselItem>
          <Image
            src="/images/maldives_beach.jpg"
            width="640"
            height="853"
            alt="hero_image"
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/images/sunset.jpg"
            width="640"
            height="853"
            alt="hero_image"
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/images/lady_beach.jpg"
            width="640"
            height="853"
            alt="hero_image"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default MyCarousel;
