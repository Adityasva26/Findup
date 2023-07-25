import Head from 'next/head'
import HomePage from './main/Home'

export default function Home() {
  if (module.hot) {
    module.hot.accept(function (err) {
      console.log('An error occurred while accepting new version');
    });
  }
  return (
    <>
      <Head>
        <title>Findup.ai</title>
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" /> */}
        
      </Head>
        <HomePage />
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
      <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js" />
      <script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>

    </>
  )
}
