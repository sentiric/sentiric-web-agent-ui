import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

function LoginPage() {
  return (
    <>
      <Head><title>Ajan Girişi - Sentiric</title></Head>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-gray-950">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-12 w-auto"
            src="/sentiric-logo.svg"
            alt="Sentiric" width={200} height={40} priority
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Ajan Arayüzüne Giriş
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* ... Form ... */}
          <Link href="/agent/workspace" className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700">
            Giriş Yap
          </Link>
        </div>
      </div>
    </>
  );
}

// Bu sayfanın bir layout'u olmadığını belirtiyoruz
LoginPage.getLayout = (page: React.ReactElement) => page;

export default LoginPage;