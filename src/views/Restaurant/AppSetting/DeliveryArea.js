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

class DeliveryArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryArea: {
        deliveryTime: "",
        deliveryPrice: "",
        minimumAmount: "",
        zipeCode: [],
        freeDelivery: false
      }
    };
    this.deletezipecode = this.deletezipecode.bind(this);
    this.addzipcode = this.addzipcode.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
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
        if (
          res.data &&
          res.data.deliveryArea &&
          res.data.deliveryArea.length != 0
        ) {
          this.setState({
            deliveryArea: res.data.deliveryArea[0]
          });
        }
      });
  }

  deletezipecode(e) {
    var id = e.target.value;
    let { deliveryArea } = this.state;

    deliveryArea.zipeCode = deliveryArea.zipeCode.filter(function(
      value,
      index
    ) {
      return index != id;
    });
    this.setState({
      deliveryArea
    });
  }

  addzipcode() {
    let { deliveryArea } = this.state;
    // if( typeof(deliveryArea['zipeCode']) === undefined ){
    //     deliveryArea.push('zipeCode');
    // }
    console.log(deliveryArea);

    // else{
    var zipeCode = deliveryArea.zipeCode;
    if (!this.checkvariant(zipeCode)) {
      toastr.error("Please enter  zipecode!");
      return;
    }
    zipeCode = [...zipeCode, ""];
    deliveryArea.zipeCode = zipeCode;
    // }
    this.setState({
      deliveryArea
    });
  }

  handleChange(e, index) {
    const { deliveryArea } = this.state;
    var zipeCode = deliveryArea.zipeCode;
    if (!this.checkzipeCode(e.target.value)) {
      zipeCode[index] = "";
    } else {
      zipeCode[index] = e.target.value;
    }
    deliveryArea.zipeCode = zipeCode;
    this.setState({
      deliveryArea
    });
  }

  handleChangeInput(e) {
    const { deliveryArea } = this.state;
    if (e.target.type == "checkbox") {
      deliveryArea[e.target.name] = e.target.checked;
    } else {
      deliveryArea[e.target.name] = e.target.value;
    }
    this.setState({
      deliveryArea
    });
  }

  checkvariant(array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == "" || !array[i].match(/^([0-9])/)) {
        return false;
      }
    }
    return true;
  }

  checkzipeCode(val) {
    const { deliveryArea } = this.state;
    for (var i = 0; i < deliveryArea.zipeCode.length; i++) {
      if (parseInt(deliveryArea.zipeCode[i]) == parseInt(val)) {
        return false;
      }
    }
    return true;
  }

  handleSubmit = () => {
    if (
      !this.state.deliveryArea.deliveryPrice.match(/^([0-9])/) ||
      this.state.deliveryArea.deliveryPrice == ""
    ) {
      toastr.error("Please enter only number in delivery price field!");
      return;
    }
    if (
      !this.state.deliveryArea.deliveryTime.match(/^([0-9])/) ||
      this.state.deliveryArea.deliveryTime == ""
    ) {
      toastr.error("Please enter only number in delivery time field!");
      return;
    }
    if (this.state.deliveryArea.zipeCode.length == 0) {
      toastr.error("Please enter  zipecode!");
      return;
    }

    if (this.state.deliveryArea.freeDelivery) {
      if (this.state.deliveryArea.minimumAmount == "") {
        toastr.error("Please enter  minimumAmount!");
        return;
      }
    }

    if (!this.checkvariant(this.state.deliveryArea.zipeCode)) {
      toastr.error("Please enter only number!");
      return;
    }
    var id = Auth.getToken("userId");
    axios
      .post(Constants.BASE_URL + `api/settings/${id}`, this.state, {
        headers: {
          //"content-type": "application/json",
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
    return (
      <Card>
        <CardHeader>
          <h5>
            <i className="icon-map" />
            &nbsp;&nbsp; Delivery Area's & Settings
          </h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="2">
              <Label>
                <strong>Delivery Time</strong>
              </Label>
            </Col>
            <Col xs="2">
              <Label>
                <strong>Delivery Price</strong>
              </Label>
            </Col>
          </Row>
          <FormGroup row>
            <Col xs="2">
              <Input
                type="text"
                id="dishDiscount"
                name="deliveryTime"
                placeholder="20-30 min"
                value={this.state.deliveryArea.deliveryTime}
                onChange={this.handleChangeInput}
              />
            </Col>
            <Col xs="2">
              <Input
                type="text"
                id="dishPrice"
                name="deliveryPrice"
                placeholder="11.95"
                value={this.state.deliveryArea.deliveryPrice}
                onChange={this.handleChangeInput}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="2">
              <FormGroup check className="checkbox">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  id="checkbox3"
                  name="freeDelivery"
                  checked={this.state.deliveryArea.freeDelivery}
                  onChange={this.handleChangeInput}
                />
                <Label check className="form-check-label" htmlFor="checkbox3">
                  Free Delivery
                </Label>
              </FormGroup>
            </Col>
            {this.state.deliveryArea.freeDelivery ? (
              <Col xs="2">
                <Label>
                  <strong>Minimum Order Amount</strong>
                </Label>
                <Input
                  type="text"
                  id="dishDiscount"
                  name="minimumAmount"
                  placeholder="25"
                  onChange={this.handleChangeInput}
                />
              </Col>
            ) : (
              ""
            )}
          </FormGroup>

          <br />
          <FormGroup row className="my-0">
            <Col xs="6">
              <Row>
                <Col xs="6">
                  <Label>
                    <strong>Add Zip Codes for Delivery</strong>
                  </Label>
                </Col>
                <Col xs="6">
                  <FormGroup>
                    <Button
                      type="button"
                      size="md"
                      color="success"
                      onClick={this.addzipcode}
                    >
                      <i className="fa fa-plus-square-o" />
                      &nbsp;&nbsp;Add New zipeCode
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
              {this.state.deliveryArea.zipeCode &&
                this.state.deliveryArea.zipeCode.map((zipeCode, index) => {
                  return (
                    <FormGroup row key={index}>
                      <Col xs="3">
                        <Input
                          type="text"
                          id="dishDiscount"
                          name="zipeCode"
                          placeholder="Zip Code"
                          value={zipeCode}
                          onChange={e => this.handleChange(e, index)}
                        />
                      </Col>

                      <Col xs="3">
                        <Button
                          type="button"
                          size="md"
                          color="danger"
                          onClick={this.deletezipecode}
                          value={index}
                        >
                          <i className="fa fa-trash" /> Delete
                        </Button>
                      </Col>
                    </FormGroup>
                  );
                })}
            </Col>
            {/* <Col xs="6">
              <Row>
                <Col xs="6">
                  <Label>
                    <strong>Approved Zip Codes for Delivery</strong>
                  </Label>
                </Col>
              </Row>
              <FormGroup row>
                <Col xs="2">
                  <p className="lead">91335</p>
                </Col>
                <Col xs="2">
                  <Button
                    color="danger"
                    onClick={this.toggleDeleteZipcode}
                    className="mr-1"
                  >
                    <i className="fa fa-trash" />
                  </Button>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="2">
                  <p className="lead">91335</p>
                </Col>
                <Col xs="2">
                  <Button
                    color="danger"
                    onClick={this.toggleDeleteZipcode}
                    className="mr-1"
                  >
                    <i className="fa fa-trash" />
                  </Button>
                </Col>
              </FormGroup>
            </Col> */}
          </FormGroup>

          <hr />
        </CardBody>
        <CardFooter>
          <Row>
            <Col xs="10">
              <Button
                type="button"
                size="lg"
                color="primary"
                onClick={this.handleSubmit}
              >
                <i className="fa fa-dot-circle-o" /> Update
              </Button>
            </Col>
            <Col xs="2">
              <Button type="button" size="lg" color="danger">
                <i className="fa fa-ban" /> Cancel
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

export default DeliveryArea;
