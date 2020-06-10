import React from 'react'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import moment from 'moment'
import { useHistory } from "react-router-dom";

export default function JobCard(props) {
  let history = useHistory();


  const jobSelect = () => {
    history.push(`/jobs/${props.job.id}`);
  }


    return (
        <div className="job-content" onClick={() => jobSelect()}>
          <Row>
            <Col>
              <div className="jobcard-logo">
                <img src={props.job.img} />
              </div>
            </Col>
            <Col xs={8}>
              <div className="jobcard-descriptions">
                <h2 className="jobcard-title">{props.job.title}</h2>
                <div>${props.job.salary}</div>
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
            <Col>
              <div className="date-location-box">
                {props.job.isHotjob ? (
                  <div className="hotjob-label">Hot Job</div>
                ) : (
                  <div></div>
                )}
    
                <div className="jobcard-location">
                  <div>{props.job.city}</div>
                  <div>District {props.job.district}</div>
                </div>
                <div className="job-time">{moment(props.job.time).fromNow()}</div>
              </div>
            </Col>
          </Row>
        </div>
      );
}
