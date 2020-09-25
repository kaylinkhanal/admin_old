import React, { Component } from "react";
import { toastr } from "react-redux-toastr";
// import { MDBDataTable } from 'mdbreact';
import {  MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
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
  Table,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import { Link } from "react-router-dom";
import { AppSwitch } from "@coreui/react";
import Auth from "../../../cookie/Auth";

import axios from "axios";
import { Constants } from "../../../constants/environment";

class ListOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store_type_name: "",
      store_owner_list: [],
      dishoptions: [],
      deleteAddOption: false,
      deleteOptionValue: ''
    };
    this.deleteAddOption = this.deleteAddOption.bind(this);
    this.deleteOptionModal = this.deleteOptionModal.bind(this);
  }

 async componentDidMount() {
     var user_id = Auth.getToken('userId');
    
     await axios.get(Constants.BASE_URL+'api/dishoption/',
     {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    })
     .then(res => {
         if(res.data)
         this.setState({
             dishoptions: res.data
         })
     })
  }

  deleteAddOption () {
      var id = this.state.deleteOptionValue;
      this.setState({
        deleteAddOption: !this.state.deleteAddOption
      })

      axios.delete(Constants.BASE_URL+'api/dishoption/'+id,
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
      
  }
  deleteOptionModal (e) {
    this.setState({
      deleteAddOption: !this.state.deleteAddOption
    })
      if(e.target.value == undefined ) {
          this.setState({deleteOptionValue: e.target.parentElement.value})
      } else {
        this.setState({deleteOptionValue: e.target.value})
      }

  }
  render() {
   const dishoptions = this.state.dishoptions;
   var rows = [];
   
   dishoptions.map((dishoption, index) => {
    var date = new Date(dishoption.createdAt);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var createdAt = month+'/'+day+'/'+year;
     rows.push({
       "Add-One Name": dishoption.optionName,
       "Store Type":   (dishoption.storetype.length != 0)?dishoption.storetype[0].storeTypeName:'Global',
       "Add Date":     createdAt,
       "Approved":     <AppSwitch
                          className={"mx-1"}
                          variant={"pill"}
                          color={"success"}
                          label
                          key={dishoption._id}
                          checked={dishoption.admin_enable}
                          onChange={() => {
                            axios
                              .get(
                                Constants.BASE_URL +
                                  `api/dishoption/activation/${dishoption._id}`,
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
                          }}
                      />,
       "Delete":      <Button
                        color="danger"
                        onClick={this.deleteOptionModal}
                        className="mr-1"
                        value={dishoption._id}
                       >
                      <i className="fa fa-trash" value={dishoption._id} 
                      />
                      </Button>
        })
    });
   var columns = [
     {
       label: 'Add-One Name',
       field: 'Add-One Name',
       sort: 'asc',
       width: 150
     },

     {
       label: 'Store Type',
       field: 'Store Type',
       sort: 'asc',
       width: 150
     },

     {
       label: 'Add Date',
       field: 'Add Date',
       sort: 'asc',
       width: 150
     },
     {
       label: 'Approved',
       field: 'Approved',
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
                      Add On's Options Management
                    </h5>
                  </Col>
                  <Col xs="2">
                    {/* <Link to={"../AddOptions"}>
                      <button className="float-right btn-pill btn btn-danger btn-lg">
                        + Add Add-On Option
                      </button>
                    </Link> */}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {/* <Table responsive hover size="lg">
                  <thead>
                    <tr>
                      <th>Add-One Name</th>
                      <th>Store Type</th>
                      <th>Add Date</th>
                      <th>Approved</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.dishoptions &&
                      this.state.dishoptions.map((option, index) => {
                        return (
                          <tr key={index}>
                            <td>
                                {option.optionName ? option.optionName : ""}
                            </td>
                            <td>
                                Restaurant
                            </td>
                            <td> 
                                {option.createdAt} 
                            </td>
                            <td>
                              <AppSwitch
                                className={"mx-1"}
                                variant={"pill"}
                                color={"success"}
                                label
                                key={option._id}
                                checked={option.enable}
                                onChange={() => {
                                  axios
                                    .get(
                                      Constants.BASE_URL +
                                        `api/dishoption/activation/${option._id}`
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
                                }}
                              />
                            </td>
                            <td>
                             
                              <Button
                                color="danger"
                                onClick={this.deleteOptionModal}
                                className="mr-1"
                                value={option._id}
                              >
                              <i className="fa fa-trash" value={option._id} 
                              />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table> */}
                  <MDBDataTable
                    striped
                    bordered
                    hover
                    data={data}
                  />
              </CardBody>
              <MDBModal isOpen={this.state.deleteAddOption} toggle={this.toggleDeleteChoices}>
                  <MDBModalHeader toggle={this.toggleDeleteChoices}>DELETE OPTION</MDBModalHeader>
                  <MDBModalBody>
                  Are you sure  to delete?
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={() =>
                        this.setState({
                            deleteAddOption: !this.state.deleteAddOption
                        })
                    }>Close</MDBBtn>
                    <MDBBtn color="danger" onClick={this.deleteAddOption}>DELETE</MDBBtn>
                  </MDBModalFooter>
              </MDBModal>
              {/* <Modal
                isOpen={this.state.deleteAddOption}
                toggle={this.toggleDeleteChoices}
                >
                <ModalHeader toggle={this.toggleDeleteChoices}>
                    DELETE OPTION
                </ModalHeader>
                <ModalBody>
                Are you sure  to delete?
                </ModalBody>
                <ModalFooter>
                    <Button
                    color="danger"
                    onClick={this.deleteAddOption}
                    >
                    Delete
                    </Button>{" "}
                    <Button
                    color="secondary"
                    onClick={() =>
                        this.setState({
                            deleteAddOption: !this.state.deleteAddOption
                        })
                    }
                    >
                    Cancel
                    </Button>
                </ModalFooter>
              </Modal> */}
              {/* <CardFooter>
                <nav>
                  <Pagination>
                    <PaginationItem disabled>
                      <PaginationLink previous tag="button" />
                    </PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">5</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink next tag="button" />
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ListOptions;
