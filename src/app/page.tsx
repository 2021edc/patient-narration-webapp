import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MerilLogo from '@/atoms/MerilLogo';
import CliniwiseLogo from '@/atoms/CliniwiseLogo';

export default function Page() {
  return (
    <section className="min-h-screen">
      <h1 className="text-4xl text-gray-500 dark:text-gray-200 font-bold my-6 text-center">
        Clinical Research and Medical Writing
      </h1>
      <div className="flex flex-col justify-center items-center">
        <div className="flex gap-20 my-12">
          <CliniwiseLogo></CliniwiseLogo>
          <MerilLogo></MerilLogo>
        </div>
        <h2 className="text-2xl text-gray-500 dark:text-gray-200 font-bold my-6 text-center">
          Patient Narration Assisstant
        </h2>
        <Link href={'/narrative'} className="my-2">
          <Button>Click here</Button>
        </Link>
      </div>
    </section>
  );
}
