import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgottenPassword from './pages/ForgottenPassword'
import Dashboard from './Components/Dashboard'
import Admin from './admin/Admin'
import AddCourse from './instructor/AddCourse'
import AddUser from './instructor/AddUser'
import MyBlogs from './pages/MyBlogs'
import Profile from './pages/Profile'
import Secret from './pages/SecretQuestion'
import {AuthProvider} from './auth'
import ProtectedRoute from './Components/ProtectedRoute'
import PrivateRoute from './Components/PrivateRoute'
import SpecialRoute from './Components/SpecialRoute'
import BlogPost from './pages/BlogPost'
import Labs from './pages/Labs'
import Lab3 from './Labs/Lab3'
import Lab2 from './Labs/Lab2'
import Lab1 from './Labs/Lab1'
import Content from './instructor/AddContent'
import Courses from './pages/Courses'
import EnrolledCourses from './pages/EnrolledCourses'
import ChangePassword from './pages/ChangePassword'
import EditCourse from './instructor/EditCourse'
import EditBlog from './pages/EditBlog'
import AllCourses from './pages/AllCourses'
import EditProfile from './pages/EditProfile.js'
import Blogs from './pages/Blogs'
import Blog from './pages/Blog'
import AdminRoute from './Components/AdminRoute'
import AdminProtectedRoute from './Components/AdminProtectedRoute'
import AdminLogin from './admin/AdminLogin';
import AllUsers from './admin/AllUsers'
import Errors from './admin/Errors'

function App() {

   return(
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <PrivateRoute path='/Courses' component={Courses} />
          <PrivateRoute path='/EnrolledCourses' component={EnrolledCourses} />
          <PrivateRoute path='/SecretQuestion' component={Secret} />
          <ProtectedRoute path='/Login' component={Login} />
          <AdminProtectedRoute path='/AdminLogin' component={AdminLogin} />
          <AdminRoute path='/Admin' component={Admin} />
          <AdminRoute path='/AllUsers' component={AllUsers} />
          <AdminRoute path='/Errors' component={Errors} />
          <ProtectedRoute path='/Register' component={Register} />
          <ProtectedRoute path='/ForgottenPassword' component={ForgottenPassword} />
          <PrivateRoute path='/MyBlogs' component={MyBlogs}/>
          <PrivateRoute path='/Blogs' component={Blogs}/>
          <PrivateRoute path='/Blog/:id' component={Blog}/>
          <PrivateRoute path='/EditCourse/:id' component={EditCourse}/>
          <PrivateRoute path='/EditBlog/:id' component={EditBlog}/>
          <PrivateRoute path='/EditProfile/username/:id' component={EditProfile}/>
          <PrivateRoute path='/ChangePassword' component={ChangePassword}/>
          <PrivateRoute path='/Labs' component={Labs}/>
          <PrivateRoute path='/Lab3' component={Lab3}/>
          <PrivateRoute path='/Lab2' component={Lab2}/>
          <PrivateRoute path='/Lab1' component={Lab1}/>
          <PrivateRoute path='/Dashboard' component={Dashboard} />
          <PrivateRoute path='/Profile' component={Profile} />
          <PrivateRoute path='/AllCourses' component={AllCourses} />
          <SpecialRoute path='/AddContent/:id' component={Content} />
          <SpecialRoute path='/AddCourse' component={AddCourse} />
          <SpecialRoute path='/AddUser/:id' component={AddUser} />
          <PrivateRoute path='/BlogPost' component={BlogPost} />
        </Switch>
      </Router>
    </AuthProvider>  
    )
  }

export default App;
