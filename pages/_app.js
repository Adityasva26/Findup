// import '@/styles/globals.css'
import '../public/global.css'
import dynamic from "next/dynamic";

 function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});