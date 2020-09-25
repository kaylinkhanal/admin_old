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
import Auth from "../../../cookie/Auth";
import { AppSwitch } from "@coreui/react";
import axios from "axios";
import { Constants } from "../../../constants/environment";

class addCoupons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      couponName: '',
      enable: true,
      applicableFrom: '',
      applicableTo: '',
      offPrecentage: '',
      description:'',
      restaurantID:'',
      location:[],
      submitLocation:[],
      storename:"",
      storetype: '',
      storeownerinfo: []
    };  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

componentDidMount(){
  var user_id = Auth.getToken('userId');
  var user_id = Auth.getToken("userId");
  axios.get(Constants.BASE_URL + `api/store/store-owner/${user_id}`,
  {
    headers: {
      //"content-type": "application/json",
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  }).then(res => {
    const data = res.data;;
    this.setState({
      storeownerinfo: data
    });
  });

  axios.get(Constants.BASE_URL + `api/locations/restaurant/${user_id}`,
  {
    headers: {
      //"content-type": "application/json",
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  }).then(res => {
    const data = res.data;
    this.setState({
      location: data
    });
  });
}

handleChange = (event) => {
  const { submitLocation } = this.state
  if (event.target.id === "loc" && event.target.checked) {
    this.setState({submitLocation: [...submitLocation, event.target.value]});
    // submitLocation = [...submitLocation, event.target.value];
  } else if(event.target.id === "loc" && !event.target.checked){

    this.setState({submitLocation: submitLocation.filter((val, i) => {
      return event.target.value !== val
    
    })});
   
  }
  else
    this.setState({
      [event.target.name]: event.target.value
    });
  
};

handleSubmit(){
  var user_id = Auth.getToken('userId');
  var to = new Date(this.state.applicableTo);
  var from  = new Date(this.state.applicableFrom);

  if(this.state.couponName === ""){
    toastr.warning('Warning', 'Please enter couon name!');
    return;
  }

  if(this.state.offPrecentage === ""||this.state.offPrecentage<0||!this.state.offPrecentage.match(/^([0-9])/)){
    toastr.warning('Warning', 'Please enter only number in amount off filed!');
    return;
  }

  if(this.state.applicableFrom === ""){
    toastr.warning('Warning', 'Please enter valid from field !');
    return;
  }

  if(this.state.applicableTo === ""){
    toastr.warning('Warning', 'Please enter valid from field!');
    return;
  }
  if(this.state.description === ""){
    toastr.warning('Warning', 'Please enter description field!');
    return;
  }
  if(this.state.submitLocation.length==0){
     toastr.warning('Warning', 'Please select location field!');
     return;
  }

   if(to <= from){
    toastr.warning('Warning', 'Valid Till field must bigger than Valid From field!');
    return;
  }

  var couponData = {
    'couponName': this.state.couponName,
    'applicableFrom': this.state.applicableFrom,
    'location': this.state.submitLocation,
    'description': this.state.description,
    'restaurantID': user_id,
    'applicableTo': this.state.applicableTo,
    'enable': this.state.enable,
    'offPrecentage': this.state.offPrecentage
  }
  axios.post(Constants.BASE_URL+'/api/coupons/', couponData,
  {
    headers: {
      //"content-type": "application/json",
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  })
    .then(res=>{
        toastr.success('success', 'Added successfully!'); 
        this.props.history.goBack();
    })
    .catch(err=>{
      toastr.error('Please try again!')
    })
}

  render() {
    return (
      <Card>
        <CardHeader>
          <Row>
          <Col xs="10">
           <h5>
            <i className="icon-tag" />
            &nbsp;&nbsp; Create New Coupon
          </h5>
          </Col>
          <Col xs="2">
                <AppSwitch
                  className={"mx-1"}
                  variant={"pill"}
                  color={"success"}
                  label
                  checked={this.state.enable}
                  onChange={()=>{
                    this.setState({
                      enable:!this.state.enable
                  })}}
                />
          </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="2">
              <Label>
                <strong>Coupon Name</strong>
              </Label>
            </Col>
            <Col xs="2">
              <Label>
                <strong>Amount Off</strong>
              </Label>
            </Col>
            <Col xs="2">
              <Label>
                <strong>Valid From</strong>
              </Label>
            </Col>
            <Col xs="2">
              <Label>
                <strong>Valid Till</strong>
              </Label>
            </Col>
            <Col xs="2">
              <Label>
                <strong>Description</strong>
              </Label>
            </Col>
          </Row>
          <FormGroup row>
            <Col xs="2">
              <Input
                type="text"
                id="dishDiscount"
                name={'couponName'}
                placeholder="Free Taco Monday"
                onChange={this.handleChange}
              />
            </Col>
            <Col xs="2">
              <Input
                type="text"
                id="dishPrice"
                name={"offPrecentage"}
                placeholder="11.95"
                onChange={this.handleChange}
              />
            </Col>
            <Col xs="2">
              <Input
                type="date"
                id="date-input"
                name={"applicableFrom"}
                placeholder="date"
                onChange={this.handleChange}
              />
            </Col>
            <Col xs="2">
              <Input
                type="date"
                id="date-input"
                name={"applicableTo"}
                placeholder="date"
                onChange={this.handleChange}
              />
            </Col>
            <Col xs="4">
              <Input
                type="text"
                id="dishDiscount"
                name={"description"}
                placeholder="Get FREE Taco on Monday Baseball"
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <hr />
          <FormGroup>
          {this.state.location&&this.state.location.map((data, index)=>{
                return(
                    <FormGroup check className="checkbox" key={index}>
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id={'loc'}
                      name={data.locationName}
                      value={data._id}
                      //checked={true}
                      onChange={this.handleChange}
                    />
                    <Label
                      check
                      className="form-check-label"
                      htmlFor="checkbox1"
                    >
                    {data.locationName}
                    </Label>
                  </FormGroup>
                )
              })}
          </FormGroup>
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
              <Button type="cancel" size="lg" color="danger" onClick={()=>this.props.history.goBack()}>
                <i className="fa fa-ban" /> Cancel
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

export default addCoupons;
