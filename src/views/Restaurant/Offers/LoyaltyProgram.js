import React, { Component } from "react";
import {toastr} from 'react-redux-toastr';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Breadcrumb,
  BreadcrumbItem,
  Row
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
import axios from "axios";
import { Constants } from "../../../constants/environment";
import Auth from "../../../cookie/Auth";

class LoyaltyProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minPoint: '',
      enable: false,
      minAmount: '',
      percentageOff: '',
      rewardEnable: false,
      rewardType: '1' ,
      valueSpent: '',
      rewardEarned: '',
      totalValueSpent: '',
      user_id: ''

    };  
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
}

componentDidMount(){
  var id = Auth.getToken('userId');
  this.setState({
    user_id: id
  })
  axios.get(Constants.BASE_URL+'api/loyalty?id='+id,
  {
    headers: {
      //"content-type": "application/json",
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  })
    .then(res=>{
      if(res.data){
        this.setState({
          minPoint: res.data[0].minPoint,
          enable: res.data[0].enable,
          minAmount: res.data[0].minAmount,
          percentageOff: res.data[0].percentageOff,
          rewardEnable: res.data[0].rewardEnable,
          rewardEarned: res.data[0].rewardEarned,
          rewardType: res.data[0].rewardType,
          valueSpent: res.data[0].valueSpent,
          totalValueSpent: res.data[0].totalValueSpent,
        })
      }
    })
    .catch(err=>{
      console.log(err)
    })
}
handleChange(event){
  this.setState({
    [event.target.name]: event.target.value
  });
}

handleSubmit(){
  var user_id = Auth.getToken('userId');  
  var percentageOff = this.state.percentageOff;
  // if(this.state.percentageOff === ""||this.state.percentageOff>100||this.state.percentageOff<0){
  //   toastr.warning('Warning', 'Please enter only number in percentageOff filed!');
  //   return;
  // }

  // if(this.state.minPoint === ""||!this.state.minPoint.match(/^([0-9])/)){
  //   toastr.warning('Warning', 'Please enter only number in minPoint field!');
  //   return;
  // }

  // if(this.state.minAmount === ""||!this.state.minAmount.match(/^([0-9])/)){
  //   toastr.warning('Warning', 'Please enter only number in amount  filed!');
  //   return;
  // }

  if(this.state.percentageOff != ""&&(this.state.percentageOff>100||this.state.percentageOff<0)){
      toastr.warning('Warning', 'Please enter only number in percentageOff filed!');
      return;
    }
  if(this.state.rewardEnable) {console.log(this.state.rewardType);
    if(this.state.rewardType=='1'&&(this.state.valueSpent==''||this.state.valueSpent==undefined)) {
      toastr.warning('Warning', 'Please enter only number in value spent filed!');
      return;
    }
    if(this.state.rewardType=='1'&&(this.state.rewardEarned==''||this.state.rewardEarned==undefined)) {
      toastr.warning('Warning', 'Please enter only number in rewardEarned filed!');
      return;
    }
    if(this.state.rewardType=='0'&&(this.state.totalValueSpent==''||this.state.totalValueSpent==undefined)) {
      toastr.warning('Warning', 'Please enter only number in totalValueSpent filed!');
      return;
    }
  }
  var submitData = {
    minPoint: this.state.minPoint,
    // enable: this.state.enable,
    minAmount: this.state.minAmount,
    percentageOff: this.state.percentageOff,
    restaurantID: user_id,
    rewardEarned: this.state.rewardEarned,
    // rewardEnable: this.state.rewardEnable,
    valueSpent: this.state.valueSpent,
    totalValueSpent: this.state.totalValueSpent,
    rewardType: this.state.rewardType
  };
 
  axios.post(Constants.BASE_URL+'api/loyalty/', submitData,
  {
    headers: {
      //"content-type": "application/json",
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  })
    .then(res=>{
      toastr.success('success', 'Updated successfully!'); 
    })
    .catch(err=>{
      toastr.error('Please try again!')
    })
}
  render() {
    var com = Number(this.state.rewardType);
    return (
      <Card>
        <CardHeader>
          <Row>
            <Col xs="10">
              <h5>
                <i className="icon-loop" /> &nbsp;&nbsp;Loyality Program
              </h5>
            </Col>
            <Col xs="2">
           
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="2">
              <Label>
                <strong>Min Points</strong>
              </Label>
            </Col>
            <Col xs="2">
              <Label htmlFor="dishPrice">
                <strong>Min Order Amount</strong>
              </Label>
            </Col>
            <Col xs="2">
              <Label htmlFor="dishTotalPrice">
                <strong>Percentage Off</strong>
              </Label>
            </Col>
          </Row>
          <FormGroup row>
            <Col xs="2">
              <Input
                type="text"
                id="dishDiscount"
                name="minPoint"
                disabled={!this.state.enable}
                defaultValue={this.state.minPoint}
                onChange={this.handleChange}
              />
            </Col>
            <Col xs="2">
              <Input
                type="text"
                id="dishPrice"
                name="minAmount"
                disabled={!this.state.enable}
                value={this.state.minAmount}
                onChange={this.handleChange}
              />
            </Col>
            <Col xs="2">
              <FormGroup>
                <div className="controls">
                  <InputGroup>
                    <Input
                      id="appendedInput"
                      size="16"
                      type="text"
                      name={"percentageOff"}
                      disabled={!this.state.enable}
                      value={this.state.percentageOff}
                      onChange={this.handleChange}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>%</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <span className="help-block">Here's more help text</span>
                </div>
              </FormGroup>
            </Col>
            <Col xs="2">
              <AppSwitch
                className={"mx-1"}
                variant={"pill"}
                color={"success"}
                label
                name="enable"
                checked={this.state.enable}
                onChange={()=>{
                  this.setState({
                    enable: !this.state.enable
                  })
                  axios.get(Constants.BASE_URL + `api/loyalty/activation/${this.state.user_id}`,
                  {
                    headers: {
                      //"content-type": "application/json",
                      Authorization: "Bearer "+Auth.getToken('token'),
                    }
                  })
                    .then(res=>{toastr.success('Success', 'Loaylty Status Updated!')})
                    .catch(err=>{toastr.warning('Warning', 'Please Try again!')})
                              }}
              />
            </Col>
          </FormGroup>
          <hr/>
          <Row>
            <Col xs="1">
             <Label><strong>Rewards</strong></Label>
            </Col>
           <Col xs="1">
           <AppSwitch
                className={"mx-1"}
                variant={"pill"}
                color={"success"}
                label
                name={"rewardEnable"}
                onChange={()=>{
                  this.setState({rewardEnable: !this.state.rewardEnable})
                  axios.get(Constants.BASE_URL + `api/loyalty/rewardEnable/${this.state.user_id}`,
                  {
                    headers: {
                      //"content-type": "application/json",
                      Authorization: "Bearer "+Auth.getToken('token'),
                    }
                  })
                                      .then(res=>{toastr.success('Success', 'Reward Status Updated!')})
                                      .catch(err=>{toastr.warning('Warning', 'Please Try again!')})
                              }}
                checked={this.state.rewardEnable}
              />
           </Col>
          </Row>
          {this.state.rewardEnable?(
             <FormGroup>
               <Col xs="10">
                   <FormGroup>
                 <Row>
                   <Col xs="1">
                    <Input type="radio" name="rewardType" value="1" onChange={this.handleChange} checked={com?true:false}/>
                    <Label>Ratio</Label>
                   </Col>
                   <Col xs="1">
                    <Input type="radio" name="rewardType" value="0" onChange={this.handleChange} checked={!com?true:false}/>
                    <Label>Percentage</Label>
                   </Col>
                 </Row>
               </FormGroup>
               </Col>
              {this.state.rewardType==="1"?(
                <FormGroup>
                  <Label>Value Spent(currency)</Label>
                  <Input name="valueSpent" type="number" onChange={this.handleChange} value={this.state.valueSpent}/>
                  <Label>Rewards Earned(currency)</Label>
                  <Input name="rewardEarned" type="number" onChange={this.handleChange} value={this.state.rewardEarned}/>
                </FormGroup>
              ):(
                <FormGroup>
                  <Label>%of total value spent</Label>
                  <Input type="number" name="totalValueSpent" onChange={this.handleChange} value={this.state.totalValueSpent}/>
                </FormGroup>)}
            </FormGroup>
          ):('')}
        </CardBody>
        <CardFooter>
          <Row>
            <Col xs="10">
              <Button
                type="button"
                size="lg"
                color="primary"
                onClick={this.handleSubmit}
              >
                <i className="fa fa-dot-circle-o" /> Create
              </Button>
            </Col>
            <Col xs="2">
              <Button type="cancel" size="lg" color="danger">
                <i className="fa fa-ban" /> Cancel
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

export default LoyaltyProgram;
