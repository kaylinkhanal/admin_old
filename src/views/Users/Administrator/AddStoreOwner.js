import React, { Component } from "react";
import { Alert } from "reactstrap";
import { toastr } from "react-redux-toastr";
import PhoneInput from "react-phone-number-input";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Form,
  FormFeedback
} from "reactstrap";
import Auth from "../../../cookie/Auth";
import axios from "axios";
import { Constants } from "../../../constants/environment";
import { state } from "../../../constants/environment";

const customInput = <input name="phone" type="text" />;
class AddStoreOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      req: false,
      store_owner_count: 0,
      number_validation: "",
      phone_validation: "",
      store_types: [],
      email_validation: "",
      alert: "",
      password_validation: "",
      state: false,
      phone: "",
      store_owner: {
        storeOwnerName: null,
        phone: "11415164164",
        emailAddress: undefined,
        password: undefined,
        streetAddress: undefined,
        city: undefined,
        state: undefined,
        postalCode: "",
        storeName: undefined,
        store_type_id: "",
        phone_country: ""
      }
    };
  }
  componentDidMount() {
    axios
      .get(Constants.BASE_URL + "api/store-type", {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(res => {
        this.setState({
          store_types: res.data
        });
      });
    this.setState({
      store_owner: {
        storeOwnerName: null,
        phone: undefined,
        emailAddress: undefined,
        password: undefined,
        streetAddress: undefined,
        city: undefined,
        state: undefined,
        postalCode: undefined,
        storeName: undefined,
        store_type_id: undefined
      }
    });
  }

  onChangeValue = e => {
    const { store_owner } = this.state;
    store_owner[e.target.name] = e.target.value;
    if (e.target.name === "emailAddress") {
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
      store_owner
    });
    this.setState({
      req: true
    });
    if (
      !this.state.store_owner.storeOwnerName ||
      !this.state.store_owner.password ||
      !this.state.store_owner.streetAddress ||
      !this.state.store_owner.city ||
      !this.state.store_owner.state ||
      !this.state.store_owner.storeName ||
      !this.state.store_owner.store_type_id
    ) {
      this.state.state = false;
    } else {
      this.state.state = true;
    }
  };

  handleSubmit = async () => {
    let store_owner = this.state.store_owner;
    if (this.state.store_owner.store_type_id === "") {
      store_owner.store_type_id = this.state.store_types[0].storeTypeName;
    }
    await axios
      .post(
        Constants.BASE_URL + "api/store/add-store",
        {
          store_owner: store_owner
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
            store_owner: {
              storeOwnerName: "",
              phone: "",
              emailAddress: "",
              password: "",
              streetAddress: "",
              city: "",
              state: "",
              postalCode: "",
              storeName: "",
              store_type_id: ""
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
    return (
      <Card>
        <CardHeader>
          <h5>
            <i className="icon-people" /> Add Store Owner
          </h5>
        </CardHeader>
        <CardBody>
          <FormGroup row className="my-0">
            <Col xs="3">
              <Form
                className={
                  this.state.store_owner.storeOwnerName !== null
                    ? "was-validated"
                    : ""
                }
              >
                <FormGroup>
                  <Label htmlFor="storeOwnerName">
                    <strong>Store Owner Name</strong>
                  </Label>
                  <Input
                    name={"storeOwnerName"}
                    onChange={this.onChangeValue}
                    value={this.state.store_owner.storeOwnerName}
                    type="text"
                    id="storeOwnerName"
                    required={this.state.req}
                  />
                  <FormFeedback className="help-block">
                    Please enter store owner name
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="3">
              <Form
                className={
                  (this.state.store_owner.phone !== undefined &&
                    this.state.phone_validation === "") ||
                  this.state.store_owner.phone === ""
                    ? "was-validated"
                    : ""
                }
              >
                <FormGroup>
                  <Label htmlFor="storeOwnerPhone">
                    <strong>Phone</strong>
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
                    value={this.state.store_owner.phone}
                    type="text"
                    id="storeOwnerPhone"
                    // disableDropdown={true}
                    placeholder="(818) 999 – 9999 "
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
            <Col xs="3">
              <Form
                className={
                  this.state.store_owner.emailAddress !== undefined &&
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
                      Email Address
                    </strong>
                  </Label>
                  <Input
                    style={{
                      border:
                        this.state.email_validation !== ""
                          ? "1px solid red"
                          : ""
                    }}
                    name={"emailAddress"}
                    onChange={this.onChangeValue}
                    value={this.state.store_owner.emailAddress}
                    type="text"
                    id="storeEmail"
                    required={this.state.req}
                  />
                  <FormFeedback className="help-block">
                    Please enter email address
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>

            <Col xs="3">
              <Form
                className={
                  (this.state.store_owner.password !== undefined &&
                    this.state.password_validation === "") ||
                  this.state.store_owner.password === ""
                    ? "was-validated"
                    : ""
                }
              >
                <FormGroup>
                  <Label htmlFor="storePassword">
                    <strong>Password</strong>
                  </Label>
                  <Input
                    name={"password"}
                    onChange={this.onChangeValue}
                    value={this.state.store_owner.password}
                    type="password"
                    id="storePassword"
                    style={{
                      border:
                        this.state.password_validation !== ""
                          ? "1px solid red"
                          : ""
                    }}
                    required={this.state.req}
                  />
                  {this.state.password_validation !== "" &&
                  this.state.store_owner.password !== "" ? (
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

          <FormGroup row className="my-0">
            <Col xs="4">
              <Form
                className={
                  this.state.store_owner.streetAddress !== undefined
                    ? "was-validated"
                    : ""
                }
              >
                <FormGroup>
                  <Label htmlFor="streetAddress">
                    <strong>Street Address</strong>
                  </Label>
                  <Input
                    name={"streetAddress"}
                    onChange={this.onChangeValue}
                    value={this.state.store_owner.streetAddress}
                    type="text"
                    id="streetAddress"
                    placeholder="Street Name"
                    style={{
                      border:
                        this.state.store_owner.streetAddress == ""
                          ? "1px solid red"
                          : ""
                    }}
                    required={this.state.req}
                  />
                  <FormFeedback className="help-block">
                    Please enter street address
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>

            <Col xs="3">
              <Form
                className={
                  this.state.store_owner.city !== undefined
                    ? "was-validated"
                    : ""
                }
              >
                <FormGroup>
                  <Label htmlFor="city">
                    <strong>City</strong>
                  </Label>
                  <Input
                    name={"city"}
                    onChange={this.onChangeValue}
                    value={this.state.store_owner.city}
                    type="text"
                    id="city"
                    style={{
                      border:
                        this.state.store_owner.city == "" ? "1px solid red" : ""
                    }}
                    required={this.state.req}
                  />
                  <FormFeedback className="help-block">
                    Please enter city
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="3">
              <Form
                className={this.state.store_owner.state !== undefined ? "" : ""}
              >
                <FormGroup>
                  <Label htmlFor="state">
                    <strong>State</strong>
                  </Label>
                  <Input
                    name={"state"}
                    onChange={this.onChangeValue}
                    value={this.state.store_owner.state}
                    type="select"
                    id="state"
                    placeholder="State"
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
                  <Label>
                    <strong style={{ color: "#4dbd74" }}>
                      {this.state.store_owner.state}
                    </strong>
                  </Label>
                  <FormFeedback className="help-block">
                    Please enter state
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="2">
              <Form
                className={
                  (this.state.store_owner.postalCode !== undefined &&
                    this.state.number_validation === "") ||
                  this.state.store_owner.postalCode === ""
                    ? "was-validated"
                    : ""
                }
              >
                <FormGroup>
                  <Label htmlFor="postal_code">
                    <strong>Postal Code</strong>
                  </Label>
                  <Input
                    name={"postalCode"}
                    onChange={this.onChangeValue}
                    value={this.state.store_owner.postalCode}
                    type="text"
                    id="postal_code"
                    style={{
                      border:
                        this.state.number_validation !== ""
                          ? "1px solid red"
                          : ""
                    }}
                    required={this.state.req}
                  />
                  {this.state.number_validation !== "" &&
                  this.state.store_owner.postalCode !== "" ? (
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
          <Breadcrumb>
            <BreadcrumbItem>
              <h5>Store Information</h5>
            </BreadcrumbItem>
          </Breadcrumb>
          <FormGroup row className="my-0">
            <Col xs="4">
              <Form
                className={
                  this.state.store_owner.storeName !== undefined
                    ? "was-validated"
                    : ""
                }
              >
                <FormGroup>
                  <Label htmlFor="storeName">
                    <strong>Store Name</strong>
                  </Label>
                  <Input
                    name={"storeName"}
                    onChange={this.onChangeValue}
                    value={this.state.store_owner.storeName}
                    type="text"
                    id="storeName"
                    required={this.state.req}
                  />
                  <FormFeedback className="help-block">
                    Please enter store name
                  </FormFeedback>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="3">
              <Form
                className={
                  this.state.store_owner.store_type_id !== undefined ? "" : ""
                }
              >
                <FormGroup>
                  <Label htmlFor="storeType">
                    <strong>Store Type</strong>
                  </Label>
                  <Input
                    name={"store_type_id"}
                    onChange={this.onChangeValue}
                    type="select"
                    id="storeType"
                  >
                    <option value=""></option>
                    {this.state.store_types.map((store_type, index) => {
                      return (
                        <option key={index} value={store_type._id}>
                          {store_type.storeTypeName}
                        </option>
                      );
                    })}
                  </Input>
                  <FormFeedback className="help-block">
                    Please select store type
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
                type="button"
                size="lg"
                color="primary"
                disabled={
                  this.state.email_validation !== "" ||
                  this.state.number_validation !== "" ||
                  !this.state.phone_validation == "" ||
                  this.state.password_validation !== "" ||
                  this.state.state == false
                    ? true
                    : false
                }
                onClick={this.handleSubmit}
              >
                <i className="fa fa-dot-circle-o" /> Add Store
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

export default AddStoreOwner;
