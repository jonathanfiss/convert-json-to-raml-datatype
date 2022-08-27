import Link from 'next/link'
import styles from './navbar.module.css'

export default function Navbar() {
  return (
    <div className="container py-4">
    <header className="pb-3 mb-4 border-bottom">
      <Link href="/">
        <a>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" fill="currentColor" class="bi bi-arrow-left-right me-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z" />
          </svg>
          <span class="fs-4">Convert JSON to RAML datatype</span>
        </a>
      </Link>
    </header>
    </div>
  )
}
