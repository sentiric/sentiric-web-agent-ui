import Head from 'next/head';
import Link from 'next/link';

function Custom404() {
  return (
    <>
      <Head>
        <title>404: Sayfa Bulunamadı - Sentiric</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-gray-700">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Sayfa Bulunamadı</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Anasayfaya Dön
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

// YENİ EKLENEN SATIR: Bu sayfanın Layout kullanmayacağını belirt.
Custom404.noLayout = true;

export default Custom404;