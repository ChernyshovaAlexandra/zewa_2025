import React from "react";
import { ContentWithDomovenok, DomovenokInitial, DomovenokOpened, Gradient, PaperRoll, PaperUnrolled, RollingLine } from "./styles";

interface DomovenokImagesProps {
    isDrawerOpen: boolean;
    paperWidth: string
}

const DomovenokImages: React.FC<DomovenokImagesProps> = ({ isDrawerOpen, paperWidth }) => (
    <ContentWithDomovenok>
        <DomovenokOpened $isOpen={isDrawerOpen}>
            <source
                srcSet={require(`/public/images/prizes-scale/domovenok-opened.png?resize&size=360&format=webp`)}
                type="image/webp"
            />
            <img
                src={require(`/public/images/prizes-scale/domovenok-opened.png?resize&size=180`)}
                alt="game name"
                loading="lazy"
            />
        </DomovenokOpened>

        <DomovenokInitial $isOpen={isDrawerOpen}>
            <source
                srcSet={require(`/public/images/prizes-scale/domovenok-initial.png?resize&size=360&format=webp`)}
                type="image/webp"
            />
            <img
                src={require(`/public/images/prizes-scale/domovenok-initial.png?resize&size=180`)}
                alt="game name"
                loading="lazy"
            />
        </DomovenokInitial>

    </ContentWithDomovenok>
);

export default DomovenokImages;
