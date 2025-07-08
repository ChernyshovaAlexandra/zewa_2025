import { BlueBlockImage } from "./style";

type ImageProps = {
    img: string;
}


const ImageContainer: React.FC<ImageProps> = ({ img }) => {
    return (
        <BlueBlockImage
            size={96}
            src={img}
            alt={'coupon-img'} />
    )
};

export default ImageContainer;