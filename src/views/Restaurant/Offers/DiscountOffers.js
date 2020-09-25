import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Label,
  Row,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
import _ from "lodash";
import axios from "axios";
import { Constants } from "../../../constants/environment";
import Auth from "../../../cookie/Auth";

class DiscountOffers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coupons: [],
      loyalty:[]
    };
  }

  componentDidMount(){
    var user_id = Auth.getToken('userId');
    axios.get(Constants.BASE_URL+'api/coupons?store='+user_id,
    {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    })
    .then(res=>{(document.documentElement).scrollTop = 0;
      if(res.data&&res.data.length!=0){
        this.setState({
          coupons: res.data
        })
      }
    })
    .catch(err=>{console.log(err)})

    axios.get(Constants.BASE_URL+'api/loyalty?id='+user_id,
    {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    })
    .then(res=>{
      if(res.data&&res.data.length!=0){
        this.setState({
          loyalty: res.data[0]
        })
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }
  render() {
    return (
      <Card>
        <CardHeader>
          <h5>
            <i className="cui-screen-smartphone icons font-2xl" />
            Discount & Offers Summary
          </h5>
        </CardHeader>

        <CardBody>
          <Row>
            <Col xs="12" md="8">
              <Card className="card-accent-primary">
                <CardHeader className="text-center">
                  <strong>COUPON'S</strong>
                </CardHeader>
                <CardBody>
                  
                    {this.state.coupons&&this.state.coupons.map((coupon, index)=>{
                      return(
                       <Row key={index}>
                          <Col xs="3">
                            <Label>
                              <strong>{coupon.offPrecentage}% {coupon.couponName}</strong>
                            </Label>
                          </Col>
                          <Col xs="3">
                            {coupon.enable?(<Badge color="success" className="float-left">
                              ACTIVE
                            </Badge>):(<Badge color="secondary" className="float-left">
                               OFF
                           </Badge>)}
                            
                          </Col>
                       </Row>
                      )
                    })}
    
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs="12" md="8">
              <Card className="card-accent-primary">
                <CardHeader className="text-center">
                  <strong>LOYALITY PROGRAM</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs="3">
                      <Label>
                        <strong>Min Points</strong>
                      </Label>
                    </Col>
                    <Col xs="3">
                      <Label>
                        <strong>Min Order Amount</strong>
                      </Label>
                    </Col>
                    <Col xs="3">
                      <Label>
                        <strong>Percentage Off</strong>
                      </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="3">
                      <Label>
                        <p>{this.state.loyalty.minPoint}</p>
                      </Label>
                    </Col>
                    <Col xs="3">
                      <Label>
                        <p>{this.state.loyalty.minAmount?'$'+this.state.loyalty.minAmount:''}</p>
                      </Label>
                    </Col>
                    <Col xs="3">
                      <Label>
                        <p>{this.state.loyalty.percentageOff?this.state.loyalty.percentageOff+'%':''}</p>
                      </Label>
                    </Col>
                    <Col xs="3">
                      {this.state.loyalty.enable?(<Badge color="success" className="float-right">
                        ACTIVE
                      </Badge>):(<Badge color="secondary" className="float-left">
                               OFF
                      </Badge>)}
                      
                    </Col>
                  </Row>
                  <hr/>
                  {this.state.loyalty.rewardEnable?(
                    <div>
                       <Label><strong>Reward-{this.state.loyalty.rewardType=='1'?('Ratio'):('Percentage')}</strong></Label>
                  
                  {this.state.loyalty.rewardType === '1'?(<div>
                  <Row>
                   <Col xs="3">
                    <Label>
                      Value Spent(currency)
                    </Label>
                    </Col>
                    <Col xs="3">
                    <Label>
                      Reward Earned(curreny)
                    </Label>
                    </Col>
                  </Row>
                  <Row>
                   <Col xs="3">
                     <Label>
                     <p>{this.state.loyalty.valueSpent?'$'+this.state.loyalty.valueSpent:''}</p>
                     </Label>
                   </Col>
                   <Col xs="3">
                     <Label>
                       <p>{this.state.loyalty.rewardEarned?'$'+this.state.loyalty.rewardEarned:''}</p>
                     </Label>
                   </Col>
                   <Col xs="3"> 
                      {this.state.loyalty.rewardEnable?(<Badge color="success" className="float-left">
                              ACTIVE
                            </Badge>):(<Badge color="secondary" className="float-left">
                               OFF
                           </Badge>)}
                    </Col>
                   </Row>
                   
                   </div>
                  ):(<div>
                    <Col xs="3">
                     <Label>
                      %of total value spent
                     </Label>
                    </Col>
                    <Row>
                    <Col xs="6">
                     <p>{this.state.loyalty.totalValueSpent?this.state.loyalty.totalValueSpent+'%':''}</p>
                    </Col>
                    <Col xs="6"> 
                      {this.state.loyalty.rewardEnable?(<Badge color="success" className="float-left">
                              ACTIVE
                            </Badge>):(<Badge color="secondary" className="float-left">
                               OFF
                           </Badge>)}
                    </Col>
                    </Row>
                  </div>
                  )}
                    </div>
                  ):('')}
                 
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs="12" md="8">
              <Card className="card-accent-primary">
                <CardHeader className="text-center">
                  <strong>NOTIFICATION</strong>
                </CardHeader>
                <CardBody>
                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th>Message Title</th>
                        <th>Last Send</th>
                        <th>Number of Times</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Free Taco!</td>
                        <td>4/18/2019</td>
                        <td>
                          <Badge className="float-left" pill>
                            17
                          </Badge>
                        </td>
                      </tr>
                      <tr>
                        <td>Buy 1 Get 1 Free</td>
                        <td>4/21/2019</td>
                        <td>
                          <Badge className="float-left" pill>
                            14
                          </Badge>
                        </td>
                      </tr>
                      <tr>
                        <td>Free Delivery Over $50</td>
                        <td>4/18/2019</td>
                        <td>
                          <Badge className="float-left" pill>
                            12
                          </Badge>
                        </td>
                      </tr>
                      <tr>
                        <td>Double Points</td>
                        <td>4/18/2019</td>
                        <td>
                          <Badge className="float-left" pill>
                            19
                          </Badge>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CardBody>
        <CardFooter />
      </Card>
    );
  }
}

export default DiscountOffers;
