import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'

const AppRoute = () => {
  return(
    <Routes>
      <Route path='/' element={<Login/>}>
      </Route>
      <Route path='/dashboard' element={<Dashboard/>}>
      </Route>
    </Routes>
  ) 
}
export default AppRoute
