import ImageWrapper from './ImageWrapper';
import MerillifeLogo from '@public/assets/MerilLife.png';

interface MerilLogoProps {
  imageSize?: string;
}

const MerilLogo = ({
  imageSize = 'h-[200px] w-[200px] lg:h-[300px] lg:w-[300px]',
}: MerilLogoProps) => {
  return (
    <ImageWrapper
      src={MerillifeLogo}
      alt="MerilLife logo"
      imageSize={imageSize}
      sizes="35vw"
    ></ImageWrapper>
  );
};

export default MerilLogo;
