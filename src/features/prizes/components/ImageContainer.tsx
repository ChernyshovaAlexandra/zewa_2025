import { BlueBlockImage } from './style';

type ImageProps = {
  img: string;
};

const ImageContainer: React.FC<ImageProps> = ({ img }) => {
  return <BlueBlockImage size={80} src={img} alt={'coupon-img-' + { img }} />;
};

export default ImageContainer;
