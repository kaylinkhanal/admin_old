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

class Choices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store_type_name: "",
      store_owner_list: [],
      choices: [],
      AddOption: false,
      ChoiceName: '',
      ChoiceOption: '',
      ChoiceOptions: [],
      store_types: [],
      storeownerinfo: [],
      EditOption: false,
      choice_id: '',
      DeleteOption: false,
      enableChoice: ''
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

   axios.get(Constants.BASE_URL+'api/choice?store='+user_id,
   {
    headers: {
      //"content-type": "application/json",
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  })
   .then(res=>{
     if(res.data){
       this.setState({
         choices: res.data
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

    var { ChoiceName } = this.state;
    var { ChoiceOptions } = this.state;
    if(id == undefined) {
      if(e.target.name == "ChoiceOptions") {
        this.setState({
          ChoiceOption: e.target.value
        })
      } else {
        ChoiceName = e.target.value
      }
    } else {
      this.setState({
        enableChoice: e.target.value
      })
    }
    this.setState({
      ChoiceName,
      ChoiceOptions
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

  submitAddChoiceOption = () => {
    var user_id = Auth.getToken("userId");
    if(this.state.enableChoice == "") {
      toastr.error('please  fill out!');
      return;
    }
    var submitData = {
      ChoiceName:this.state.ChoiceName,
      ChoiceOptions: this.state.ChoiceOptions,
      restaurantID: user_id,
      enable: true,
      enableChoice: this.state.enableChoice
    }
    axios.post(Constants.BASE_URL+`api/choice/`, submitData,
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

  EditChoiceOption (index, choice_id) {
    
    const { choices } = this.state;
    this.setState({
      ChoiceName: choices[index].ChoiceName,
      ChoiceOptions: choices[index].ChoiceOptions,
      choice_id: choice_id,
      enableChoice: choices[index].enableChoice
    })

    this.setState({
      EditOption: true
    });

  }

  submitEditChoiceOption () {
    var submitData = {
      ChoiceName: this.state.ChoiceName,
      ChoiceOptions: this.state.ChoiceOptions,
      _id: this.state.choice_id,
      enableChoice: this.state.enableChoice
    }
    axios.put(Constants.BASE_URL+`api/choice/`+this.state.choice_id, submitData,
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
      const { choices } = this.state;
      var rows = [];
  
      choices.map((choice, index) => {
        var choiceOptions = '';
        choice.ChoiceOptions.map(choiceoption=>{
          var enableChoice;
          if(choiceoption == choice.enableChoice){
            enableChoice = <MDBBadge pill color="info" style={{fontSize: '15px'}}>{choiceoption}</MDBBadge>
          } else {
            enableChoice = <MDBBadge pill color="light" style={{fontSize: '15px'}}>{choiceoption}</MDBBadge>
          }
          choiceOptions = [ choiceOptions, enableChoice ];
        })
        rows.push({
          "Choice Name":      choice.ChoiceName,
          "Choice Options":   <div>{ choiceOptions }</div>,
          "Edit":             <Button 
                                onClick={()=>{this.EditChoiceOption( index, choice._id )} }
                                value={ index }>
                                <i className="icon-note" />
                              </Button>,
          "Delete":           <Button
                                color="danger"
                                onClick={()=>{
                                  this.setState({
                                    DeleteOption:true,
                                    choice_id: choice._id,
                                    ChoiceName: choice.ChoiceName
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
          label: 'Choice Name',
          field: 'Choice Name',
          sort: 'asc',
          width: 150
        },

        {
          label: 'Choice Options',
          field: 'Choice Options',
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
                        Choices Management
                    </h5>
                  </Col>
                  <Col xs="2">
                      <button className="float-right btn-pill btn btn-danger btn-lg" 
                        onClick={()=> {
                          this.setState({
                            AddOption: true
                          })
                        }}>
                        + Add Choices
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
                  <MDBModalHeader>NEW CHOICE</MDBModalHeader>
                  <MDBModalBody>
                     <MDBInput label="Name *" onChange={this.handleChange} name="ChoiceName"/>
                     <label>Choice Options</label>
                     {/* <input name="choiceOptionEnable" type="checkbox"/> */}
                     <Row>
                       <Col xs="8">
                          {this.state.ChoiceOptions.map((choicedata, index) => {
                              return (
                                <div>
                                  <input name="ChoiceOption"  onChange={(e)=>this.handleChange(e, index)} key={ index } value={choicedata} type="radio" />{"  "}
                                  <label>{choicedata}</label>
                                </div>
                              );
                          })}
                          <MDBInput name="ChoiceOptions"  onChange={this.handleChange} value={this.state.ChoiceOption}/>
                       </Col>
                       <Col xs="4">
                           <button type="button" className="btn btn-success" onClick={this.AddChoiceOption}>ADD</button>
                       </Col>
                     </Row>
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
                    <MDBBtn color="danger" onClick={this.submitAddChoiceOption}>OK</MDBBtn>
                  </MDBModalFooter>
              </MDBModal>       
              <MDBModal isOpen={this.state.EditOption}>
                  <MDBModalHeader>EDIT CHOICE</MDBModalHeader>
                  <MDBModalBody>
                     <MDBInput label="Name *" onChange={this.handleChange} name="ChoiceName"  value={this.state.ChoiceName}/>
                     <label>Choice Options</label>
                     {/* <input name="choiceOptionEnable" type="checkbox"/> */}
                     <Row>
                       <Col xs="8">
                          {this.state.ChoiceOptions.map((choicedata, index) => {
                              return (
                                <div>
                                  <input name="ChoiceOption"  onChange={(e)=>this.handleChange(e, index)} key={ index } value={choicedata} type="radio" checked={this.state.enableChoice == choicedata} />{"  "}
                                  <label>{choicedata}</label>
                                </div>
                              );
                          })}
                          <MDBInput name="ChoiceOptions"  onChange={this.handleChange} value={this.state.ChoiceOption}/>
                       </Col>
                       <Col xs="4">
                           <button type="button" className="btn btn-success" onClick={this.AddChoiceOption}>ADD</button>
                       </Col>
                     </Row>
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
                    <MDBBtn color="success" onClick={this.submitEditChoiceOption.bind(this)}>OK</MDBBtn>
                  </MDBModalFooter>
              </MDBModal>       
              <MDBModal isOpen={this.state.DeleteOption}>
                  <MDBModalHeader>DELETE CHOICE</MDBModalHeader>
                  <MDBModalBody>
                    Are you delete {this.state.ChoiceName}?
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
                       axios.delete(Constants.BASE_URL+`api/choice/${this.state.choice_id}`,
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

export default  connect(mapStateToProps, { getstore })(Choices);