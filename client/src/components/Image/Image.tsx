import { FC } from "react";
import "./image.scss";

interface ImageProps {
  image: string;
}

const Image: FC<ImageProps> = ({ image }) => {
  return <img src={image} className={"arrow"} alt={image} />;
};

export default Image;
