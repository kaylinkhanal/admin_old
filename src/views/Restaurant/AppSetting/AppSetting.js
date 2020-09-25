import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  SketchPicker,
  HuePicker,
  BlockPicker,
  PhotoshopPicker
} from "react-color";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Label,
  Row,
  Table
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
import _ from "lodash";
import StoreTax from "./StoreTax";
import Auth from "../../../cookie/Auth";
import axios from "axios";
import { Constants } from "../../../constants/environment";

class AppSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appTheme: {
        enable: false,
        appColor: "",
        appBanner: "",
        about: ""
      },
      storename: "",
      storetype: "",
      stateTax: [],
      paymentMethod: [],
      storeHours: [],
      deliveryArea: []
    };
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
        document.documentElement.scrollTop = 0;
        if (res.data.paymentMethod && res.data.paymentMethod.length != 0) {
          this.setState({
            paymentMethod: res.data.paymentMethod[0]
          });
        }
        if (res.data.appTheme && res.data.appTheme.length != 0) {
          this.setState({
            appTheme: res.data.appTheme[0]
          });
        }
        this.setState({
          stateTax: res.data.stateTax,
          storeHours: res.data.storeHours
        });
        if (res.data.deliveryArea && res.data.deliveryArea.length != 0) {
          this.setState({
            deliveryArea: res.data.deliveryArea
          });
        }
      });
    await axios
      .get(Constants.BASE_URL + `api/store/store-owner/${id}`, {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(async res => {
        const data = await res.data;
        if (data.length != 0 && data) {
          this.setState({
            storename: data[0].storeName,
            storetype: data[0].storetype[0].storeTypeID
          });
        }
      });
  }

  render() {
    var namer = require("color-namer");
    var user_id = Auth.getToken("userId");
    var colorName = namer("#FF0000");
    return (
      <Card>
        <CardHeader>
          <h5>
            <i className="cui-screen-smartphone icons font-2xl mt-4" /> App
            Setting Summary - {user_id}
          </h5>
        </CardHeader>

        <CardBody>
          <Row>
            <Col xs="12" md="8">
              <Card className="card-accent-primary">
                <CardHeader className="text-center">
                  <strong>APP THEME</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs="6">
                      <Label>
                        <strong>Banner</strong>:{" "}
                        {this.state.appTheme.enable &&
                        this.state.appTheme.enable
                          ? "ON"
                          : "OFF"}
                      </Label>
                      <br />
                      <Label>
                        <strong>App Color</strong>:
                        <div
                          style={{
                            width: 60,
                            height: 25,
                            backgroundColor: this.state.appTheme.appColor,
                            float: "right"
                          }}
                        ></div>
                      </Label>
                      <br />
                      <Label>
                        <strong>About Us</strong>: {this.state.appTheme.about}
                      </Label>
                    </Col>
                    <Col xs="6" className="text-center">
                      <div>Banner Image</div>
                      <img
                        src={`public/Stores/${this.state.storetype}/${user_id}/App/Carousel/${this.state.appTheme.appBanner}.png`}
                        width="150"
                        alt=""
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs="12" md="8">
              <Card className="card-accent-primary">
                <CardHeader className="text-center">
                  <strong>STATE TAX</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs="6">
                      {this.state.stateTax &&
                        this.state.stateTax.map((tax, index) => {
                          return (
                            <div key={index}>
                              <Label>
                                <strong>{tax.taxName}</strong>: {tax.taxRate}%
                              </Label>
                              <br />
                            </div>
                          );
                        })}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs="12" md="8">
              <Card className="card-accent-primary">
                <CardHeader className="text-center">
                  <strong>PAYMENTS METHOD</strong>
                </CardHeader>
                <CardBody>
                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th>Payment Option</th>
                        <th>Active</th>
                        <th>Dish Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Apple Pay</td>
                        <td>
                          {this.state.paymentMethod.apple &&
                          this.state.paymentMethod.apple ? (
                            <i className="fa fa-check fa-lg float-left" />
                          ) : (
                            <i className="fa fa-close fa-lg float-left" />
                          )}
                        </td>
                        <td>Setting</td>
                      </tr>
                      <tr>
                        <td>Google Pay</td>
                        <td>
                          {this.state.paymentMethod.google ? (
                            <i className="fa fa-check fa-lg float-left" />
                          ) : (
                            <i className="fa fa-close fa-lg float-left" />
                          )}
                        </td>
                        <td>Setting</td>
                      </tr>
                      <tr>
                        <td>Visa/MasterCard</td>
                        <td>
                          {this.state.paymentMethod.masterCard ? (
                            <i className="fa fa-check fa-lg float-left" />
                          ) : (
                            <i className="fa fa-close fa-lg float-left" />
                          )}
                        </td>
                        <td>Setting</td>
                      </tr>
                      <tr>
                        <td>American Express</td>
                        <td>
                          {this.state.paymentMethod.express ? (
                            <i className="fa fa-check fa-lg float-left" />
                          ) : (
                            <i className="fa fa-close fa-lg float-left" />
                          )}
                        </td>
                        <td>Click to Set Up</td>
                      </tr>
                      <tr>
                        <td>Discover Card</td>
                        <td>
                          {this.state.paymentMethod.discoverCard ? (
                            <i className="fa fa-check fa-lg float-left" />
                          ) : (
                            <i className="fa fa-close fa-lg float-left" />
                          )}
                        </td>
                        <td>Setting</td>
                      </tr>
                      <tr>
                        <td>PayPal</td>
                        <td>
                          {this.state.paymentMethod.paypal ? (
                            <i className="fa fa-check fa-lg float-left" />
                          ) : (
                            <i className="fa fa-close fa-lg float-left" />
                          )}
                        </td>
                        <td>Click to Set Up</td>
                      </tr>
                      <tr>
                        <td>Cash</td>
                        <td>
                          {this.state.paymentMethod.cash ? (
                            <i className="fa fa-check fa-lg float-left" />
                          ) : (
                            <i className="fa fa-close fa-lg float-left" />
                          )}
                        </td>
                        <td>Click to Set Up</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs="12" md="8">
              <Card className="card-accent-primary">
                <CardHeader className="text-center">
                  <strong>STORE HOURS</strong>
                </CardHeader>
                <CardBody>
                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th>Week Day</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.storeHours &&
                        this.state.storeHours.map((storehour, index) => {
                          return (
                            <tr key={index}>
                              <td>{storehour.day}</td>
                              <td>
                                {storehour.openTime} ~ {storehour.closeTime}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs="12" md="8">
              <Card className="card-accent-primary">
                <CardHeader className="text-center">
                  <strong>DELIVERY AREAS</strong>
                </CardHeader>
                <CardBody>
                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th>Delivery Time</th>
                        <th>Free Delivery</th>
                        <th>Delivery Price</th>
                        <th>Charged Areas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.deliveryArea &&
                        this.state.deliveryArea.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>{value.deliveryTime}</td>
                              <td>
                                {value.freeDelivery ? (
                                  <i className="fa fa-check fa-lg float-left" />
                                ) : (
                                  <i className="fa fa-close fa-lg float-left" />
                                )}
                              </td>
                              <td>{value.deliveryPrice}</td>
                              <td>
                                {value.zipeCode.map((zip, index) => {
                                  return zip + ",";
                                })}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* <Row>
            <Col xs="12" md="8">
              <Card className="card-accent-primary">
                <CardHeader className="text-center">
                  <strong>DELIVERY AREA</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs="6">
                      <Label>
                        <strong>Dish Title</strong>: Dish Title
                      </Label>
                      <br />
                      <Label>
                        <strong>Category</strong>: Category
                      </Label>
                      <br />
                      <Label>
                        <strong>Description</strong>: Description ...
                      </Label>
                    </Col>
                    <Col xs="6" className="text-center">
                      Product Image
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row> */}
        </CardBody>
        <CardFooter />
      </Card>
    );
  }
}

export default AppSetting;
