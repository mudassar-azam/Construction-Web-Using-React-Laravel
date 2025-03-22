import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './components/frontend/About';
import Home from './components/frontend/Home';
import './assets/css/style.scss'
import Services from './components/frontend/Services';
import Blogs from './components/frontend/Blogs';
import Projects from './components/frontend/Projects';
import Contact from './components/frontend/Contact';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/about' element={<About/>}></Route>
          <Route exact path='/services' element={<Services/>}></Route>
          <Route exact path='/blogs' element={<Blogs/>}></Route>
          <Route exact path='/projects' element={<Projects/>}></Route>
          <Route exact path='/contact' element={<Contact/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
