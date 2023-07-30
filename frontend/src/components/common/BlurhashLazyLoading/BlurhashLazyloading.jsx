import { OptimizedImage } from './optimizedImage';

function BlurHashLazyLoading({ image }) {
  return <OptimizedImage key={image.originalname} image={image} />;
}

export { BlurHashLazyLoading };
