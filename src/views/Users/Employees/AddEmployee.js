import React, { Component } from "react";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { state } from "../../../constants/environment";
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
  Breadcrumb,
  BreadcrumbItem,
  Row
} from "reactstrap";
import { Constants } from "../../../constants/environment";
import Auth from "../../../cookie/Auth";

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      req: false,
      contactNumber_validation: "",
      state: false,
      postalCode_validation: "",
      email_validation: "",
      password_validation: "",
      staff: {
        name: null,
        role: null,
        password: null,
        email: null,
        contactNumber: "1",
        street: null,
        country: null,
        state: null,
        postalCode: null,
        restaurantID: Auth.getToken("userId")
      }
    };
  }

  onChangeValue = e => {
    const { staff } = this.state;
    staff[e.target.name] = e.target.value;
    if (e.target.name === "email") {
      this.setState({
        email_validation: e.target.value.match(
          /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
        )
          ? ""
          : "not validation"
      });
    }
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

    if (e.target.name === "contactNumber") {
      this.setState({
        contactNumber_validation: e.target.value.match(/^([0-9])/)
          ? ""
          : "not validation"
      });
    }
    if (e.target.name === "password") {
      if (e.target.value.length < 6)
        this.setState({
          password_validation: "not validation"
        });
      else
        this.setState({
          password_validation: ""
        });
    }
    this.setState({
      staff
    });

    this.setState({
      req: true
    });

    if (
      !this.state.staff.name ||
      !this.state.staff.password ||
      !this.state.staff.street ||
      !this.state.staff.country ||
      !this.state.staff.state ||
      !this.state.staff.role ||
      !this.state.staff.postalCode ||
      !this.state.staff.contactNumber
    ) {
      this.setState({ state: false });
    } else {
      this.setState({ state: true });
    }
  };

  handleSubmit = async () => {
    let staff = this.state.staff;

    await axios
      .post(
        Constants.BASE_URL + "api/users/staff/add",
        {
          staff: staff
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
            staff: {
              name: null,
              role: null,
              password: null,
              email: null,
              contactNumber: "",
              street: null,
              country: null,
              status: null,
              postalCode: null
            }
          });
          this.props.history.goBack();
        } else {
          if (res.data.errors.email)
            toastr.warning("Warning", res.data.errors.email.message);
          else {
            toastr.warning("Warning", "Please try number field again!");
          }
        }
      })
      .catch(err => {
        toastr.error("Please try again!");
      });
  };

  render() {
    console.log(this.state.staff);
    return (
      <Card>
        <CardHeader>
          <h5>
            <i className="icon-people" /> Add Employee
          </h5>
        </CardHeader>
        <CardBody>
          <FormGroup row className="my-0">
            <Col xs="4">
              <Form
                className={this.state.staff.name != null ? "was-validated" : ""}
              >
                <FormGroup>
                  <Label htmlFor="employeeName">
                    <strong>Employee</strong>
                  </Label>
                  <Input
                    type="text"
                    id="employeeName"
                    name={"name"}
                    placeholder="Employee Name"
                    value={this.state.staff.name}
                    onChange={this.onChangeValue}
                    required={this.state.req}
                  />
                  <FormFeedback className="help-block">
                    Please enter employee name
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="4">
              <Form className="">
                <FormGroup>
                  <Label htmlFor="employeeRole">
                    <strong>Employee Role</strong>
                  </Label>
                  <Input
                    type="select"
                    name="role"
                    id="employeeRole"
                    value={this.state.staff.role}
                    onChange={this.onChangeValue}
                    required={this.state.req}
                  >
                    <option value="">select role</option>
                    <option value="Staff">Staff</option>
                    <option value="Driver">Driver</option>
                    <option value="Manager">Manager</option>
                  </Input>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="4">
              <Form
                className={
                  (this.state.staff.password !== null &&
                    this.state.password_validation === "") ||
                  this.state.staff.password === ""
                    ? "was-validated"
                    : ""
                }
              >
                <FormGroup>
                  <Label htmlFor="employeePassword">
                    <strong>Password</strong>
                  </Label>
                  <Input
                    type="password"
                    id="employeePassword"
                    placeholder="Password"
                    name={"password"}
                    value={this.state.staff.password}
                    onChange={this.onChangeValue}
                    required={this.state.req}
                    style={{
                      border:
                        this.state.password_validation !== ""
                          ? "1px solid red"
                          : ""
                    }}
                  />
                  {this.state.password_validation !== "" &&
                  this.state.staff.password !== "" ? (
                    <Label htmlFor="storeEmail">
                      <string style={{ color: "#f86c6b" }}>
                        Password should have minimum 6 charachers
                      </string>
                    </Label>
                  ) : (
                    ""
                  )}
                  <FormFeedback className="help-block">
                    Please enter password
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
          </FormGroup>
          <Breadcrumb>
            <BreadcrumbItem>
              <h5>Employee Information</h5>
            </BreadcrumbItem>
          </Breadcrumb>
          <FormGroup row className="my-0">
            <Col xs="6">
              <Form
                className={
                  this.state.staff.email !== null &&
                  this.state.email_validation == ""
                    ? "was-validated"
                    : ""
                }
              >
                <FormGroup>
                  <Label htmlFor="storeEmail">
                    <strong
                      style={{
                        color:
                          this.state.email_validation !== "" ? "red" : "black"
                      }}
                    >
                      Employee Email Address
                    </strong>
                  </Label>

                  <Input
                    type="text"
                    id="employeeEmail"
                    placeholder="Employee Email"
                    name={"email"}
                    value={this.state.staff.email}
                    onChange={this.onChangeValue}
                    style={{
                      border:
                        this.state.email_validation !== ""
                          ? "1px solid red"
                          : ""
                    }}
                    required={this.state.req}
                  />
                  <FormFeedback className="help-block">
                    Please provide email
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="6">
              <Form
                className={
                  (this.state.staff.phone !== undefined &&
                    this.state.phone_validation === "") ||
                  this.state.staff.phone === ""
                    ? "was-validated"
                    : ""
                }
              >
                <FormGroup>
                  <Label htmlFor="phone-number">
                    <strong>Employee Phone Number</strong>
                  </Label>
                  <ReactPhoneInput
                    defaultCountry={"us"}
                    onlyCountries={["us"]}
                    name={"contactNumber"}
                    onChange={value => {
                      if (value.length !== 17) {
                        this.setState({
                          contactNumber_validation: "not_validation"
                        });
                      } else {
                        this.setState({
                          contactNumber_validation: ""
                        });
                      }
                      const { staff } = this.state;
                      staff.contactNumber = value.replace(/[^0-9]+/g, "");
                      this.setState({ staff });
                    }}
                    value={this.state.staff.contactNumber}
                    type="text"
                    id="storeOwnerPhone"
                    placeholder="(818) 999 – 9999 "
                    disableDropdown={true}
                    // style={{
                    //   border:
                    //     this.state.contactNumber_validation !== "" ? "1px solid red" : "",

                    // }}
                    required={this.state.req}
                  />
                  {this.state.contactNumber_validation !== "" &&
                  this.state.staff.contactNumber !== "" ? (
                    <Label htmlFor="storeEmail">
                      <string style={{ color: "#f86c6b" }}>
                        Phone number should have maximum 10 digits and only
                        number
                      </string>
                    </Label>
                  ) : (
                    ""
                  )}
                  <FormFeedback className="help-block">
                    Please enter phone number
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
          </FormGroup>
          <Form className={this.state.staff.street ? "was-validated" : ""}>
            <FormGroup>
              <Label htmlFor="street">
                <strong>Street Address</strong>
              </Label>
              <Input
                type="text"
                id="street"
                placeholder="Street Name"
                name={"street"}
                value={this.state.staff.street}
                onChange={this.onChangeValue}
                required={this.state.req}
              />
              <FormFeedback className="help-block">
                Please enter street Address
              </FormFeedback>
            </FormGroup>
          </Form>

          <FormGroup row className="my-0">
            <Col xs="4">
              <Form className={this.state.staff.country ? "was-validated" : ""}>
                <FormGroup>
                  <Label htmlFor="city">
                    <strong>City</strong>
                  </Label>
                  <Input
                    type="text"
                    id="city"
                    placeholder="Enter Your City"
                    name={"country"}
                    value={this.state.staff.country}
                    onChange={this.onChangeValue}
                    required={this.state.req}
                  />
                  <FormFeedback className="help-block">
                    Please enter city
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="4">
              <Form className="">
                <FormGroup>
                  <Label htmlFor="state">
                    <strong>State</strong>
                  </Label>
                  <Input
                    type="text"
                    id="state"
                    placeholder="State"
                    name={"state"}
                    value={this.state.staff.state}
                    onChange={this.onChangeValue}
                    required={this.state.req}
                    type="select"
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
                  <FormFeedback className="help-block">
                    Please select state
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="4">
              <Form
                className={
                  (this.state.staff.postalCode !== null &&
                    this.state.postalCode_validation === "") ||
                  this.state.staff.postalCode === ""
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
                    name={"postalCode"}
                    onChange={this.onChangeValue}
                    value={this.state.staff.postalCode}
                    style={{
                      border:
                        this.state.postalCode_validation !== ""
                          ? "1px solid red"
                          : ""
                    }}
                    required={this.state.req}
                  />
                  {this.state.postalCode_validation !== "" &&
                  this.state.staff.postalCode !== "" ? (
                    <Label htmlFor="storeEmail">
                      <string style={{ color: "#f86c6b" }}>
                        Postal code should be 5 digits and only number
                      </string>
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
                  this.state.email_validation !== "" ||
                  this.state.postalCode_validation !== "" ||
                  !this.state.contactNumber_validation == "" ||
                  !this.state.state
                    ? true
                    : false
                }
              >
                <i className="fa fa-dot-circle-o" /> Add Employee
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

export default AddEmployee;
