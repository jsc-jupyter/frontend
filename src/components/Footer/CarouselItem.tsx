import React from "react";
import { Carousel } from "../../stores/carouselStore";
import healthy from "../../../images/footer/levels/Healthy.svg";
import annotated from "../../../images/footer/levels/Annotated.svg";
import minor from "../../../images/footer/levels/Minor.svg";
import medium from "../../../images/footer/levels/Medium.svg";
import major from "../../../images/footer/levels/Major.svg";
import critical from "../../../images/footer/levels/Critical.svg";

// TODO : CAROUSEL ITEM: Add Tooltip with message info
// TODO : Dynamic Imports
// TODO : Refactor inline styles to CSS or styled-components
// TODO : Extract components/styles where applicable

interface CarouselItemProps {
  index: number;
  data: Carousel;
}

const CarouselItem = ({ index, data }: CarouselItemProps) => {
  let imgurl: string;
  switch (data.health) {
    case 100:
      imgurl = healthy;
      break;
    case 75:
      imgurl = annotated;
      break;
    case 50:
      imgurl = minor;
      break;
    case 25:
      imgurl = medium;
      break;
    case 0:
      imgurl = major;
      break;
    default:
      imgurl = critical;
      break;
  }

  return (
    <div className="embla__slide" key={index}>
      <img src={imgurl} width={50} alt={`Slide ${index + 1}`} />
      <span style={{ color: "black" }}>{data.system}</span>
      <span style={{ color: "black" }}>{data.usercount}</span>
    </div>
  );
};

export default CarouselItem;
