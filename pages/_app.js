import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.css'

import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return getLayout(<Component {...pageProps} />)
}