import React , { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";
import JobsList from './page/JobsList'
import Login from './page/Login'
import DetailsPage from './page/DetailsPage'
// import {Navbar} from 'react-bootstrap/Navbar'
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap'

function App() {
  let [user,setUser] = useState({isAuthenticated: true})

  const ProtectedRoute = (props) => {
    if (user.isAuthenticated === true) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };



  return (
    <div className="App">
      <>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="#home"><img src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png" height="30"/></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/jobs">Home</Nav.Link>
          <Nav.Link href="/jobs">Jobs</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
      </>
      <Switch> 
        <ProtectedRoute path="/jobs/:id" render={(props)=><DetailsPage {...props}/>} />
        <Route path="/jobs/:id" component={DetailsPage}/> 
        <Route path="/jobs" component={JobsList}/> 
        <Route path="/login" component={Login}/> 
        <Route path="/" component={JobsList}/>
      </Switch>
    </div>
  );
}

export default App;
