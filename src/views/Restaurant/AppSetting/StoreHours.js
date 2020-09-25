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
  Row,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
import Auth from "../../../cookie/Auth";
import axios from "axios";
import { Constants } from "../../../constants/environment";
import { toastr } from "react-redux-toastr";

class storeHours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeHours: [
        { day: "Monday", openTime: "closed", closeTime: "closed" },
        { day: "Tuesday", openTime: "closed", closeTime: "closed" },
        { day: "Wednesday", openTime: "closed", closeTime: "closed" },
        { day: "Thursday", openTime: "closed", closeTime: "closed" },
        { day: "Friday", openTime: "closed", closeTime: "closed" },
        { day: "Saturday", openTime: "closed", closeTime: "closed" },
        { day: "Sunday", openTime: "closed", closeTime: "closed" }
      ]
    };
    this.deletestoreHours = this.deletestoreHours.bind(this);
    this.applyToAll = this.applyToAll.bind(this);
  }

  async componentDidMount() {
    var id = Auth.getToken("userId");
    await axios
      .get(Constants.BASE_URL + `api/settings/${id}`, {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(res => {
        if (res.data.storeHours && res.data.storeHours.length != 0) {
          this.setState({
            storeHours: res.data.storeHours
          });
        }
      });
  }
  addstoreHours = () => {
    let { storeHours } = this.state;
    storeHours = [
      ...this.state.storeHours,
      { day: "", openTime: "close", closeTime: "close" }
    ];
    this.setState({
      storeHours
    });
  };

  deletestoreHours = e => {
    var id = e.target.value;
    let { storeHours } = this.state;
    storeHours = storeHours.filter(function(value, index) {
      return index != id;
    });
    this.setState({
      storeHours
    });
  };

  handleChange = (e, index) => {
    const { storeHours } = this.state;
    if (!this.checkDay(e.target.value)) {
      storeHours[index][e.target.name] = "closed";
    } else {
      storeHours[index][e.target.name] = e.target.value;
    }
    this.setState({
      storeHours
    });
  };

  checkDay(value) {
    const { storeHours } = this.state;
    for (var i = 0; i < storeHours.length; i++) {
      if (storeHours[i].day == value) {
        toastr.error(value + " has already created!");
        return false;
      }
    }
    return true;
  }

  applyToAll(index) {
    let { storeHours } = this.state;
    storeHours.map((value, i) => {
      value.openTime = storeHours[index].openTime;
      value.closeTime = storeHours[index].closeTime;
    });
    this.setState({
      storeHours
    });
    toastr.success("success", "Applied successfully!");
  }
  checkvariant(array) {
    for (var i = 0; i < array.length; i++) {
      var opentime = array[i].openTime.slice(-2);
      var closetime = array[i].closeTime.slice(-2);
      var opennumber = array[i].openTime.substring(
        0,
        array[i].openTime.length - 2
      );
      var closenumber = array[i].closeTime.substring(
        0,
        array[i].closeTime.length - 2
      );
      if (opentime == closetime) {
        if (parseInt(opennumber) > parseInt(closenumber)) {
          return false;
        }
        return true;
      }
    }
    return true;
  }

  checkblank(array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].day == "") {
        return false;
      }
    }
    return true;
  }

  handleSubmit = () => {
    if (this.state.storeHours.length == 0) {
      toastr.error("please enter store hours!");
      return;
    }
    if (!this.checkblank(this.state.storeHours)) {
      toastr.error("please fill in the day filed!");
      return;
    }
    if (!this.checkvariant(this.state.storeHours)) {
      toastr.error("open time must be smaller that close time!");
      return;
    }
    var id = Auth.getToken("userId");
    axios
      .post(Constants.BASE_URL + `api/settings/${id}`, this.state, {
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(res => {
        toastr.success("success", "Added successfully!");
      })
      .catch(err => {
        toastr.error("Please try again!");
      });
  };

  render() {
    console.log(this.state);
    return (
      <Card>
        <CardHeader>
          <h5>
            <i className="icon-clock" />
            &nbsp;&nbsp; Store Hours
          </h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="8" md="8">
              <CardBody>
                <Row>
                  <Col xs="3">
                    <Label>
                      <strong>Day</strong>
                    </Label>
                  </Col>
                  <Col xs="3">
                    <Label>
                      <strong>Open Time</strong>
                    </Label>
                  </Col>
                  <Col xs="3">
                    <Label htmlFor="dishTotalPrice">
                      <strong>Close Time</strong>
                    </Label>
                  </Col>
                </Row>
                {this.state.storeHours &&
                  this.state.storeHours.map((storehour, index) => {
                    return (
                      <FormGroup row key={index}>
                        <Col xs="3">
                          <Input
                            type="select"
                            name="day"
                            id="openDay"
                            onChange={e => this.handleChange(e, index)}
                            value={storehour.day}
                          >
                            <option vlaue=""></option>
                            <option vlaue="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                          </Input>
                        </Col>
                        <Col xs="3">
                          <Input
                            type="select"
                            name="openTime"
                            id="openDay"
                            onChange={e => this.handleChange(e, index)}
                            value={storehour.openTime}
                          >
                            <option value="closed">CLOSED</option>
                            <option value="1AM">1 AM</option>
                            <option value="2AM">2 AM</option>
                            <option value="3AM">3 AM</option>
                            <option value="4AM">4 AM</option>
                            <option value="5AM">5 AM</option>
                            <option value="6AM">6 AM</option>
                            <option value="7AM">7 AM</option>
                            <option value="8AM">8 AM</option>
                            <option value="9AM">9 AM</option>
                            <option value="10AM">10 AM</option>
                            <option value="11AM">11 AM</option>
                            <option value="12AM">12 AM</option>
                            <option value="1PM">1 PM</option>
                            <option value="2PM">2 PM</option>
                            <option value="3PM">3 PM</option>
                            <option value="4PM">4 PM</option>
                            <option value="5PM">5 PM</option>
                            <option value="6PM">6 PM</option>
                            <option value="7PM">7 PM</option>
                            <option value="8PM">8 PM</option>
                            <option value="9PM">9 PM</option>
                            <option value="10PM">10 PM</option>
                            <option value="11PM">11 PM</option>
                            <option value="12PM">12 PM</option>
                          </Input>
                        </Col>
                        <Col xs="3">
                          <Input
                            type="select"
                            name="closeTime"
                            id="openDay"
                            onChange={e => this.handleChange(e, index)}
                            value={storehour.closeTime}
                          >
                            <option value="closed">CLOSED</option>
                            <option value="1AM">1 AM</option>
                            <option value="2AM">2 AM</option>
                            <option value="3AM">3 AM</option>
                            <option value="4AM">4 AM</option>
                            <option value="5AM">5 AM</option>
                            <option value="6AM">6 AM</option>
                            <option value="7AM">7 AM</option>
                            <option value="8AM">8 AM</option>
                            <option value="9AM">9 AM</option>
                            <option value="10AM">10 AM</option>
                            <option value="11AM">11 AM</option>
                            <option value="12AM">12 AM</option>
                            <option value="1PM">1 PM</option>
                            <option value="2PM">2 PM</option>
                            <option value="3PM">3 PM</option>
                            <option value="4PM">4 PM</option>
                            <option value="5PM">5 PM</option>
                            <option value="6PM">6 PM</option>
                            <option value="7PM">7 PM</option>
                            <option value="8PM">8 PM</option>
                            <option value="9PM">9 PM</option>
                            <option value="10PM">10 PM</option>
                            <option value="11PM">11 PM</option>
                            <option value="12PM">12 PM</option>
                          </Input>
                        </Col>
                        {/* <Col xs="2">
                    <Button
                      type="button"
                      size="md"
                      color="danger"
                      onClick={this.deletestoreHours}
                      value={index}
                    >
                      <i className="fa fa-trash" /> Delete
                    </Button>
                  </Col> */}
                        <Col xs="3">
                          <Label>
                            <strong
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() => {
                                this.applyToAll(index);
                              }}
                            >
                              APPLY TO ALL
                            </strong>
                          </Label>
                        </Col>
                      </FormGroup>
                    );
                  })}

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
              </CardBody>
            </Col>
            {/* <Col xs="4">
              <FormGroup>
                <Button
                  type="button"
                  size="md"
                  color="success"
                  onClick={this.addstoreHours}
                >
                  <i className="fa fa-plus-square-o" />
                  &nbsp;&nbsp;Add New store hour
                </Button>
              </FormGroup>
            </Col> */}
          </Row>
        </CardBody>
        <CardFooter>
          <Row />
        </CardFooter>
      </Card>
    );
  }
}

export default storeHours;
