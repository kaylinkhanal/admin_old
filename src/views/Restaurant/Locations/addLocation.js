import React, { Component } from "react";
import axios from "axios";
import { Constants } from "../../../constants/environment";
import { toastr } from "react-redux-toastr";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { state } from "../../../constants/environment";
import Auth from "../../../cookie/Auth";
import { getManagers } from "../../../redux/actions/getStoreAction";
import { createNewlocation } from "../../../redux/actions/locationAction";
import { connect } from "react-redux";
import {
  Badge,
  Button,
  //ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  // Collapse,
  // DropdownItem,
  // DropdownMenu,
  // DropdownToggle,
  // Fade,
  Form,
  FormGroup,
  // FormText,
  FormFeedback,
  Input,
  // InputGroup,
  // InputGroupAddon,
  // InputGroupText,
  Label,
  Row
} from "reactstrap";

class addLocations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      req: false,
      state: false,
      managers: [],
      phone_validation: "",
      postalCode_validation: "",
      location: {
        owner_id: null,
        name: null,
        manager: [],
        phoneNumber: "1",
        streetAddress: null,
        city: null,
        state: null,
        postalCode: null,
        aboutStore: null
      }
    };
  }

  componentDidMount() {
    this.props.getManagers();
    // var id = Auth.getToken('userId');
    // axios.get(Constants.BASE_URL + `api/users/managers/all/${id}`).then(res => {
    //   this.setState({
    //     managers: res.data
    //   });
    //   console.log('67',res.data)
    // });
    const { location } = this.state;
    location["owner_id"] = Auth.getToken("userId");
  }

  componentWillReceiveProps(data) {
    var data = data.manager.manager;
    if (data) {
      this.setState({
        managers: data
      });
    }
  }

  onChangeValue = e => {
    const { location } = this.state;

    location[e.target.name] = e.target.value;

    if (e.target.name === "postalCode") {
      this.setState({
        postalCode_validation: e.target.value.match(/^([0-9])/)
          ? ""
          : "not validation"
      });
      if (e.target.value.length !== 5)
        this.setState({
          postalCode_validation: "not validation"
        });
    }

    if (e.target.name === "phoneNumber") {
      this.setState({
        phoneNumber_validation: e.target.value.match(/^([0-9])/)
          ? ""
          : "not validation"
      });
      if (e.target.value.length !== 10)
        console.log("phone validation length", e.target.value.length);
      this.setState({
        phone_validation: "not validation"
      });
    }

    this.setState({
      location
    });

    this.setState({
      req: true
    });

    if (
      !this.state.location.name ||
      !this.state.location.streetAddress ||
      !this.state.location.city ||
      !this.state.location.state ||
      !this.state.location.aboutStore ||
      !this.state.location.state
    ) {
      this.state.state = false;
    } else {
      this.state.state = true;
    }
  };

  handleSubmit = async () => {
    let location = this.state.location;
    //this.props.createNewlocation({ location: location });

    await axios
      .post(
        Constants.BASE_URL + "api/locations/",
        {
          location: location
        },
        {
          headers: {
            //"content-type": "application/json",
            Authorization: "Bearer " + Auth.getToken("token")
          }
        }
      )
      .then(res => {
        if (!res.data.errors) {
          toastr.success("success", "Added successfully!");
          this.setState({
            location: {
              name: "",
              manager: "",
              phoneNumber: "",
              postalCode: "",
              streetAddress: "",
              city: "",
              state: "",
              aboutStore: ""
            }
          });

          this.props.history.goBack();
        } else {
          toastr.warning("Warning", res.data.errors.email.message);
        }
      })
      .catch(err => {
        toastr.error("Please try again!");
      });
  };

  render() {
    var managers = [];
    if (this.state.managers.length != 0) {
      managers = this.state.managers;
    }
    return (
      <Card>
        <CardHeader>
          <h5>
            <i className="icon-location-pin" /> Add a Location
          </h5>
        </CardHeader>
        <CardBody>
          <Form
            className={this.state.location.name !== null ? "was-validated" : ""}
          >
            <FormGroup>
              <Label htmlFor="location">
                <strong>Location</strong>
              </Label>
              <Input
                type="text"
                id="location"
                placeholder="Location Name"
                onChange={this.onChangeValue}
                value={this.state.location.name}
                name={"name"}
                required={this.state.req}
              />
              <FormFeedback className="help-block">
                Please enter locaiton name
              </FormFeedback>
            </FormGroup>
          </Form>

          <FormGroup row className="my-0">
            <Col xs="6">
              <Form className={this.state.location.manager !== null ? "" : ""}>
                <FormGroup>
                  <Label htmlFor="manager">
                    <strong>Location Manager</strong>
                  </Label>
                  <Input
                    type="select"
                    name="manager"
                    id="employeeRole"
                    onChange={this.onChangeValue}
                    value={this.state.location.manager}
                    // style={{
                    //   border:
                    //     this.state.location.manager === "" ? "1px solid #f86c6b" : "",
                    // }}
                    required={this.state.req}
                  >
                    <option value={""}>select manager</option>
                    {managers &&
                      managers.map((manager, index) => {
                        return (
                          <option value={manager._id} key={index}>
                            {manager.name}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="6">
              <Form>
                <FormGroup>
                  <Label>
                    <strong>Location Phone Number</strong>
                  </Label>
                  <ReactPhoneInput
                    defaultCountry={"us"}
                    onlyCountries={["us"]}
                    type="text"
                    id="phone-number"
                    placeholder="Phone"
                    name={"phoneNumber"}
                    onChange={value => {
                      if (value.length !== 17) {
                        this.setState({
                          phone_validation: "not_validation"
                        });
                      } else {
                        this.setState({
                          phone_validation: ""
                        });
                      }
                      const { location } = this.state;
                      location.phoneNumber = value.replace(/[^0-9]+/g, "");
                      this.setState({ location });
                    }}
                    value={this.state.location.phoneNumber}
                    // style={{
                    //   border:
                    //     this.state.phone_validation !== ""
                    //       ? "1px solid red"
                    //       : ""
                    // }}
                  />
                  {this.state.phone_validation !== "" &&
                  this.state.location.phoneNumber !== "" ? (
                    <Label htmlFor="storeEmail">
                      <strong style={{ color: "#f86c6b" }}>
                        Phone number should have 10 digits and only number
                      </strong>
                    </Label>
                  ) : (
                    ""
                  )}
                </FormGroup>
              </Form>
            </Col>
          </FormGroup>
          <Form
            className={
              this.state.location.streetAddress !== null ? "was-validated" : ""
            }
          >
            <FormGroup>
              <Label>
                <strong>Street Address</strong>
              </Label>
              <Input
                type="text"
                id="street"
                placeholder="Street Name"
                name={"streetAddress"}
                onChange={this.onChangeValue}
                value={this.state.location.streetAddress}
                required={this.state.req}
              />
              <FormFeedback className="help-block">
                Please enter street Address
              </FormFeedback>
            </FormGroup>
          </Form>

          <FormGroup row className="my-0">
            <Col xs="6">
              <Form
                className={
                  this.state.location.city !== null ? "was-validated" : ""
                }
              >
                <FormGroup>
                  <Label>
                    <strong>City</strong>
                  </Label>
                  <Input
                    type="text"
                    id="city"
                    placeholder="Enter Your City"
                    name={"city"}
                    onChange={this.onChangeValue}
                    value={this.state.location.city}
                    required={this.state.req}
                  />
                  <FormFeedback className="help-block">
                    Please enter city
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="2">
              <Form className={this.state.location.state !== null ? "" : ""}>
                <FormGroup>
                  <Label>
                    <strong>State</strong>
                  </Label>
                  <Input
                    type="select"
                    id="state"
                    placeholder="State"
                    name={"state"}
                    onChange={this.onChangeValue}
                    value={this.state.location.state}
                    required={this.state.req}
                  >
                    <option value="">Select state</option>
                    {Object.entries(state).map((data, index) => {
                      return (
                        <option key={index} value={data[0]}>
                          {data[1]}
                        </option>
                      );
                    })}
                  </Input>
                  <strong style={{ color: "#4dbd74" }}>
                    {this.state.location.state}
                  </strong>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="4">
              <Form
                className={
                  (this.state.location.postalCode !== null &&
                    this.state.postalCode_validation === "") ||
                  this.state.location.postalCode === ""
                    ? "was-validated"
                    : ""
                }
              >
                <FormGroup>
                  <Label>
                    <strong>Postal Code</strong>
                  </Label>
                  <Input
                    type="text"
                    id="postal-code"
                    placeholder="Postal Code"
                    name={"postalCode"}
                    onChange={this.onChangeValue}
                    value={this.state.location.postalCode}
                    style={{
                      border:
                        this.state.postalCode_validation !== ""
                          ? "1px solid red"
                          : ""
                    }}
                    required={this.state.req}
                  />
                  {this.state.postalCode_validation !== "" &&
                  this.state.location.postalCode !== "" ? (
                    <Label htmlFor="storeEmail">
                      <strong style={{ color: "#f86c6b" }}>
                        Postal code should have 5 digits and only number
                      </strong>
                    </Label>
                  ) : (
                    ""
                  )}
                  <FormFeedback className="help-block">
                    Please provide a valid information
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
          </FormGroup>
          <Form
            className={
              this.state.location.aboutStore !== null ? "was-validated" : ""
            }
          >
            <FormGroup>
              <Label>
                <strong>About Store</strong>
              </Label>
              <Input
                type="textarea"
                name="aboutStore"
                id="textarea-input"
                rows="4"
                placeholder="About us..."
                onChange={this.onChangeValue}
                value={this.state.location.aboutStore}
                required={this.state.req}
              />
              <FormFeedback className="help-block">
                Please enter aboutStore comment
              </FormFeedback>
            </FormGroup>
          </Form>
        </CardBody>
        <CardFooter>
          <Row>
            <Col xs="10">
              <Button
                type="submit"
                size="lg"
                color="primary"
                onClick={this.handleSubmit}
                disabled={
                  this.state.postalCode_validation !== "" ||
                  this.state.phone_validation !== "" ||
                  this.state.state == false
                    ? true
                    : false
                }
              >
                <i className="fa fa-dot-circle-o" /> Add Location
              </Button>
            </Col>
            <Col xs="2">
              <Button
                type="cancel"
                size="lg"
                color="danger"
                onClick={() => {
                  this.props.history.goBack();
                }}
              >
                <i className="fa fa-ban" /> Cancel
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

function mapStateToProps(state, props) {
  return { manager: state.manager, newlocation: state.newlocation };
}
export default connect(mapStateToProps, { getManagers, createNewlocation })(
  addLocations
);
