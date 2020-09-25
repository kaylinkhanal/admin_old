import React, { Component } from "react";
import axios from "axios";
import {toastr} from 'react-redux-toastr'
import Auth from "../../../cookie/Auth";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
import { Link } from "react-router-dom";
import { get } from "https";
import { Constants } from "../../../constants/environment";
import { getStaff } from '../../../redux/actions/userAction'
import {connect} from 'react-redux'

class AllEmployee extends Component {
  constructor(props){
    super(props);
    this.state={
      staff:[]
    }
  }

 
  
  componentDidMount(){
    // var id = Auth.getToken('userId');console.log(id);
    // axios.get(Constants.BASE_URL + `api/users/staff/all/${id}`)
    //   .then(res=>{
    //       this.setState({
    //         staff:res.data
    //       })
    //       console.log(res.data)
    //   });

    this.props.getStaff();console.log(this.props);
  }

  componentWillReceiveProps(data){
    this.setState({
      staff: data.staff.staff
    })
  }
 

  render() {console.log(this.state.staff);
    const staff = this.state.staff
    var role = Auth.getToken("role");
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="10">
                    <h5>
                      <i className="icon-people" /> All Employees
                    </h5>
                  </Col>
                  <Col xs="2">
                  
                    <Link to="./AddEmployee">
                      
                      <button className="float-right btn-pill btn btn-danger btn-lg">
                        + Add Employee
                      </button>
                     
                    </Link>
                    
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive hover size="lg">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Contact Number</th>
                      <th>Role</th>
                      <th>Enable/Disable</th>
                    </tr>
                  </thead>
                  <tbody>
                  {staff&&staff.map((data, index)=>{

                    return(
                      <tr key={index}>
                      <td>
                      
                        <Link to={`./EditEmployee/${data._id}`}>{data.name}</Link>
                        
                      </td>
                      <td>{data.contactNumber}</td>
                      <td>{data.role}</td>
                      <td>
                        <AppSwitch
                          className={"mx-1"}
                          variant={"pill"}
                          color={"success"}
                          label
                          disabled={role=="User"?(true):(false)}
                          checked={data.activationStatus}
                          onChange={()=>{axios.get(Constants.BASE_URL + `api/users/activation/${data._id}`,
																					{
												  headers: {
													//"content-type": "application/json",
													Authorization: "Bearer "+Auth.getToken('token'),
												  }
												})
                                                .then(res=>{toastr.success('Success', data.name+' Status Updated!')})
                                                .catch(err=>{toastr.warning('Warning', 'Please Try again!')})
                                                }}
                        />
                      </td>
                    </tr>
                    )
                  })}
                    
                  </tbody>
                </Table>
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
              </CardBody>
              <CardFooter />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return { staff: state.staff };
}
export default  connect(mapStateToProps, { getStaff })(AllEmployee);