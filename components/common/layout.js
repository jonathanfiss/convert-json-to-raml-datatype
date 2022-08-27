import Head from 'next/head'
import Header from './header'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Convert JSON to RAML datatype</title>
        <meta name="description" content="Convert json payload to raml data type"></meta>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.svg"></link>
        <meta name="google-site-verification" content="a8Wa90Ao0K2dVczFTKqzDcMUAncgQhCaN2YIckDm_lw" />
      </Head>
      <div className='min-vh-100'>
      <Header />
      <main className='d-flex flex-column'>{children}</main>
      <Footer />
      </div>
    </>
  )
}
