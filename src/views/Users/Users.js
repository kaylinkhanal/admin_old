import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import axios from "axios";
import { Constants } from "../../constants/environment";
import Auth from "../../cookie/Auth";
//import usersData from "./UsersData";

function UserRow(props) {
  const user = props.user;
  const userLink = `/users/details/${user._id}`;

  const getBadge = status => {
    return status === "Active"
      ? "success"
      : status === "Inactive"
      ? "secondary"
      : status === "Pending"
      ? "warning"
      : status === "Banned"
      ? "danger"
      : "primary";
  };

  return (
    <tr>
      <th scope="row">
        {user._id}
      </th>
      <td>
        <Link to={userLink}>{user.name}</Link>
      </td>
      <td>{user.createdAt}</td>
      <td>{user.role}</td>
      {/* {<td>
       
          <Badge color={getBadge(user.state)}>{user.state}</Badge>
      
      </td>} */}
    </tr>
  );
}


class Users extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  
  componentDidMount() 
{
  // this.setState({
  //   store_type_name: storeType
  // });
  axios.get(Constants.BASE_URL + `api/users`,
  {
    headers: {
      //"content-type": "application/json",
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  }).then(res => {
   
    this.setState({
      users: res.data
    });
    console.log(res.data)
  });
}


  render() {
   // const userList = this.state.users.filter(user => user._id < 10);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Users
                <small className="text-muted"></small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">registered</th>
                      <th scope="col">role</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.users.map((user, index) => (
                      <UserRow key={index} user={user}/>
                    )
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Users;
