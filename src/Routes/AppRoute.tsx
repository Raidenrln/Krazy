import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Leaderboard from '../pages/Leaderboard'
import Profile from '../pages/Profile'
import Community from '../pages/Community'
import Events from '../pages/Events'
import Status from '../pages/Status'
import Support from '../pages/Support'

const AppRoute = () => {
  return(
    <Routes>
      <Route path='/' element={<Login/>}>
      </Route>

      <Route path='/home' element={<Home/>}/>
      <Route path='/leaderboard' element={<Leaderboard/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/community' element={<Community/>}/>
      <Route path='/events' element={<Events/>}/>
      <Route path='/updates' element={<Profile/>}/>
      <Route path='/status' element={<Status/>}/>
      <Route path='/support' element={<Support/>}/>
    </Routes>
  ) 
}
export default AppRoute
