import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import Auth from "../../../cookie/Auth";
import {
  // Badge,
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
import { Constants } from "../../../constants/environment";
import { getLocations } from "../../../redux/actions/locationAction";
import { connect } from "react-redux";

class allLocations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: []
    };
  }

  async componentDidMount() {
    //  var user_id = Auth.getToken("userId");console.log(user_id);
    this.props.getLocations();
    console.log(this.props);
    // await axios.get(Constants.BASE_URL + `api/locations/restaurant/${user_id}`).then(res => {
    //   const data = res.data;
    //   this.setState({
    //     locations: data
    //   });
    // });
  }

  componentWillReceiveProps(data) {
    var data = data.locations.location;
    if (data.length != 0) {
      this.setState({
        locations: data
      });
    }
  }
  render() {
    var role = Auth.getToken("role");
    var locations = [];
    if (this.state.locations.length != 0) locations = this.state.locations;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="10">
                    <h5>
                      <i className="icon-location-pin" /> All Locations
                    </h5>
                  </Col>
                  <Col xs="2">
                    <Link to="./addLocation">
                      <button className="float-right btn-pill btn btn-danger btn-lg">
                        + Add Location
                      </button>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive hover size="lg">
                  <thead>
                    <tr>
                      <th>Location Name</th>
                      <th>Contact Number</th>
                      <th>Manager</th>
                      <th>Enable/Disable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations &&
                      locations.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <Link to={`./edit/${data._id}`}>
                                {data.locationName}
                              </Link>
                            </td>
                            <td>{data.contactNumber}</td>
                            <td>
                              {data.users.length != 0 ? data.users[0].name : ""}
                            </td>
                            <td>
                              <AppSwitch
                                className={"mx-1"}
                                variant={"pill"}
                                color={"success"}
                                label
                                disabled={role == "User" ? true : false}
                                key={index}
                                checked={data.enable}
                                onChange={() => {
                                  axios
                                    .get(
                                      Constants.BASE_URL +
                                        `api/locations/activation/${data._id}`,
                                      {
                                        headers: {
                                          //"content-type": "application/json",
                                          Authorization:
                                            "Bearer " + Auth.getToken("token")
                                        }
                                      }
                                    )
                                    .then(res => {
                                      toastr.success(
                                        "Success",
                                        data.locationName + " Status Updated!"
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
                          </tr>
                        );
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
  return { locations: state.location };
}
export default connect(mapStateToProps, { getLocations })(allLocations);
