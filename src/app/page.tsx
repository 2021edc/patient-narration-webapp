import Link from 'next/link';
import MerilLogo from '@/atoms/MerilLogo';
import CliniwiseLogo from '@/atoms/CliniwiseLogo';

export default function Page() {
  return (
    <section className="min-h-screen py-6">
      <h1 className="text-4xl text-gray-500 dark:text-gray-200 font-semibold my-12 text-center">
        Clinical Research and Medical Writing
      </h1>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row gap-4 md:gap-20 my-12">
          <CliniwiseLogo></CliniwiseLogo>
          <MerilLogo></MerilLogo>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href={'/narration-generation'}>
            <li className="w-full aspect-[3/1] px-6 py-12 shadow-lg text-gray-800 hover:bg-[#e5eaf0] rounded-lg flex flex-col items-center justify-center border">
              <h3 className="text-lg font-semibold w-full text-center">
                Patient Narration Assistant
              </h3>
            </li>
          </Link>
          <Link href={'/requests'}>
            <li className="w-full aspect-[3/1] px-6 py-12 shadow-lg text-gray-800 hover:bg-[#e5eaf0] rounded-lg flex flex-col items-center justify-center border">
              <h3 className="text-lg font-semibold w-full text-center">
                Requests History
              </h3>
            </li>
          </Link>
        </ul>
      </div>
    </section>
  );
}
