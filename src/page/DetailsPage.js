import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import {Container} from 'react-bootstrap'
import DetailsCard from './components/DetailsCard'

export default function Details(props) {
    let [jobDetails,setJobDetails] = useState(null)
    const { id } = useParams();

    const getDetailedData = async() => {
        let url = `http://localhost:3001/jobs/${id}`
        // let deployurl = `(JSON server link)`
        let data = await fetch(url)
        let result = await data.json()
        console.log("show results details page", result)
        setJobDetails(result)
        
        
    }
    useEffect(()=>{
        getDetailedData();
    },[])

    if(jobDetails== null){
        return <div>Loading...</div>
    }
    return (
        <div>
            <Container className="job-page-details">
                <DetailsCard job={jobDetails} key={jobDetails.id} />
            </Container>
        </div>
    )
}
