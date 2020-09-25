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
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import {getstore} from '../../../redux/actions/getStoreAction';
import {toastr} from 'react-redux-toastr';
import {connect} from 'react-redux';
import axios from "axios";
import {Constants} from "../../../constants/environment";
import Auth from "../../../cookie/Auth";

class AddOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danger: false,
      storeType: '',
      optionName: '',
      store_types: [],
      clientsAddonOptions: []
    };

    this.toggleDelete = this.toggleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(data) {
      var store_type = data.store_type.store_type;
      this.setState({
          store_types: store_type
      })
  }
  componentDidMount() {
      this.props.getstore();
  }
  componentWillMount(){
    axios.get(Constants.BASE_URL+'api/dishoption/store/options/getstoreowner',
    {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    })
    .then(res=>{
      this.setState({
        clientsAddonOptions: res.data
      })
    })
  }
  toggleDelete() {
    this.setState({
      danger: !this.state.danger
    });
  }

  handleChange(e) {
     var targetName = e.target.name;
     if(targetName == "optionName") {
     this.setState({
         optionName: e.target.value
     }) 
    } 
    if(targetName == "storeType") {
        this.setState({
            storeType: e.target.value
        })
    }
  }

  handleSubmit() {
    var submitData = [];
    const { optionName } = this.state;
    const { storeType } = this.state;
    if(optionName == ""||storeType == '') {
      toastr.error('please try again!');
      return;
    }
    submitData = {
        "optionName": optionName,
        "restaurantID": storeType,
        "admin_enable":true
    }
    axios.post(Constants.BASE_URL+'api/dishoption/', submitData, 
    {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    })
    .then(res => {
        if(res.data) {
            toastr.success('success', 'Added successfully!');
        } else {
            toastr.error('please try again!');
        }
    })
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <h5>
            <i className="icon-map" />
            &nbsp;&nbsp; Add New Add-On Option
          </h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="2">
              <Label htmlFor="dishPrice">
                <strong>Add-On Option</strong>
              </Label>
            </Col>
            <Col xs="2">
              <Label htmlFor="dishTotalPrice">
                <strong>Stores Types</strong>
              </Label>
            </Col>
          </Row>
          <FormGroup row>
            <Col xs="2">
              <Input
                type="text"
                id="optionName"
                name="optionName"
                placeholder=""
                onChange={ this.handleChange }
              />
            </Col>
            <Col xs="2">
              <Input type="select" name="storeType" id="storeType" onChange={ this.handleChange } >
                <option value="">Choose Store Type</option>
                {this.state.store_types&&this.state.store_types.map(( storetype, index ) => {
                    return (
                    <option key={ index } value={ storetype._id }>{ storetype.storeTypeName }</option>
                    )
                })}
              </Input>
            </Col>

            <Col xs="2">
              <FormGroup>
                <Button
                  type="button"
                  size="md"
                  color="success"
                  onClick={this.handleSubmit}
                >
                  <i className="fa fa-plus-square-o" />
                  &nbsp;&nbsp;Add-On Option
                </Button>
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup>
            <Breadcrumb>
              <BreadcrumbItem>
                <h5>New Customer Add-On Option</h5>
              </BreadcrumbItem>
            </Breadcrumb>
            {this.state.clientsAddonOptions&&this.state.clientsAddonOptions.map((option, index) => {
                  var date = new Date(option.createdAt);
                  var year = date.getFullYear();
                  var month = date.getMonth()+1;
                  var day = date.getDate();
                  var createdAt = month+'/'+day+'/'+year;
              return (
            <FormGroup row key={ index }>
              <Col xs="2">
                <FormGroup check className="checkbox">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    id="checkbox2"
                    name="AdminApproved"
                    onChange={
                      ()=>{
                        axios
                        .get(
                          Constants.BASE_URL +
                            `api/dishoption/activation/${option._id}`,
                            {
                              headers: {
                                //"content-type": "application/json",
                                Authorization: "Bearer "+Auth.getToken('token'),
                              }
                            }
                        )
                        .then(res => {
                          toastr.success(
                            "Success",
                              " Status Updated!"
                          );
                        })
                        .catch(err => {
                          toastr.warning(
                            "Warning",
                            "Please Try again!"
                          );
                        });
                      }
                    }
                  />
                  <Label check className="form-check-label" htmlFor="checkbox2">
                    Approved
                  </Label>
                </FormGroup>
              </Col>
              <Col xs="2">
                <Input
                  type="text"
                  id="dishDiscount"
                  name="dishDiscount"
                  placeholder=""
                  value={option.optionName}
                />
              </Col>
              <Col xs="2">
                <Input type="select" name="storeType" id="storeType" value={option.restaurantID}>
                  <option value="">Choose Store Type</option>
                  {this.state.store_types&&this.state.store_types.map(( storetype, index ) => {
                        return (
                          <option key={ index } value={ storetype._id }>{ storetype.storeTypeName }</option>
                        )
                  })}
                </Input>
              </Col>
              <Col xs="2">
                <p>{ createdAt }</p>
              </Col>
            </FormGroup>
              )
            })}
            
          </FormGroup>
          <hr />
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    );
  }
}

function mapStateToProps(state, props) {
    return { store_type: state.store_type };
}

export default  connect(mapStateToProps, { getstore })( AddOption );
