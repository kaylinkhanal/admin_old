import React, { Component } from "react";
import axios from "axios";
import { Alert } from "reactstrap";
import { toastr } from "react-redux-toastr";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  // Badge,
  Button,
  // ButtonDropdown,
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
  // Form,
  FormGroup,
  // FormText,
  // FormFeedback,
  Input,
  // InputGroup,
  // InputGroupAddon,
  // InputGroupText,
  Label,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Form,
  FormFeedback
} from "reactstrap";
import { AppSwitch } from "@coreui/react";

import { Constants } from "../../../constants/environment";
import { state } from "../../../constants/environment";
import Auth from "../../../cookie/Auth";

class EditStoreOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store_type_name: "",
      email_validation: "",
      number_validation: "",
      phone_validation: "",
      store_owner_list: [],
      storeOwner_id: "",
      status: false,
      alert: "",
      state: false,
      name: false,
      storeName: false,
      email: false,
      phone: false,
      address: false,
      country: false,
      state: false,
      postal_code: false,
      user_id: false,
      store_owner: {
        name: undefined,
        storeName: undefined,
        //password:"",
        email: undefined,
        phone: "11415164164",
        address: undefined,
        country: undefined,
        state: undefined,
        postal_code: undefined,
        user_id: undefined,
        // status:false,
        _id: ""
      }
    };
  }

  componentDidMount() {
    const storeType = this.props.match.params.storeTypeName;
    const storeOwnerIndex = this.props.match.params.storeOwnerIndex;
    this.setState({
      store_type_name: storeType,
      storeOwner_id: storeOwnerIndex
    });

    axios
      .get(
        Constants.BASE_URL +
          `api/store/store-owner/Restaurant/${storeOwnerIndex}`,
        {
          headers: {
            //"content-type": "application/json",
            Authorization: "Bearer " + Auth.getToken("token")
          }
        }
      )
      .then(res => {
        var name = res.data.data[0].user[0].name;
        var storeName = res.data.data[0].storeName;
        var email = res.data.data[0].user[0].email;
        var phone = res.data.data[0].user[0].contactNumber;
        var address = res.data.data[0].user[0].street;
        var country = res.data.data[0].user[0].country;
        var state = res.data.data[0].user[0].state;
        var postal_code = res.data.data[0].user[0].postalCode;
        var user_id = res.data.data[0].user[0]._id;
        var status = res.data.data[0].activation;
        var store_id = res.data.data[0]._id;

        this.setState({
          store_owner: {
            name: name,
            storeName: storeName,
            email: email,
            phone: phone,
            address: address,
            country: country,
            state: state,
            postal_code: postal_code,
            user_id: user_id,
            status: status,
            _id: store_id
          }
        });

        this.setState({
          status: status
        });
      });
  }

  onChangeValue = e => {
    const { store_owner } = this.state;
    store_owner[e.target.name] = e.target.value;
    this.state[e.target.name] = true;
    if (e.target.name === "email") {
      this.setState({
        email_validation: e.target.value.match(
          /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
        )
          ? ""
          : "not validation"
      });
    }
    if (e.target.name === "postal_code") {
      this.setState({
        number_validation: e.target.value.match(/^([0-9])/)
          ? ""
          : "not validation"
      });
      if (e.target.value.length !== 5)
        this.setState({
          number_validation: "not validation"
        });
    }

    if (e.target.name === "phone") {
      this.setState({
        phone_validation: e.target.value.match(/^([0-9])/)
          ? ""
          : "not validation"
      });
      if (e.target.value.length !== 10)
        this.setState({
          phone_validation: "not validation"
        });
    }

    this.setState({
      store_owner
    });
    if (
      this.state.store_owner.name == "" ||
      this.state.store_owner.address == "" ||
      this.state.store_owner.country == "" ||
      this.state.store_owner.state == "" ||
      this.state.store_owner.storeName == ""
    ) {
      this.state.state = true;
    } else {
      this.state.state = false;
    }
  };

  // statusChange = ()=>{

  //   const { store_owner } = this.state;
  //   store_owner['status'] = !this.state.store_owner.status

  //   this.setState({
  //      store_owner
  //   })
  // }

  handleSubmit = async () => {
    let store_owner = this.state.store_owner;
    var status = this.state.status;
    await axios
      .post(
        Constants.BASE_URL + "api/store/store-owner/update-store-owner",
        {
          store_owner: store_owner,
          status: status
        },
        {
          headers: {
            //"content-type": "application/json",
            Authorization: "Bearer " + Auth.getToken("token")
          }
        }
      )
      .then(res => {
        toastr.success("success", "Saved successfully!");
        this.props.history.goBack();
      })
      .catch(err => {
        toastr.warning("Warning", "Please Try again!");
      });
  };
  render() {
    return (
      <Card>
        <CardHeader>
          <Row>
            <Col xs="10">
              <h5>
                <i className="icon-people" /> Edit{" "}
                {this.state.store_owner.storeName} {this.state.store_type_name}
              </h5>
            </Col>
            <AppSwitch
              className={"mx-1"}
              variant={"pill"}
              color={"success"}
              label
              //key={}
              checked={this.state.status}
              onChange={() => {
                this.setState({
                  status: !this.state.status
                });
              }}
            />
          </Row>
        </CardHeader>

        <CardBody>
          <FormGroup row className="my-0">
            <Col xs="4">
              <Form className={this.state.name ? "was-validated" : ""}>
                <FormGroup>
                  <Label htmlFor="employeeName">
                    <strong>Owner Name</strong>
                  </Label>
                  <Input
                    name="name"
                    type="text"
                    id="employeeName"
                    placeholder="Employee Name"
                    onChange={this.onChangeValue}
                    value={
                      this.state.store_owner.name
                        ? this.state.store_owner.name
                        : ""
                    }
                    style={{
                      border:
                        this.state.store_owner.name == "" ? "1px solid red" : ""
                    }}
                    required
                  />
                  <FormFeedback className="help-block">
                    Please enter store owner name
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>

            <Col xs="4">
              <Form className={this.state.storeName ? "was-validated" : ""}>
                <FormGroup>
                  <Label htmlFor="employeeName">
                    <strong>store Name</strong>
                  </Label>
                  <Input
                    name="storeName"
                    type="text"
                    id="storeName"
                    placeholder="storeName"
                    onChange={this.onChangeValue}
                    value={
                      this.state.store_owner.storeName
                        ? this.state.store_owner.storeName
                        : ""
                    }
                    required
                  />
                  <FormFeedback className="help-block">
                    Please enter store name
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>

            {/* <Col xs="4">
              <FormGroup>
                <Label htmlFor="employeePassword">
                  <strong>Password</strong>
                </Label>
                <Input
                  name="password"
                  
                  id="employeePassword"
                  placeholder="Password"
                  onChange={this.onChangeValue}
                  style={{
                    border:
                      this.state.store_owner.password == "" ? "1px solid red" : ""
                  }}
                  required
                  />
              </FormGroup>
            </Col> */}
          </FormGroup>
          <Breadcrumb>
            <BreadcrumbItem>
              <h5>Store Owner Information</h5>
            </BreadcrumbItem>
          </Breadcrumb>
          <FormGroup row className="my-0">
            <Col xs="6">
              <Form className={this.state.email ? "" : ""}>
                <FormGroup>
                  <Label htmlFor="employeeEmail">
                    <strong
                      style={{
                        color:
                          this.state.email_validation !== "" ? "red" : "black"
                      }}
                    >
                      Email Address
                    </strong>
                  </Label>
                  <Input
                    name="email"
                    type="text"
                    id="employeeEmail"
                    placeholder="Employee Email"
                    value={
                      this.state.store_owner.email
                        ? this.state.store_owner.email
                        : ""
                    }
                    onChange={this.onChangeValue}
                    style={{
                      border:
                        this.state.email_validation !== ""
                          ? "1px solid red"
                          : ""
                    }}
                    required
                  />
                  <FormFeedback className="help-block">
                    Please enter email
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="6">
              <Form className={this.state.phone ? "was-validated" : ""}>
                <FormGroup>
                  <Label htmlFor="phone-number">
                    <strong>Phone Number</strong>
                  </Label>
                  <ReactPhoneInput
                    defaultCountry={"us"}
                    onlyCountries={["us"]}
                    name={"phone"}
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
                      const { store_owner } = this.state;
                      store_owner.phone = value.replace(/[^0-9]+/g, "");
                      this.setState({ store_owner });
                    }}
                    value={String(this.state.store_owner.phone)}
                    type="text"
                    id="storeOwnerPhone"
                    placeholder="(818) 999 – 9999 "
                    disableDropdown={true}
                    // style={{
                    //   border:
                    //     this.state.phone_validation !== "" ? "1px solid red" : "",

                    // }}
                    required={this.state.req}
                  />
                  {this.state.phone_validation !== "" &&
                  this.state.store_owner.phone !== "" ? (
                    <Label htmlFor="storeEmail">
                      <string style={{ color: "#f86c6b" }}>
                        Phone number should have 10 digits and only number
                      </string>
                    </Label>
                  ) : (
                    ""
                  )}
                  <FormFeedback className="help-block">
                    Please enter store owner phone number
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
          </FormGroup>
          <Form className={this.state.address ? "was-validated" : ""}>
            <FormGroup>
              <Label htmlFor="street">
                <strong>Street Address</strong>
              </Label>
              <Input
                type="text"
                id="street"
                placeholder="Street Name"
                name="address"
                value={
                  this.state.store_owner.address
                    ? this.state.store_owner.address
                    : ""
                }
                onChange={this.onChangeValue}
                style={{
                  border:
                    this.state.store_owner.address == "" ? "1px solid red" : ""
                }}
                required
              />
              <FormFeedback className="help-block">
                Please enter street address
              </FormFeedback>
            </FormGroup>
          </Form>

          <FormGroup row className="my-0">
            <Col xs="4">
              <Form className={this.state.country ? "was-validated" : ""}>
                <FormGroup>
                  <Label htmlFor="city">
                    <strong>City</strong>
                  </Label>
                  <Input
                    type="text"
                    id="city"
                    placeholder="Enter Your City"
                    name="country"
                    value={
                      this.state.store_owner.country
                        ? this.state.store_owner.country
                        : ""
                    }
                    onChange={this.onChangeValue}
                    style={{
                      border:
                        this.state.store_owner.country == ""
                          ? "1px solid red"
                          : ""
                    }}
                    required
                  />
                  <FormFeedback className="help-block">
                    Please enter city
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="4">
              <Form className={this.state.state ? "" : ""}>
                <FormGroup>
                  <Label htmlFor="state">
                    <strong>State</strong>
                  </Label>
                  <Input
                    type="select"
                    id="state"
                    placeholder="State"
                    name="state"
                    value={
                      this.state.store_owner.state
                        ? this.state.store_owner.state
                        : ""
                    }
                    onChange={this.onChangeValue}
                    style={{
                      border:
                        this.state.store_owner.state == ""
                          ? "1px solid red"
                          : ""
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
                      {this.state.store_owner.state}
                    </strong>
                  </Label>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="4">
              <Form
                className={
                  (this.state.postal_code &&
                    this.state.number_validation == "") ||
                  this.state.store_owner.postal_code == ""
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
                    name="postal_code"
                    value={
                      this.state.store_owner.postal_code
                        ? this.state.store_owner.postal_code
                        : ""
                    }
                    onChange={this.onChangeValue}
                    style={{
                      border:
                        this.state.number_validation !== ""
                          ? "1px solid red"
                          : ""
                    }}
                    required
                  />
                  {this.state.number_validation !== "" &&
                  this.state.store_owner.postal_code !== "" ? (
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
                disabled={
                  this.state.email_validation !== "" ||
                  this.state.number_validation !== "" ||
                  this.state.phone_validation !== "" ||
                  this.state.state
                    ? true
                    : false
                }
                onClick={this.handleSubmit}
              >
                <i className="fa fa-dot-circle-o" /> Update
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

export default EditStoreOwner;
