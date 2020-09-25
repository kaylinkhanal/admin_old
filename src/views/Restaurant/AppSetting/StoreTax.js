import React, { Component } from "react";
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
import ImgDropCrop from "../../../components/ImgDropCrop";
import Auth from "../../../cookie/Auth";
import axios from "axios";
import { Constants } from "../../../constants/environment";
import {toastr} from 'react-redux-toastr';

//https://github.com/casesandberg/react-color
//https://casesandberg.github.io/react-color/

class StoreTax extends Component {
  constructor(props){
    super(props);
    this.state = {
      stateTax:[{'taxName':'', 'taxRate':''}]
    }
    this.deleteStateTax = this.deleteStateTax.bind(this);
  }

    async componentDidMount(){
      var id = Auth.getToken('userId');
      await axios.get(Constants.BASE_URL+`api/settings/${id}`,
      {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer "+Auth.getToken('token'),
        }
      })
        .then(res=>{
          this.setState({
            stateTax: res.data.stateTax
          })
        })
    }
  addStateTax = ()=>{
    let { stateTax } = this.state;
    if(!this.checkvariant(stateTax)){
      toastr.error('The fields must not be blank and taxRate should be number and smaller than 100!');
      return;
    }
    stateTax = [...this.state.stateTax, {'taxName':'', 'taxRate':''}];
    this.setState({
      stateTax
    });
  }

  deleteStateTax = (e) => {
    var id = e.target.value;
    let { stateTax } = this.state;
    stateTax = stateTax.filter(function(value,index){
      return index != id
    });
    this.setState({
      stateTax
    });
  }

  handleChange = (e, index)=> {
    const { stateTax } = this.state;
    
    stateTax[index][(e.target.name)] = e.target.value;
    this.setState({
      stateTax
    });
  }

  checkvariant(array){
    
    for(var i = 0; i<array.length; i++){
       if(array[i].taxRate == ""||array[i].taxName == ""||!array[i].taxRate.match(/^([0-9])/)||array[i].taxRate>100)
       {
         return false;
       }
     }
     return true;
   }

  handleSubmit=()=>{
    if(!this.checkvariant(this.state.stateTax)){
      toastr.error('The fields must not be blank and taxRate should be number and smaller than 100!');
      return;
    }
    if(this.state.stateTax.length==0){
      toastr.error('please enter state tax');
      return;
    }
    var id = Auth.getToken('userId');
    axios.post(Constants.BASE_URL+`api/settings/${id}`, this.state,
    {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    })
      .then(res=>{
        toastr.success('success', 'Added successfully!');
      })
      .catch(err=>{
        toastr.error('Please try again!');
      })
  }
  render() {
    return (
      <Card>
        <CardHeader>
          <h5>
            <i className="icon-calculator" />
            &nbsp;&nbsp;State Tax
          </h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="4">
              <Label>
                <strong>Tax Name</strong>
              </Label>
            </Col>
            <Col xs="2">
              <Label>
                <strong>Tax Rate</strong>
              </Label>
            </Col>
          </Row>
          
          {this.state.stateTax&&this.state.stateTax.map((data, index)=>{
            return(
                <FormGroup row className="my-0" key={index}>
            <Col xs="4">
              <FormGroup>
                <Input
                  type="text"
                  id="taxRate"
                  name="taxName"
                  placeholder="LA County Tax"
                  onChange={(e)=>this.handleChange(e, index)}
                  value={data.taxName}
                />
              </FormGroup>
            </Col>
            <Col xs="2">
             <FormGroup>
                <InputGroup className="input-prepend">
                  <Input id="taxName" type="text" placeholder="" name="taxRate" onChange={(e)=>this.handleChange(e, index)} value={data.taxRate}/>
                  <InputGroupAddon addonType="append">
                    <InputGroupText>%</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Col> 
            <Col xs="2">
            <FormGroup>
                <Button
                  type="button"
                  size="md"
                  color="danger"
                  onClick={(e)=>this.deleteStateTax(e)}
                  value={index}
                >
                  <i className="fa fa-trash" value={index}/>
                  Delete
                </Button>
              </FormGroup>
            </Col>
          </FormGroup>
            )
          })}
            <Col xs="2">
              <FormGroup>
                <Button
                  type="button"
                  size="md"
                  color="success"
                  onClick={this.addStateTax}
                >
                  <i className="fa fa-plus-square-o" />
                  &nbsp;&nbsp;Add New State Tax
                </Button>
              </FormGroup>
            </Col>
          <br />
          <br />
          <hr />
          <FormGroup row className="my-0">
            <Col xs="2">
              <FormGroup>
                <Button
                  type="button"
                  size="md"
                  color="primary"
                  onClick={this.handleSubmit}
                >
                  <i className="fa fa-dot-circle-o" /> Update
                </Button>
              </FormGroup>
            </Col>
          </FormGroup>
        </CardBody>
        <CardFooter>
          <Row />
        </CardFooter>
      </Card>
    );
  }
}
export default StoreTax;
