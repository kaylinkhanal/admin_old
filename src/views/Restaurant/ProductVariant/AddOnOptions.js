import React, { Component } from "react";
import { toastr } from "react-redux-toastr";
import {  MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBBadge } from 'mdbreact';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Button,
  Table
} from "reactstrap";
import { Link } from "react-router-dom";
import { AppSwitch } from "@coreui/react";
import {getstore} from '../../../redux/actions/getStoreAction';
import {connect} from 'react-redux';
import axios from "axios";
import Auth from "../../../cookie/Auth";
import { Constants } from "../../../constants/environment";

class AddOnOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store_type_name: "",
      store_owner_list: [],
      AddOption: false,
      dishName: '',
      price:'',
      store_types: [],
      storeownerinfo: [],
      EditOption: false,
      option_id: '',
      DeleteOption: false,
      enableChoice: '',
      AddOnOptions: [],
      optionName: '',
      AddOnOption: {
        dishName: '',
        price:''
      }
    };
  }


  async componentDidMount() {
    var user_id = Auth.getToken("userId");
    await axios.get(Constants.BASE_URL + `api/store/store-owner/${user_id}`,
    {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    }).then(res => {
      const data = res.data;
      this.setState({
        storeownerinfo: data
      });
    });

   axios.get(Constants.BASE_URL+'api/dishoption/store/'+user_id,
   {
    headers: {
      //"content-type": "application/json",
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  })
   .then(res=>{
     if(res.data){
       this.setState({
        AddOnOptions: res.data
       })
     }
   })
   this.props.getstore();
  }

  componentWillReceiveProps(data) {
    var store_type = data.store_type.store_type;
    this.setState({
        store_types: store_type
    })
  }

  handleChange = (e, id) => {
    
    const { AddOnOption } = this.state;
    AddOnOption[e.target.name] = e.target.value;
    // if(id == undefined) {
    //   if(e.target.name == "ChoiceOptions") {
    //     this.setState({
    //       ChoiceOption: e.target.value
    //     })
    //   } else {
    //     ChoiceName = e.target.value
    //   }
    // } else {
    //   this.setState({
    //     enableChoice: e.target.value
    //   })
    // }
    this.setState({
      AddOnOption
    })
  }

  AddChoiceOption = (e) => {
    var { ChoiceOptions } = this.state;
    if(this.state.ChoiceOption == "") {
      toastr.error('please  fill out!');
      return;
    }
    ChoiceOptions = [ ...ChoiceOptions, this.state.ChoiceOption ];
    this.setState({
      ChoiceOptions,
    })
    this.setState({
      ChoiceOption: ''
    })
  }

  submitAddOption = () => {
    var user_id = Auth.getToken("userId");
    if(this.state.AddOnOption.dishName == "") {
      toastr.error('please  fill out option name!');
      return;
    } 

    if(this.state.AddOnOption.price == "") {
      toastr.error('please   fill out price!');
      return;
    } 

     var submitData = {
       restaurantID: this.state.storeownerinfo[0].store_type_id,
       optionName: this.state.AddOnOption.dishName,
       price: this.state.AddOnOption.price,
       store_id: user_id
     }
     
    axios.post(Constants.BASE_URL+`api/dishoption/`, submitData,
    {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    })
    .then(res => {
   
      if(res.data) {
        toastr.success('success', 'Added successfully!');
        this.setState({
          AddOption: false
        })
        window.location.reload();
      } else {
          toastr.error('please try again!');
      }

    })
  }

  EditAddOption (index, choice_id) {
  
    const { AddOnOptions } = this.state;
    const { AddOnOption } = this.state;
    AddOnOption.dishName = AddOnOptions[index].optionName;
    AddOnOption.price = AddOnOptions[index].price;

    this.setState({
      AddOnOption
    })
    this.setState({
      option_id: choice_id,
    })

    this.setState({
      EditOption: true
    });

  }

  submitEditOption () {
    var submitData = {
      optionName: this.state.AddOnOption.dishName,
      price: this.state.AddOnOption.price,
      _id: this.state.option_id,
    }
    axios.put(Constants.BASE_URL+`api/dishoption/`+this.state.option_id, submitData,
    {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    })
    .then(res=> {
      if(res.data) {
        toastr.success('success', 'Updated successfully!');
        this.setState({
          EditOption: false
        })
        window.location.reload();
      } else {
          toastr.error('please try again!');
      }
    })
  }
  render() {

      const { AddOnOptions } = this.state;
      var rows = [];
  
      AddOnOptions.map((choice, index) => {
        rows.push({
          "Option Name":      choice.optionName,
          "Price":            choice.price,
          "Edit":             <Button 
                                onClick={()=>{this.EditAddOption(index, choice._id )} }
                                value={ index }>
                                <i className="icon-note" />
                              </Button>,
          "Delete":           <Button
                                color="danger"
                                onClick={()=>{
                                  this.setState({
                                    DeleteOption:true,
                                    option_id: choice._id,
                                    optionName: choice.optionName
                                  })
                                  
                                }}
                                className="mr-1"
                                value={choice._id}
                                >
                              <i className="fa fa-trash" value={choice._id} 
                              />
                              </Button>
          })
      });
      var columns = [
        {
          label: 'Option Name',
          field: 'Option Name',
          sort: 'asc',
          width: 150
        },

        {
          label: 'Price',
          field: 'Price',
          sort: 'asc',
          width: 150
        },

        {
          label: 'Edit',
          field: 'Edit',
          sort: 'asc',
          width: 150
        },
        {
          label: "Delete",
          field: 'Delete',
          sort: "asc",
          width: 150
        }
      ];
  
      const data = {
      columns: columns,
      rows: rows
      };

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="10">
                    <h5>
                      <i className="icon-people" />
                        Add-On Management
                    </h5>
                  </Col>
                  <Col xs="2">
                      <button className="float-right btn-pill btn btn-danger btn-lg" 
                        onClick={()=> {
                          this.setState({
                            AddOption: true
                          })
                        }}>
                        + Add Option
                      </button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                  <MDBDataTable
                    striped
                    bordered
                    hover
                    data={data}
                  />
              </CardBody>
              <MDBModal isOpen={this.state.AddOption}>
                  <MDBModalHeader>NEW Add-On Option</MDBModalHeader>
                  <MDBModalBody>
                     <MDBInput label="Name *" onChange={this.handleChange} name="dishName"/>
                     {/* <input name="choiceOptionEnable" type="checkbox"/> */}
                      <MDBInput label="Price *" name="price"  onChange={this.handleChange} type="number" min="0"/>
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="secondary" 
                      onClick={() =>
                          this.setState({
                              AddOption: false
                      })}
                    >
                      Close
                    </MDBBtn>
                    <MDBBtn color="danger" onClick={this.submitAddOption}>OK</MDBBtn>
                  </MDBModalFooter>
              </MDBModal>       
              <MDBModal isOpen={this.state.EditOption}>
                  <MDBModalHeader>EDIT Option</MDBModalHeader>
                  <MDBModalBody>
                     <MDBInput label="Name *" onChange={this.handleChange} name="dishName"  value={this.state.AddOnOption.dishName}/>
                     <MDBInput label="Price *" name="price"  onChange={this.handleChange} value={this.state.AddOnOption.price} type="number" min="0"/>
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="secondary" 
                      onClick={() =>
                          this.setState({
                            EditOption: false
                      })}
                    >
                      Close
                    </MDBBtn>
                    <MDBBtn color="success" onClick={this.submitEditOption.bind(this)}>OK</MDBBtn>
                  </MDBModalFooter>
              </MDBModal>       
              <MDBModal isOpen={this.state.DeleteOption}>
                  <MDBModalHeader>DELETE Option</MDBModalHeader>
                  <MDBModalBody>
                    Are you delete {this.state.optionName}?
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="secondary" 
                      onClick={() =>
                          this.setState({
                            DeleteOption: false
                      })}
                    >
                      Close
                    </MDBBtn>
                    <MDBBtn color="success" onClick={()=>{
                       axios.delete(Constants.BASE_URL+`api/dishoption/${this.state.option_id}`)
                       .then(res=>{
                        toastr.success('success', 'Deleted successfully!');
                        window.location.reload();
                       })
                    }}>OK</MDBBtn>
                  </MDBModalFooter>
              </MDBModal>       
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return { store_type: state.store_type };
}

export default  connect(mapStateToProps, { getstore })(AddOnOptions);