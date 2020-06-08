import React , {useState, useEffect} from 'react'
// import JobCard from './components/JobCard.js'
import { Container } from 'react-bootstrap'
import JobCard from './components/JobCard'
import { useHistory, useLocation } from "react-router-dom";

const QUERYSTR_PREFIX = "q";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Jobs() {
    let [jobs,setJobs] = useState([])
    let query = useQuery();
    let [keyword, setKeyword] = useState(query.get(QUERYSTR_PREFIX));

    const getJobsList = async() => {
        let url = `http://localhost:3001/jobs/`
        let data = await fetch(url)
        let result = await data.json()
        setJobs(result)
        console.log("show results", result)
    }

    const handleSearch = (e) => {
        let filteredJobs = originalJobs;
        if (e) {
            e.preventDefault();
            history.push(`/jobs/?${QUERYSTR_PREFIX}=${encodeURIComponent(keyword)}`);
        }
        if (keyword) {
            filteredJobs = originalJobs.filter(job =>
            job.title.toLowerCase().includes(keyword.toLowerCase())
            );
        }
        setJobs(filteredJobs);
    };


    useEffect(()=>{
        getJobsList();
    },[])

    useEffect(() => {
        handleSearch();
      }, [originalJobs]);


    return (
        <Container className="jobs-list">
            {jobs && jobs.map(item => <JobCard job={item} key={item.id} />)}
        </Container>
    )
}
