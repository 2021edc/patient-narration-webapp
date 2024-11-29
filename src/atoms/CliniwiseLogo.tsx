// Reusable CliniWise logo element

import ImageWrapper from './ImageWrapper';
import CliniwiseLogoIMage from '@public/assets/CliniWiseAI.png';

interface CliniwiseLogoProps {
  imageSize?: string;
}

const CliniwiseLogo = ({
  imageSize = 'h-[200px] w-[200px] lg:h-[300px] lg:w-[300px]',
}: CliniwiseLogoProps) => {
  return (
    <ImageWrapper
      src={CliniwiseLogoIMage}
      alt="CliniwiseAI logo"
      imageSize={imageSize}
      sizes="35vw"
    ></ImageWrapper>
  );
};

export default CliniwiseLogo;
