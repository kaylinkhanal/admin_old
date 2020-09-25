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
  Breadcrumb,
  BreadcrumbItem,
  Row
} from "reactstrap";
import Auth from "../../../cookie/Auth";
import axios from "axios";
import { Constants } from "../../../constants/environment";
import { toastr } from "react-redux-toastr";

class PaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: {
        merchantName: "",
        userID: "",
        merchantAccount: "",
        apple: false,
        google: false,
        masterCard: false,
        express: false,
        discoverCard: false,
        paypal: false,
        cash: false
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        console.log(res.data);
        if (res.data.paymentMethod && res.data.paymentMethod.length != 0) {
          this.setState({
            paymentMethod: res.data.paymentMethod[0]
          });
        }
      });
  }

  handleChange(e) {
    let { paymentMethod } = this.state;
    if (e.target.type === "checkbox") {
      paymentMethod[e.target.name] = e.target.checked;
    } else {
      paymentMethod[e.target.name] = e.target.value;
    }
    this.setState({
      paymentMethod
    });
  }

  handleSubmit() {
    var id = Auth.getToken("userId");
    console.log(this.state);
    if (this.state.paymentMethod.merchantName == "") {
      toastr.error("Please enter Merchant name!");
      return;
    }
    if (this.state.paymentMethod.userID == "") {
      toastr.error("Please enter user id!");
      return;
    }
    if (
      this.state.paymentMethod.merchantAccount == "" ||
      !this.state.paymentMethod.merchantAccount.match(/^([0-9])/)
    ) {
      toastr.error("Please enter only number in merchant accout field!");
      return;
    }
    if (
      !this.state.paymentMethod.google &&
      !this.state.paymentMethod.apple &&
      !this.state.paymentMethod.masterCard &&
      !this.state.paymentMethod.discoverCard &&
      !this.state.paymentMethod.express &&
      !this.state.paymentMethod.paypal
    ) {
      toastr.error("Please select at least a payment method!");
      return;
    }
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
  }
  render() {
    console.log(this.state.paymentMethod);
    return (
      <Card>
        <CardHeader>
          <h5>
            <i className="icon-credit-card" />
            &nbsp;&nbsp;Payment Method
          </h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="2">
              <Label>
                <strong>Merchant Name</strong>
              </Label>
            </Col>
            <Col xs="2">
              <Label>
                <strong>User ID</strong>
              </Label>
            </Col>
            <Col xs="4">
              <Label>
                <strong>Merchant Account#</strong>
              </Label>
            </Col>
            <Col xs="2">
              <Label>
                <strong>Checkout Options</strong>
              </Label>
            </Col>
          </Row>
          <FormGroup row className="my-0">
            <Col xs="2">
              <FormGroup>
                <Input
                  type="text"
                  id="merchantName"
                  name="merchantName"
                  placeholder="PayPal"
                  value={this.state.paymentMethod.merchantName}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="2">
              <FormGroup>
                <Input
                  type="text"
                  id="userID"
                  name="userID"
                  placeholder="User ID"
                  value={this.state.paymentMethod.userID}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <Input
                  type="text"
                  id="merchantAccount"
                  name="merchantAccount"
                  placeholder="123456789"
                  value={this.state.paymentMethod.merchantAccount}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="2">
              <FormGroup>
                <FormGroup check className="checkbox">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    id="checkbox2"
                    name="apple"
                    checked={this.state.paymentMethod.apple}
                    value={this.state.paymentMethod.apple}
                    onChange={this.handleChange}
                  />
                  <Label check className="form-check-label" htmlFor="checkbox2">
                    Apple Pay
                  </Label>
                </FormGroup>
                <FormGroup check className="checkbox">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    id="checkbox2"
                    name="google"
                    checked={this.state.paymentMethod.google}
                    // value={this.state.google}
                    onChange={this.handleChange}
                  />
                  <Label check className="form-check-label" htmlFor="checkbox2">
                    Google Pay
                  </Label>
                </FormGroup>
                <FormGroup check className="checkbox">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    id="checkbox1"
                    name="masterCard"
                    checked={this.state.paymentMethod.masterCard}
                    value={this.state.paymentMethod.masterCard}
                    onChange={this.handleChange}
                  />
                  <Label check className="form-check-label" htmlFor="checkbox1">
                    Visa/MasterCard
                  </Label>
                </FormGroup>
                <FormGroup check className="checkbox">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    id="checkbox2"
                    name="express"
                    checked={this.state.paymentMethod.express}
                    value={this.state.paymentMethod.express}
                    onChange={this.handleChange}
                  />
                  <Label check className="form-check-label" htmlFor="checkbox2">
                    American Express
                  </Label>
                </FormGroup>
                <FormGroup check className="checkbox">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    id="checkbox3"
                    name="discoverCard"
                    value={this.state.paymentMethod.discoverCard}
                    checked={this.state.paymentMethod.discoverCard}
                    onChange={this.handleChange}
                  />
                  <Label check className="form-check-label" htmlFor="checkbox3">
                    Discover Card
                  </Label>
                </FormGroup>
                <FormGroup check className="checkbox">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    id="checkbox3"
                    name="paypal"
                    value={this.state.paymentMethod.paypal}
                    checked={this.state.paymentMethod.paypal}
                    onChange={this.handleChange}
                  />
                  <Label check className="form-check-label" htmlFor="checkbox3">
                    PayPal
                  </Label>
                </FormGroup>
                <FormGroup check className="checkbox">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    id="checkbox1"
                    name="cash"
                    checked={this.state.paymentMethod.cash}
                    value={this.state.paymentMethod.cash}
                    onChange={this.handleChange}
                  />
                  <Label check className="form-check-label" htmlFor="checkbox1">
                    Cash
                  </Label>
                </FormGroup>
              </FormGroup>
            </Col>
            <Col xs="2">
              <FormGroup>
                <Button
                  type="button"
                  size="md"
                  color="success"
                  onClick={this.handleSubmit}
                >
                  <i className="fa fa-plus-square-o" />
                  &nbsp;&nbsp;Add Merchant
                </Button>
              </FormGroup>
            </Col>
          </FormGroup>
          <br />
          <br />
          <hr />
        </CardBody>
        <CardFooter>
          <Row />
        </CardFooter>
      </Card>
    );
  }
}

export default PaymentMethod;
