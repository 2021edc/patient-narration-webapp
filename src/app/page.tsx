import Link from 'next/link';

export default function Page() {
  return (
    <section className="min-h-screen py-6 max-w-[1440px] mx-auto">
      <h1 className="text-4xl text-gray-500 dark:text-gray-200 font-semibold my-12 text-center">
        Clinical Research and Medical Writing
      </h1>
      <div className="flex flex-col items-center justify-center">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href={'/narration-generation'}>
            <li className="px-6 py-12 shadow-lg text-gray-800 hover:bg-[#e5eaf0] rounded-lg flex flex-col items-center justify-center border">
              <h3 className="text-lg font-semibold w-full text-center">
                Patient Narration Assistant
              </h3>
            </li>
          </Link>
          <Link href={'/requests?page=1'}>
            <li className="px-6 py-12 shadow-lg text-gray-800 hover:bg-[#e5eaf0] rounded-lg flex flex-col items-center justify-center border">
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
