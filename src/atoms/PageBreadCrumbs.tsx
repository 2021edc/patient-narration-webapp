'use client';

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon } from '@radix-ui/react-icons';

const PageBreadCrumbs = () => {
  // Get the current pathname and split to get an array of all paths
  const pathname = usePathname();
  const pathNames = pathname.split('/').filter((path) => path);
  const isHomePage = pathname === '/';
  const isLoginPage = pathname === '/login';

  // Not rendering breadcrumb navigation in login page
  if (isLoginPage) return <></>;

  return (
    <nav className="my-2 p-2 px-4 flex items-center justify-end absolute right-4 z-40">
      <Breadcrumb className="w-max">
        <BreadcrumbList>
          <BreadcrumbItem>
            {isHomePage ? (
              <BreadcrumbPage className="flex gap-2 items-center">
                <HomeIcon className="h-4 w-4"></HomeIcon>Home
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link
                  href="/"
                  className="flex gap-2 items-center text-blue-800 underline"
                >
                  <HomeIcon className="h-4 w-4"></HomeIcon>Home
                </Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>

          {pathNames.length > 0 && <BreadcrumbSeparator />}

          {pathNames.map((path, index) => {
            // Last item in the path list will be rendered as text, others will be rendered with link to the pages

            const isLast = index === pathNames.length - 1;
            const href = `/${pathNames.slice(0, index + 1).join('/')}`;
            if (isLast) {
              return (
                <BreadcrumbItem key={`${path}-${index}`}>
                  <BreadcrumbPage className="capitalize">{path}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            }
            return (
              <div key={`${path}-${index}`} className="flex items-center gap-4">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={href}
                      className="capitalize text-blue-800 underline"
                    >
                      {path}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};

export default PageBreadCrumbs;
