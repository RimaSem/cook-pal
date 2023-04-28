import "./carousel.css";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import { DotButton, PrevButton, NextButton } from "./CarouselArrowsDotsButtons";
import Autoplay from "embla-carousel-autoplay";
import Hero from "../Hero";
import Slide1 from "../../img/hero-sample-img.webp";
import Slide2 from "../../img/hero-chicken-wings.webp";
import Slide3 from "../../img/hero-salad.webp";
import Slide4 from "../../img/hero-seafood-delicacy.webp";
import Slide5 from "../../img/hero-fried-chicken.webp";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const CarouselSlider: React.FC<PropType> = (props) => {
  // const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  return (
    <>
      <div className="embla">
        <div className="embla_viewport" ref={emblaRef}>
          <div className="embla_container">
            <div className="embla_slide">
              <Hero
                title="Mike's famous salad with cheese"
                author="By John Mike"
                img={Slide1}
              />
            </div>
            <div className="embla_slide">
              <Hero
                title="Jessica's cheesy chicken wings"
                author="By Jessica Day"
                img={Slide2}
              />
            </div>
            <div className="embla_slide">
              <Hero
                title="Zane's healthy vegetarian salad"
                author="By Zane Johnson"
                img={Slide3}
              />
            </div>
            <div className="embla_slide">
              <Hero
                title="Deborah's spicy seafood delicacy"
                author="By Deborah Li"
                img={Slide4}
              />
            </div>
            <div className="embla_slide">
              <Hero
                title="Linda's fried chicken with pomegranates"
                author="By Linda Smith"
                img={Slide5}
              />
            </div>
          </div>
        </div>
        <div className="button_container">
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </div>
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CarouselSlider;
