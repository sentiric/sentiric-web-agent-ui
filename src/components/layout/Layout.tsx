import React, { useState } from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Head>
        <title>Sentiric Agent UI</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="lg:pl-72">
          <TopBar setSidebarOpen={setSidebarOpen} />
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}