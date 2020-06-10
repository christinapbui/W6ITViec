import React , {useState, useEffect} from 'react'
// import JobCard from './components/JobCard.js'
import { Container } from 'react-bootstrap'
import JobCard from './components/JobCard'
import { useHistory, useLocation } from "react-router-dom";

const QUERYSTR_PREFIX = "q";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Jobs(props) {


    if (props.jobsListProps == null) {
        return <div>Loading</div>
    }


    return (
        <>
        {console.log("here",props.jobsListProps)}
        {/* <Container>
            {jobsList.map(item => {
                return <h2>{item.title}</h2>
            })}
        </Container> */}
        <Container className="jobs-list">
            {props.jobsListProps && props.jobsListProps.map(item => <JobCard job={item} key={item.id} />)}
        </Container>
        </>
    )
}
