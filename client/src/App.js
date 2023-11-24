import React, { Fragment, useEffect } from 'react';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Posts from './components/posts/Posts';
import Profile from './components/profile/Profile';
// Redux
import { Provider } from 'react-redux';
import store from './store'
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

export const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Landing />} />
        {/* <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} /> */}
      </Routes>
      <section className= 'container'>
      <Alert />
      <Routes>
        {/* <Route exact path='/' element={<Landing />} /> */}
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/profiles' element={<Profiles />} />
        <Route exact path='/profile/:id' element={<Profile />} />
        <Route path='/dashboard' element={<PrivateRoute component={Dashboard} />} />
        <Route path='/create-profile' element={<PrivateRoute component={CreateProfile} />} />
        <Route path='/edit-profile' element={<PrivateRoute component={EditProfile} />} />
        <Route path='/add-experience' element={<PrivateRoute component={AddExperience} />} />
        <Route path='/add-education' element={<PrivateRoute component={AddEducation} />} />
        <Route path='/posts' element={<PrivateRoute component={Posts} />} />
      </Routes>
      </section>
   </BrowserRouter>
   </Provider>
  )
}
