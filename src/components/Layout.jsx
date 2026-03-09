import { Link, Outlet } from "react-router-dom"

export default function Layout() {
  return(
    <>
    <header>
        <p>AK3 Marcus Skjønberg</p>
        <nav>
        <Link to="">Hjem</Link>
        </nav>
    </header>
    <main>
      <Outlet/>
    </main>
    
    </>
  )
}