import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "@/components/layout/Layout";
import React from "react";

type ComponentWithGetLayout = AppProps['Component'] & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
}
type AppPropsWithLayout = AppProps & {
  Component: ComponentWithGetLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Sayfanın kendi özel bir layout'u varsa onu kullan (login gibi),
  // yoksa varsayılan <Layout> bileşenini kullan.
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <ThemeProvider>
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}