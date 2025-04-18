import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './components/frontend/About';
import Home from './components/frontend/Home';
import './assets/css/style.scss'
import Services from './components/frontend/Services';
import Blogs from './components/frontend/Blogs';
import Projects from './components/frontend/Projects';
import Contact from './components/frontend/Contact';
import Login from './components/backend/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/backend/Dashboard';
import RequireAuth from './components/partials/RequireAuth';
import {default as ShowServices} from './components/backend/services/Show';
import {default as CreateServices} from './components/backend/services/Create';
import {default as EditServices} from './components/backend/services/Edit';
import {default as ShowProjects} from './components/backend/projects/Show';
import {default as CreateProjects} from './components/backend/projects/Create';
import {default as EditProjects} from './components/backend/projects/Edit';
import {default as ShowBlogs} from './components/backend/blogs/Show';
import {default as CreateBlogs} from './components/backend/blogs/Create';
import {default as EditBlogs} from './components/backend/blogs/Edit';
import {default as ShowTestimonials} from './components/backend/testimonials/Show';
import {default as CreateTestimonials} from './components/backend/testimonials/Create';
import {default as EditTestimonials} from './components/backend/testimonials/Edit';
import {default as ShowTeam} from './components/backend/team/Show';
import {default as CreateTeam} from './components/backend/team/Create';
import {default as EditTeam} from './components/backend/team/Edit';
import ServiceDetails from './components/frontend/ServiceDetails';
import ProjectDetails from './components/frontend/ProjectDetails';
import BlogDetails from './components/frontend/BlogDetails';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/about' element={<About />}></Route>
          <Route exact path='/services' element={<Services />}></Route>
          <Route exact path='/service/:id' element={<ServiceDetails />}></Route>
          <Route exact path='/blogs' element={<Blogs />}></Route>
          <Route exact path='/blog/:id' element={<BlogDetails/>}></Route>
          <Route exact path='/projects' element={<Projects />}></Route>
          <Route exact path='/project/:id' element={<ProjectDetails />}></Route>
          <Route exact path='/contact' element={<Contact />}></Route>
          <Route exact path='/admin/login' element={<Login />}></Route>
          <Route exact path='/admin/dashboard' element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>}>
          </Route>
          <Route exact path='/admin/services' element={
            <RequireAuth>
              <ShowServices/>
            </RequireAuth>}>
          </Route>
          <Route exact path='/admin/services/create' element={
            <RequireAuth>
              <CreateServices/>
            </RequireAuth>}>
          </Route>
          <Route exact path='/admin/services/edit/:id' element={
            <RequireAuth>
              <EditServices/>
            </RequireAuth>}>
          </Route>
          <Route exact path='/admin/projects' element={
            <RequireAuth>
              <ShowProjects/>
            </RequireAuth>}>
          </Route>
          <Route exact path='/admin/projects/create' element={
            <RequireAuth>
              <CreateProjects/>
            </RequireAuth>}>
          </Route>
          <Route exact path='/admin/projects/edit/:id' element={
            <RequireAuth>
              <EditProjects/>
            </RequireAuth>}>
          </Route>
          <Route exact path='/admin/blogs' element={
            <RequireAuth>
              <ShowBlogs/>
            </RequireAuth>}>
          </Route>
          <Route exact path='/admin/blogs/create' element={
            <RequireAuth>
              <CreateBlogs/>
            </RequireAuth>}>
          </Route>
          <Route exact path='/admin/blogs/edit/:id' element={
            <RequireAuth>
              <EditBlogs/>
            </RequireAuth>}>
          </Route>
          <Route exact path='/admin/testimonials' element={
            <RequireAuth>
              <ShowTestimonials/>
            </RequireAuth>}>
          </Route>
          <Route exact path='/admin/testimonials/create' element={
            <RequireAuth>
              <CreateTestimonials/>
            </RequireAuth>}>
          </Route>
          <Route exact path='/admin/testimonials/edit/:id' element={
            <RequireAuth>
              <EditTestimonials/>
            </RequireAuth>}>
          </Route>
          <Route exact path='/admin/team' element={
            <RequireAuth>
              <ShowTeam/>
            </RequireAuth>}>
          </Route>
          <Route exact path='/admin/team/create' element={
            <RequireAuth>
              <CreateTeam/>
            </RequireAuth>}>
          </Route>
          <Route exact path='/admin/team/edit/:id' element={
            <RequireAuth>
              <EditTeam/>
            </RequireAuth>}>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position='top-center' />
    </>
  )
}

export default App
