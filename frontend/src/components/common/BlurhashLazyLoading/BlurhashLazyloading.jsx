import { importImagesUrls } from '../../../utils/images';
import { OptimizedImage } from './optimizedImage';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Blurhash } from 'react-blurhash';

const ImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 2em;
  column-gap: 10px;
  max-width: 1024px;
  content-visibility: visible;
`;

const Image = styled.img`
  height: 500px;
`;

function BlurHashLazyLoading({ image }) {
  return (
    <ImagesContainer>
      <OptimizedImage key={image.originalname} image={image} />
    </ImagesContainer>
  );
}

export { BlurHashLazyLoading };
