import React from 'react';
import { ContentWithDomovenok } from './styles';

interface DomovenokImagesProps {
  isDrawerOpen: boolean;
  paperWidth: string;
}

const DomovenokImages: React.FC<DomovenokImagesProps> = ({ isDrawerOpen }) => (
  <ContentWithDomovenok $isOpen={isDrawerOpen}>
    <img src={'/assets/images/scale/domovenok.webp'} alt="домовенок" loading="lazy" />
  </ContentWithDomovenok>
);

export default DomovenokImages;
