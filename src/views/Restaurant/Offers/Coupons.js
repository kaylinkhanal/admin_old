import React, { Component } from "react";
import { Link } from "react-router-dom";
import {toastr} from 'react-redux-toastr';
import {
  Table,
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
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
import Auth from "../../../cookie/Auth";
import axios from "axios";
import { Constants } from "../../../constants/environment";

class Coupons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DeleteChoices: false,
      DeleteOption: false,
      deleteIndex: '',
      coupons: [],
      location: []
    };
    this.toggleDeleteChoices = this.toggleDeleteChoices.bind(this);
    this.toggleDeleteOption = this.toggleDeleteOption.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checked = this.checked.bind(this);
  }

  toggleDeleteChoices(e) {

    if(e.target.value == undefined){
      this.setState({ deleteIndex:e.target.parentElement.value});
    }
    else{
      this.setState({ deleteIndex:e.target.value});
    }

    let { DeleteChoices } = this.state;

    this.setState({
      DeleteChoices: !this.state.DeleteChoices
    });
    
  }

  toggleDeleteOption() {
    axios.delete(Constants.BASE_URL+'api/coupons/'+this.state.deleteIndex,
    {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    })
    .then(res=>{
      toastr.success('success', 'Deleted successfully!');
      window.location.reload();
    })
    .catch(err=>{
      toastr.error('Please try again!');
      
    })
    let { DeleteChoices } = this.state;
    this.setState({
      DeleteChoices: !this.state.DeleteChoices
    });
  }

  toggle(){
    let { DeleteChoices } = this.state;
    this.setState({
      DeleteChoices: !this.state.DeleteChoices
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };


  componentDidMount(){
    var user_id = Auth.getToken('userId');
    axios.get(Constants.BASE_URL+'api/coupons?store='+user_id,
    {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    })
    .then(res=>{
      if(res.data.length!=0){
        this.setState({
          coupons: res.data
        })
      }
      
    })
    .catch(err=>{console.log(err)})

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

  checked =  (data, location) =>{
    var com = 0;
    if(location.length!=0) {
      location&&location.map( id => {
      if( id === data)
       {
         com =  1
         return  false;
       }
    })
    }
    return com;
}

  render() {
    var date = new Date();
    var now = String(date.getDate());
    var year = String(date.getFullYear());
    var month = String(date.getMonth()+1);
    var today = new Date(year+'-'+month+'-'+now);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="6">
                    <h5>
                      <i className="icon-tag" />
                      &nbsp;&nbsp; Coupons
                    </h5>
                  </Col>
                  <Col xs="6">
                    <Link to="./addCoupons">
                      <button className="float-right btn-pill btn btn-danger btn-lg">
                        + Add Coupons
                      </button>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive hover size="lg">
                  <thead>
                    <tr>
                      <th>Coupon Name</th>
                      <th>Amount Off</th>
                      <th>Valid From</th>
                      <th>Valid Till</th>
                      <th>locations</th>
                      <th>Status</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.coupons&&this.state.coupons.map((coupon, index)=>{
                      if(coupon.applicableTo!='closed') {
                        var timeStamp = new Date(coupon.applicableTo);
                      }
                      return(
                        <tr key={index}>
                      <td>
                        <p>{coupon.couponName}</p>
                      </td>
                      <td>
                        <p>{coupon.offPrecentage}</p>
                      </td>
                      <td>
                        <p>{coupon.applicableFrom}</p>
                      </td>
                      <td>
                        <p>{coupon.applicableTo}</p>
                      </td>
                      <td>
                        {this.state.location&&this.state.location.map((value, index)=>{
                          return(
                            <p key={index} style={{ display: this.checked(value._id, coupon.location)?'block':'none', marginBottom: 0}}>{value.locationName}</p>
                          )
                        })}
                      </td>
                      <td>
                        <AppSwitch
                          className={"mx-1"}
                          variant={"pill"}
                          color={"success"}
                          label
                          checked={(timeStamp>today)?coupon.enable:false}
                          onChange={()=>{axios.get(Constants.BASE_URL + `api/coupons/activation/${coupon._id}`,
                          {
                            headers: {
                              //"content-type": "application/json",
                              Authorization: "Bearer "+Auth.getToken('token'),
                            }
                          })
                          .then(res=>{toastr.success('Success', coupon.couponName+' Status Updated!')})
                          .catch(err=>{toastr.warning('Warning', 'Please Try again!')})
                         }}
                        />
                      </td>
                      <td>
                        <Link to={"./coupon/"+coupon._id}>
                          <i className="icon-note" />
                        </Link>
                      </td>
                      <td>
                        <Button
                          color="danger"
                          onClick={this.toggleDeleteChoices}
                          className="mr-1"
                          value={coupon._id}
                        >
                          <i className="fa fa-trash" value={coupon._id}/>
                        </Button>
                       
                      </td>
                    </tr>
                      )
                    })}
                    <Modal
                          isOpen={this.state.DeleteChoices}
                          toggle={this.toggleDeleteChoices}
                          className={"modal-danger " + this.props.className}
                        >
                          <ModalHeader toggle={this.toggleDeleteChoices}>
                            DELETE CHOICES
                          </ModalHeader>
                          <ModalBody>
                           Are you relly to delete?
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="danger"
                              onClick={this.toggleDeleteOption}
                            >
                              Do Something
                            </Button>{" "}
                            <Button
                              color="secondary"
                              onClick={this.toggle}
                            >
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Coupons;
