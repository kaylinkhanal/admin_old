import React, { Component } from "react";
import axios from "axios";
import { Constants } from "../../../constants/environment";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toastr } from "react-redux-toastr";
import { state } from "../../../constants/environment";
import Auth from "../../../cookie/Auth";
import {
  //Badge,
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
import { AppSwitch } from "@coreui/react";
import { getManagers, getCityTax } from "../../../redux/actions/getStoreAction";
import { connect } from "react-redux";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      managers: [],
      manager: false,
      phoneNumber_validation: "",
      postalCode_validation: "",
      name: false,
      taxs: [],
      tax: false,
      phoneNumber: false,
      streetAddress: false,
      city: false,
      state: false,
      postalCode: false,
      aboutStore: false,
      location: {
        name: null,
        manager: null,
        tax: null,
        phoneNumber: "11415164164",
        streetAddress: null,
        city: null,
        state: null,
        postalCode: null,
        aboutStore: null,
        enable: true
      }
    };
  }

  componentDidMount() {
    const locationId = this.props.match.params.id;
    var user_id = Auth.getToken("userId");
    axios
      .get(Constants.BASE_URL + `api/locations/${locationId}`, {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(res => {
        var name = res.data[0].locationName;
        var manager =
          res.data[0].users.length != 0 ? res.data[0].users[0]._id : null;
        var tax = res.data[0].tax.length != 0 ? res.data[0].tax[0]._id : null;
        var phoneNumber = res.data[0].contactNumber;
        var streetAddress = res.data[0].address;
        var city = res.data[0].city;
        var state = res.data[0].state;
        var postalCode = res.data[0].postalCode;
        var aboutStore = res.data[0].aboutUs;
        var enable = res.data[0].enable;
        //var tax = res.data[0].tax;
        this.setState({
          location: {
            name: name,
            manager: manager,
            phoneNumber: phoneNumber,
            streetAddress: streetAddress,
            city: city,
            state: state,
            postalCode: postalCode,
            aboutStore: aboutStore,
            enable: enable,
            tax: tax
          }
        });

        this.props.getManagers();
        this.props.getCityTax();
        // axios.get(Constants.BASE_URL + `api/users/managers/all/${user_id}`).then(res => {
        //     this.setState({
        //       managers: res.data
        //     });
        //   });
      });
  }

  componentWillReceiveProps(data) {
    console.log("my RES props", this.props);
    console.log("my RES componentWillRec Data", data.manager.tax);
    var data = data.manager.manager;

    this.setState({
      managers: data
    });

    // var data = data.manager.manager;
    // console.log("manager fffsfff", data);
    // this.setState({
    //   taxs: data
    // });
    console.log("tax ffffff", this.state);
    console.log("manager ffffff", this.state.taxs);
    //console.log("tax data", taxdata);
  }

  onChangeValue = e => {
    const { location } = this.state;
    location[e.target.name] = e.target.value;
    this.state[e.target.name] = true;
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
    }

    this.setState({
      location
    });

    if (
      this.state.location.name === "" ||
      this.state.location.streetAddress === "" ||
      this.state.location.city === "" ||
      this.state.location.state === "" ||
      this.state.location.aboutStore === ""
    ) {
      this.setState({ status: true });
    } else {
      this.setState({ status: false });
    }
  };

  handleSubmit = async () => {
    let location = this.state.location;
    var id = this.props.match.params.id;
    await axios
      .post(
        Constants.BASE_URL + "api/locations/" + id,
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
          toastr.success("success", "Updated successfully!");
          this.setState({
            location: {
              name: "",
              manager: "",
              tax: "",
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
    //console.log("'" + String(this.state.location.phoneNumber) + "'");
    if (String(this.state.location.phoneNumber) === "14535353459") {
      //console.log("dfdfdfdfdfdf");
    }
    var phone = String(this.state.location.phoneNumber);

    var managers = [];
    if (this.state.managers.length != 0) {
      managers = this.state.managers;
    }

    var taxs = [];
    //if (this.state.taxs.length != 0) {
    taxs = this.state.taxs;
    //}
    console.log("sadadaadda PROPS", this.props);
    console.log("My Managers", managers);
    console.log("My Taxs", taxs);
    return (
      <Card>
        <CardHeader>
          <Row>
            <Col>
              <h5>
                <i className="icon-location-pin" /> Edit Location:{" "}
                <strong>{this.state.location.name}</strong>
              </h5>
            </Col>
            <AppSwitch
              className={"mx-1"}
              variant={"pill"}
              color={"success"}
              label
              checked={this.state.location.enable}
              onChange={() => {
                const { location } = this.state;
                location["enable"] = !this.state.location.enable;
                this.setState({
                  location
                });
              }}
            />
          </Row>
        </CardHeader>

        <CardBody>
          <FormGroup row className="my-0">
            <Col xs="6">
              <Form className={this.state.name ? "was-validated" : ""}>
                <FormGroup>
                  <Label htmlFor="location">
                    <strong>Location Name</strong>
                  </Label>
                  <Input
                    type="text"
                    id="location"
                    placeholder="Location Name"
                    onChange={this.onChangeValue}
                    value={this.state.location.name}
                    name={"name"}
                    required
                  />
                  <FormFeedback className="help-block">
                    Please enter location name
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="3">
              <Form className={this.state.tax ? "" : ""}>
                <FormGroup>
                  <Label htmlFor="taxs">
                    <strong>City Tax</strong>
                  </Label>
                  <Input
                    type="select"
                    name="tax"
                    id="employeeRole1"
                    onChange={this.onChangeValue}
                    value={this.state.location.tax}
                    required
                    style={{
                      border:
                        this.state.location.tax === ""
                          ? "1px solid #f86c6b"
                          : ""
                    }}
                  >
                    <option value="">Select City Tax</option>
                    {taxs &&
                      taxs.map((tax, index) => {
                        console.log("gfdfdgdf", taxs);
                        return (
                          <option value={tax._id} key={index}>
                            {taxs.taxName}
                          </option>
                        );
                      })}
                  </Input>

                  <FormFeedback className="help-block">
                    Please Enter Location Manager
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
          </FormGroup>

          <FormGroup row className="my-0">
            <Col xs="6">
              <Form className={this.state.manager ? "" : ""}>
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
                    required
                    style={{
                      border:
                        this.state.location.manager === ""
                          ? "1px solid #f86c6b"
                          : ""
                    }}
                  >
                    <option value="">select manager</option>
                    {managers &&
                      managers.map((manager, index) => {
                        return (
                          <option value={manager._id} key={index}>
                            {manager.name}
                          </option>
                        );
                      })}
                  </Input>

                  <FormFeedback className="help-block">
                    Please enter location Manager
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="6">
              <Form className={this.state.phoneNumber ? "was-validated" : ""}>
                <FormGroup>
                  <Label>
                    <strong>Location Phone Number</strong>
                  </Label>
                  <ReactPhoneInput
                    defaultCountry={"us"}
                    onlyCountries={["us"]}
                    name={"phoneNumber"}
                    copyNumbersOnly={true}
                    onChange={value => {
                      if (value.length !== 17) {
                        this.setState({
                          phoneNumber_validation: "not_validation"
                        });
                      } else {
                        this.setState({
                          phoneNumber_validation: ""
                        });
                      }
                      const { location } = this.state;
                      location.phoneNumber = value.replace(/[^0-9]+/g, "");
                      this.setState({ location });
                    }}
                    value={phone}
                    type="text"
                    id="storeOwnerPhone"
                    placeholder="(818) 999 – 9999 "
                    // style={{
                    //   border:
                    //     this.state.phoneNumber !== "" ? "1px solid red" : ""
                    // }}
                    required={this.state.req}
                  />
                  {this.state.phoneNumber_validation !== "" &&
                  this.state.location.phoneNumber !== "" ? (
                    <Label htmlFor="storeEmail">
                      <strong style={{ color: "#f86c6b" }}>
                        Phone number should have 10 digits and only number
                      </strong>
                    </Label>
                  ) : (
                    ""
                  )}
                  <FormFeedback className="help-block">
                    Please Enter phone number
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
          </FormGroup>
          <Form className={this.state.streetAddress ? "was-validated" : ""}>
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
                required
              />
              <FormFeedback className="help-block">
                Please Enter streetAddress
              </FormFeedback>
            </FormGroup>
          </Form>

          <FormGroup row className="my-0">
            <Col xs="6">
              <Form className={this.state.city ? "was-validated" : ""}>
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
                    required
                  />
                  <FormFeedback className="help-block">
                    Please enter city
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="2">
              <Form className={this.state.state ? "" : ""}>
                <FormGroup>
                  <Label>
                    <strong>State</strong>
                  </Label>
                  <Input
                    type="select"
                    id="state"
                    placeholder="State"
                    name="state"
                    value={
                      this.state.location.state ? this.state.location.state : ""
                    }
                    onChange={this.onChangeValue}
                    style={{
                      border:
                        this.state.location.state == "" ? "1px solid red" : ""
                    }}
                    requried
                  >
                    {Object.entries(state).map((data, index) => {
                      return (
                        <option key={index} value={data[0]}>
                          {data[1]}
                        </option>
                      );
                    })}
                  </Input>
                  <Label>
                    <strong style={{ color: "#4dbd74" }}>
                      {this.state.location.state}
                    </strong>
                  </Label>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="4">
              <Form
                className={
                  (this.state.postalCode &&
                    this.state.postalCode_validation == "") ||
                  this.state.location.postalCode == ""
                    ? "was-validated"
                    : ""
                }
              >
                <FormGroup>
                  <Label htmlFor="postal-code">
                    <strong>Postal Code</strong>
                  </Label>
                  <Input
                    type="text"
                    id="postal-code"
                    placeholder="Postal Code"
                    name="postalCode"
                    value={
                      this.state.location.postalCode
                        ? this.state.location.postalCode
                        : ""
                    }
                    onChange={this.onChangeValue}
                    style={{
                      border:
                        this.state.postalCode_validation !== ""
                          ? "1px solid red"
                          : ""
                    }}
                    required
                  />
                  {this.state.postalCode_validation !== "" &&
                  this.state.location.postalCode !== "" ? (
                    <Label htmlFor="storeEmail">
                      <strong style={{ color: "#f86c6b" }}>
                        Postal code should be 5 digits and only number
                      </strong>
                    </Label>
                  ) : (
                    ""
                  )}
                  <FormFeedback className="help-block">
                    Please enter postal code
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
          </FormGroup>
          <Form className={this.state.aboutStore ? "was-validated" : ""}>
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
                required
              />
              <FormFeedback className="help-block">
                Please enter about store
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
                  this.state.phoneNumber_validation !== "" ||
                  this.state.status
                    ? true
                    : false
                }
              >
                <i className="fa fa-dot-circle-o" /> Update Location
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
  return { manager: state.manager, tax: state.tax };
}

export default connect(mapStateToProps, { getManagers, getCityTax })(Location);
