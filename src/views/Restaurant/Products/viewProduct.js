import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { Constants } from "../../../constants/environment";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Label,
  Row,
  Table
} from "reactstrap";
//import ProductImage from "../../../public/Resturants/Tel-Aviv/App/Products/Productimage.jpg";
import _ from "lodash";
import Axios from "axios";
import Auth from "../../../cookie/Auth";

class viewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      storename: "",
      storetype: "",
      title: "",
      description: "",
      submitLocation: [],
      dishchoice: "",
      rows: [],
      selectedOption: [],
      imageUrl: "",
      extraIngredients: [],
      category: "",
      enable: false,
      locations: []
    };
  }

  async componentDidMount() {
    var id = this.props.match.params.id;
    var user_id = Auth.getToken("userId");
    await Axios.get(Constants.BASE_URL + `api/store/store-owner/${user_id}`, {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer " + Auth.getToken("token")
      }
    }).then(res => {
      const data = res.data;
      this.setState({
        storename: data[0].storeName,
        storetype: data[0].storetype[0].storeTypeID
      });
    });

    await Axios.get(Constants.BASE_URL + `api/products/${id}`, {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer " + Auth.getToken("token")
      }
    }).then(async res => {
      let products = {};
      products = res.data;
      Axios.get(
        Constants.BASE_URL +
          `api/products/locationforproduct/${this.props.match.params.id}`,
        {
          headers: {
            //"content-type": "application/json",
            Authorization: "Bearer " + Auth.getToken("token")
          }
        }
      ).then(res => {
        let location = [];
        res.data.map((value, index) => {
          location.push(value.location_id);
        });
        products.locationData = location;
        //  let dishchoice = products.variants[Object.keys(products.variants).length-1];
        //  let variants = products.variants.splice(0, Object.keys(products.variants).length-1) ;
        this.setState({
          title: products.title,
          description: products.description,
          submitLocation: products.locationData,
          // dishchoice: dishchoice.dishchoice,
          rows: products.variants,
          selectedOption: products.tags,
          imageUrl: products.imageUrl,
          extraIngredients: products.extraIngredients,
          category: products.category._id,
          enable: products.enable
        });
      });
    });

    await Axios.get(
      Constants.BASE_URL + `api/locations/restaurant/${user_id}`,
      {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      }
    ).then(res => {
      const data = res.data;
      this.setState({
        locations: data
      });
    });
  }

  checked = data => {
    var com = 0;
    this.state.submitLocation.map(id => {
      if (id === data) {
        com = 1;
        return false;
      }
    });
    return com;
  };
  render() {
    var storeID = Auth.getToken("userId");
    return (
      <Card>
        <CardHeader>
          <Row>
            <Col xs="10">
              <h5>
                <i className="fa fa-cutlery fa-lg" /> &nbsp;&nbsp;
                {this.state.title}
                &nbsp;&nbsp;Details
              </h5>
            </Col>
          </Row>
        </CardHeader>

        <CardBody>
          <Row>
            <Col xs="12" md="8">
              <Card className="card-accent-primary">
                <CardHeader className="text-center">
                  <strong>PRODUCT DETAILS</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs="6">
                      <Label>
                        <strong>Dish Title</strong>:{this.state.title}
                      </Label>
                      <br />
                      <Label>
                        {/* <strong>Category</strong>: {this.state.product.category.categoryName} */}
                      </Label>
                      <br />
                      <Label>
                        <strong>Description</strong>: {this.state.description}
                      </Label>
                    </Col>
                    <Col xs="6" className="text-center">
                      <img
                        src={`public/Stores/${this.state.storetype}/${storeID}/App/Products/${this.state.imageUrl}.png`}
                        style={{ width: "20%" }}
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
                  <strong>AVILABLE LOCATIONS</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs="6">
                      {this.state.locations &&
                        this.state.locations.map((value, index) => {
                          return (
                            <div key={index}>
                              <Label>
                                <strong>{value.locationName}</strong>:{" "}
                                {this.checked(value._id) ? (
                                  <Badge color="success">Yes</Badge>
                                ) : (
                                  <Badge color="secondary">No</Badge>
                                )}
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
                  <strong>CHOICES VARIANTS</strong>
                </CardHeader>
                <CardBody>
                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th>Dish Choices</th>
                        <th>Discount</th>
                        <th>Dish Price</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.rows &&
                        this.state.rows.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>{value.dishchoice}</td>
                              <td>{value.discount}%</td>
                              <td>${value.dishprice}</td>
                              <td>
                                ${value.dishprice * (1 - value.discount / 100)}
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
                  <strong>OPTION VARIANTS</strong>
                </CardHeader>
                <CardBody>
                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th>Dish Add-On Option</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.extraIngredients &&
                        this.state.extraIngredients.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>{value.dishOption}</td>
                              <td>${value.dishOptionPrice}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </CardBody>
                <Col xs="2">
                  <Button
                    type="button"
                    size="lg"
                    color="danger"
                    onClick={() => {
                      this.props.history.goBack();
                    }}
                  >
                    <i className="fa fa-ban" /> Back
                  </Button>
                </Col>
              </Card>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default viewProduct;
