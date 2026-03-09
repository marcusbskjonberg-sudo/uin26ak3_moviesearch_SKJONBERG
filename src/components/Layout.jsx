import { Link, Outlet } from "react-router-dom"

export default function Layout() {
  return(
    <>
    <header>
        <p>AK3 Marcus Skjønberg</p>
        <h1>Filmer</h1>
        <nav>
        <Link to="">Hjem</Link>
        </nav>
      
    </header>
    <main>
      <Outlet/>
    </main>
    <footer><p>AK3 Marcus Skjønberg</p></footer>
    </>
  )
}