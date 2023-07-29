import { useState } from 'react';
import { Blurhash } from 'react-blurhash';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import styled from 'styled-components';
import { API_URL } from '../../../constants/constants';

const ImageWrapper = styled.div`
  position: relative;
`;

const StyledBlurhash = styled(Blurhash)`
  z-index: 20;
  position: absolute !important;
  top: 0;
  left: 0;
`;

function OptimizedImage(props) {
  const { image } = props;
  console.log(props, 'optimatzes');

  //   const imageUrl = image.path.replace(/\\/g, '/');
  const [isLoaded, setLoaded] = useState(false);
  const [isLoadStarted, setLoadStarted] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleLoadStarted = () => {
    console.log('Started: ');
    setLoadStarted(true);
  };

  const url = `${API_URL}/${image.path}`;
  console.log(url);

  return (
    <ImageWrapper>
      <LazyLoadImage
        key={image.path}
        src={url}
        height={500}
        width={333}
        onLoad={handleLoad}
        beforeLoad={handleLoadStarted}
      />
      {!isLoaded && isLoadStarted && (
        <StyledBlurhash
          hash={image.blurhash}
          width={333}
          height={500}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
    </ImageWrapper>
  );
}

export { OptimizedImage };
