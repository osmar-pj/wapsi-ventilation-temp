import Menu from "@/src/components/Menu";
import PageRoute from "@/src/components/PageRoute";
import "@/src/global.scss";
import Layout from "@/src/hooks/ConexionSocket";
import { Sora } from "next/font/google";

const inter = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <main className={inter.className}>
        <PageRoute />
        <Component {...pageProps} className={inter.className} />
        <Menu />
      </main>
    </Layout>
  );
}
