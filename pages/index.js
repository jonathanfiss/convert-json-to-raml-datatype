import Layout from '../components/layout'
import Navbar from '../components/navbar'

export default function Index() {
  return (
    <section>
      <h2>Layout Example (Index)</h2>
      <p>
        This example adds a property <code>getLayout</code> to your page,
        allowing you to return a React component for the layout. This allows you
        to define the layout on a per-page basis. Since we're returning a
        function, we can have complex nested layouts if desired.
      </p>
      <p>
        When navigating between pages, we want to persist page state (input
        values, scroll position, etc) for a Single-Page Application (SPA)
        experience.
      </p>
      <p>
        This layout pattern will allow for state persistence because the React
        component tree is persisted between page transitions. To preserve state,
        we need to prevent the React component tree from being discarded between
        page transitions.
      </p>
      <h3>Try It Out</h3>
      <p>
        To visualize this, try tying in the search input in the{' '}
        <code>Sidebar</code> and then changing routes. You'll notice the input
        state is persisted.
      </p>
    </section>
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}

// import Link from 'next/link'
// import Head from 'next/head'


// export default function Home() {
//   return (
//     <div>
//       <Head>
//         <title>This page has a title 🤔</title>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
//       </Head>

//       <h1>This page has a title 🤔</h1>
//       Hello World. <Link href="/about">About</Link>
//     </div>
//   )
// }
