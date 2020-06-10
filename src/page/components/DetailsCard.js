import React from 'react'
import {Container, Row, Col, Badge} from 'react-bootstrap'

export default function DetailsCard(props) {
    console.log("here",props.job)
    if(props.job == null){
        return <div>loading</div>
    }
    return (
        <Container className="detailscard-container">
              <div>
                <img src={props.job.img} />
              </div>
            <Col className="detailscard-description-col">
              <div className="jobcard-descriptions">
                <h2 className="jobcard-title"><a href="#">{props.job.title}</a></h2>
                <div>$ {props.job.salary}</div>
                <div>
                  <ul className="benefit-list">
                    {props.job.benefits.map(benefit => (
                      <li>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  {props.job.tags.map(tag => (
                    <Badge variant="secondary" className="badge-style">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Col>
        </Container>
    )
}
