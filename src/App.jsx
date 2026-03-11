
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Movies from './pages/Movies'
import Movie from './pages/Movie'





function App() {
  
  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route index path='' element={<Movies/>}/>
          <Route path='/:movie' element={<Movie/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
