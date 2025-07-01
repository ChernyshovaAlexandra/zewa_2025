import React from 'react';
import { ContentWithDomovenok } from './styles';

interface DomovenokImagesProps {
  isDrawerOpen: boolean;
  paperWidth: string;
}

const DomovenokImages: React.FC<DomovenokImagesProps> = () => (
  <ContentWithDomovenok>
    <img src={'/assets/images/scale/domovenok.png'} alt="домовенок" loading="lazy" />
  </ContentWithDomovenok>
);

export default DomovenokImages;
