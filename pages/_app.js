// import '@/styles/globals.css'
import '../public/global.css'
import dynamic from "next/dynamic";
import { initGA, logPageView } from './analitycs';
import { useEffect } from 'react';


 function App({ Component, pageProps }) {
  useEffect(() => {
    initGA();
    logPageView();
  }, [])
  return <Component {...pageProps} />
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});