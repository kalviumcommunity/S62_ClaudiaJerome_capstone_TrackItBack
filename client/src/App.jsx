import React,{ useState } from 'react'
import LandingPage from './Pages/LandingPage'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Signup from './Pages/SignUp'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import AddFoundItemPage from './Pages/AddFoundItemPage'
import AddLostItemPage from './Pages/AddLostItemPage'
import ProfilePage from './Pages/ProfilePage'
import SingleItemPage from './Pages/SingleItemPage'

// import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/homepage' element={<HomePage/>}/>
          <Route path='/add-found-item' element={<AddFoundItemPage/>}/>
          <Route path='/add-lost-item' element={<AddLostItemPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/item/:id' element={<SingleItemPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
