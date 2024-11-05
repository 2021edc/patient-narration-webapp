import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ImageWrapper from '@/atoms/ImageWrapper';
import CliniwiseLogo from '@public/assets/CliniWiseAI.png';

export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-center items-center py-10">
        <section className="">
          <ImageWrapper
            src={CliniwiseLogo}
            alt="CliniWiseAI logo"
            imageSize="h-[500px] w-[500px]"
            sizes=""
          ></ImageWrapper>

          {/* TODO - Add Meril Logo */}
        </section>
        <h1 className="text-4xl text-gray-500 dark:text-gray-200 font-bold mt-6">
          Patient Narration Assistant
        </h1>
        <Link href={'/narrative'} className="my-8">
          <Button>Click here</Button>
        </Link>
      </div>
    </div>
  );
}
