import React , { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect, useHistory, useLocation, Link } from "react-router-dom";
import JobsList from './page/JobsList'
import Login from './page/Login'
import DetailsPage from './page/DetailsPage'
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import FourOhFourPage from './page/FourOhFourPage'
import './App.css';

const QUERYSTR_PREFIX = "q";

function useQuery() { // paste outside bc we will use like React Hook
  return new URLSearchParams(useLocation().search); // useLocation is built-in function but have to import
}

function App() {
  let query = useQuery()
  let user = useSelector((state)=>state.user)
  // let [user,setUser] = useState({isAuthenticated: false})
  let [keyword,setKeyword] = useState(query.get(QUERYSTR_PREFIX)) // will capture what user types (onChange)
  let [jobsList,setJobsList] = useState(null)
  let [originalList,setOriginalList] = useState(null)
  let history = useHistory()
  let tempArray = [] // this is not a state; using this because it's not the originalList (it takes a long time to fire)
  let filteredList = []
  let dispatch = useDispatch()

  const ProtectedRoute = (props) => {
    if (user.isAuthenticated === false) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const getJobsList = async() => {
    let url = `http://localhost:3001/jobs/`
    let data = await fetch(url)
    let result = await data.json()
    // setJobsList(result)
    console.log("show results", result)

    setOriginalList(result)  // to keep the original data
    setJobsList(filteredList) // to show filtered data
    tempArray = result
    console.log("what's the query value?",query.get(QUERYSTR_PREFIX))
    searchByKeyword()
  }

  useEffect(()=>{
    getJobsList();
  },[])

  const searchByKeyword = (e) => {
    if(e){ // when we use the search function
      e.preventDefault() // this will block the form from refreshing the page
      history.push(`/jobs/?${QUERYSTR_PREFIX}=${keyword}`) // this fixes the URL, but doesn't have the filter attached
    }
    // if (temp array is null) then use originalList
    if(tempArray.length == 0){ // it's not the moment we reload 
      tempArray = originalList
    }
    let filteredList = tempArray // this is the first time we load the page
    
    if(keyword){ // when we have a keyword
      filteredList = tempArray.filter(item => item.title.includes(keyword)) // how we're going to filter the data. // "find" gives exact value (in this case, the Object type) => switch to "filter"
    }
    setJobsList(filteredList)
  }

  const getDataFromJobList =(list) =>{
     setOriginalList(list)
  }
  const logout = () => {
    dispatch({ type: "logout"})
  }
  return (
    <div className="App">
      <>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="#home"><img src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png" height="30"/></Navbar.Brand>
        <Nav className="mr-auto">
          <Link className="navbar-link" to="/jobs">Home</Link>
          <Link className="navbar-link" to="/jobs">Jobs</Link>
          <Link className="navbar-link" to="/login">Login</Link>
          <Link className="navbar-link" onClick={() => logout()}>Logout</Link>
        </Nav>
        <div className="email-display">Email:{user.email}</div>
        <Form inline onSubmit={(e)=>searchByKeyword(e)}>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e)=> setKeyword(e.target.value)} />
          <Button variant="outline-info" type="submit">Search</Button>
        </Form>
      </Navbar>
      </>
      <Switch> 
        <ProtectedRoute path="/jobs/:id" render={(props)=><DetailsPage {...props}/>} />
        <Route path="/jobs/:id" component={DetailsPage}/> 
        <Route path="/jobs" render={(props)=><JobsList {...props} keyword={keyword} jobsListProps={jobsList}/>}/> 
        <Route path="/login" component={Login}/> 
        <Route exact path="/" component={JobsList}/>
        <Route path="*" component={FourOhFourPage}/>
      </Switch>
    </div>
  );
}

export default App;
