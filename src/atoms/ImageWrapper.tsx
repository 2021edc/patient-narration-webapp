// Reusable element to display images responsively.

import Image, { StaticImageData } from 'next/image';

interface ImageWrapperProps {
  src: string | StaticImageData;
  alt: string;
  imageSize: string;
  sizes?: string;
  className?: string;
  imageProps?: React.ComponentPropsWithRef<typeof Image>;
}

const ImageWrapper = ({
  src,
  alt,
  imageSize,
  sizes = '(max-width:768px)90vw,50vw',
  className = '',
  imageProps = undefined,
}: ImageWrapperProps) => {
  return (
    <div className={`${imageSize} relative`}>
      <Image
        src={src}
        alt={alt}
        className={`${className}`}
        sizes={`${sizes}`}
        fill
        {...imageProps}
      />
    </div>
  );
};

export default ImageWrapper;
