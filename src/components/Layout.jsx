import { Link, Outlet } from "react-router-dom"

export default function Layout() {
  return(
    <>
    <header>
        <p>AK3 Marcus Skjønberg</p>
        <nav id="main-nav">
        <Link to="">Hjem</Link>
        </nav>
    </header>
    <main>
      <Outlet/>
    </main>
    
    <footer>AK3 Marcus Skjønberg</footer>
    </>
  )
}