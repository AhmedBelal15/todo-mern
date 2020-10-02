import React, { Fragment,useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import SignInPage from './Pages/SignIn-Register Page/SignIn-Register'
import HomePage from './Pages/Home Page/HomePage.component'
import Header from  './Components/Header/Header.component'
import { setCurrentUser } from './redux/user/user-actions';
import TodoPage from './Pages/Todo-Page/TodoPage'

function App({currentUser, setCurrentUser}) {
const getUser =JSON.parse(localStorage.getItem('currentUser')) 


useEffect( ()=>{
  if (getUser) {
    setCurrentUser({currentUser: getUser.userObject })
  }
 },[])

  return (
    <Fragment>
      <Router>
       <Header />
       <Route path="/todo" exact  component={TodoPage} />
       <Route path="/" exact component={HomePage}  />
       <Route path="/sign-in" exact  render={()=>
      currentUser ? (<Redirect to='/' />):
      (<SignInPage />)
    } />
      </Router>
    </Fragment>
  );
}

const mapStateToProps = ({user}) => {
  return {
    currentUser: user.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user)=>{
      dispatch(setCurrentUser(user))
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
