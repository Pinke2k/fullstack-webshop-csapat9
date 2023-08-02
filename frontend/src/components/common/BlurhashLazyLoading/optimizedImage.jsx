import { useState } from 'react';
import { Blurhash } from 'react-blurhash';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import { API_URL } from '../../../constants/constants';

function OptimizedImage(props) {
  const { image } = props;

  const [isLoaded, setLoaded] = useState(false);
  const [isLoadStarted, setLoadStarted] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleLoadStarted = () => {
    setLoadStarted(true);
  };

  const url = `${API_URL}/${image.path}`;

  return (
    <>
      <LazyLoadImage
        key={image.path}
        src={url}
        // height={208}
        // width={160}
        onLoad={handleLoad}
        beforeLoad={handleLoadStarted}
      />
      {!isLoaded && isLoadStarted && (
        <Blurhash
          hash={image.blurhash}
          width={160}
          height={208}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
    </>
  );
}

export { OptimizedImage };
