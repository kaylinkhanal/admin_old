import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Constants } from "../../../constants/environment";
import { toastr } from "react-redux-toastr";
import Auth from "../../../cookie/Auth";
import { getLocations } from "../../../redux/actions/locationAction";
import { getAllProduct } from "../../../redux/actions/productActions";
import { connect } from "react-redux";
import {
  Input,
  FormGroup,
  Label,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  CardFooter
} from "reactstrap";
import { AppSwitch } from "@coreui/react";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      location: [],
      id: "",
      storetype: "",
      storename: "",
      productLocation: []
    };
    this.onChangeValue = this.onChangeValue.bind(this);
    this.checked = this.checked.bind(this);
    this.printName = this.printName.bind(this);
  }

  componentDidMount() {
    //this.props.getAllProduct(this.state.id);
    var user_id = Auth.getToken("userId");
    //console.log(Auth.getToken("token"));
    //console.log(Auth.getToken("userId"));
    // this.props.getLocations();
    axios
      .get(Constants.BASE_URL + `api/locations/restaurant/${user_id}`, {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(res => {
        const data = res.data;
        this.setState({
          location: data
        });
      });

    axios
      .get(Constants.BASE_URL + `api/store/store-owner/${user_id}`, {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(async res => {
        const data = res.data;
        if (data.length != 0) {
          this.setState({
            storename: data[0].storeName,
            storetype: data[0].storetype[0].storeTypeID
          });
        }
      });
    //  this.props.getAllProduct(this.state.id);

    axios
      .get(
        Constants.BASE_URL +
          `api/products?location=${this.state.id}&store=${user_id}`,
        {
          headers: {
            //"content-type": "application/json",
            Authorization: "Bearer " + Auth.getToken("token")
          }
        }
      )
      .then(res => {
        console.log(res.data);
        if (res.data.length != 0) {
          var locationData = [];
          var productLocation = res.data.data;
          productLocation.map((product, index) => {
            locationData[product._id] = product;
          });
          this.setState({
            products: res.data.product,
            productLocation: locationData
          });
        }
      })
      .catch(err => console.log(err));
  }

  // componentWillReceiveProps(data){
  //   console.log(data);

  //   this.setState({
  //     products: data.products.products
  //   })

  // }
  async onChangeValue(e) {
    var user_id = Auth.getToken("userId");
    var id = e.target.value;
    this.setState({
      id: id
    });
    //this.props.getAllProduct(this.state.id);console.log(this.props  )
    await axios
      .get(
        Constants.BASE_URL + `api/products?location=${id}&store=${user_id}`,
        {
          headers: {
            //"content-type": "application/json",
            Authorization: "Bearer " + Auth.getToken("token")
          }
        }
      )
      .then(res => {
        if (res.data.length != 0) {
          var locationData = [];
          var productLocation = res.data.data;
          productLocation.map((product, index) => {
            locationData[product._id] = product;
          });
          this.setState({
            products: res.data.product,
            productLocation: locationData
          });
        }
      })
      .catch(err => console.log(err));
  }

  checked = data => {
    var com = 0;
    this.state.location.map(id => {
      if (id._id === data) {
        com = 1;
        return false;
      }
    });
    return com;
  };

  printName = id => {
    var location = this.state.location.filter(function(value) {
      return value._id == id;
    });
    return location[0].locationName;
  };
  render() {
    let { products } = this.state;
    var user_id = Auth.getToken("userId");
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="3">
                    <h5>
                      <i className="icon-puzzle" /> {this.state.storename}{" "}
                      Products
                    </h5>
                  </Col>
                  <Col xs="4">
                    <Label htmlFor="FilterLocation">
                      <h5>Filter by Location</h5>
                    </Label>
                    <Input
                      type="select"
                      name="location"
                      id="location"
                      onChange={this.onChangeValue}
                      value={this.state.id}
                    >
                      <option value="">All Locations</option>
                      {this.state.location &&
                        this.state.location.map((location, index) => {
                          return (
                            <option value={location._id} key={index}>
                              {location.locationName}
                            </option>
                          );
                        })}
                    </Input>
                  </Col>
                  <Col xs="5">
                    <Link to="./Products/addProduct">
                      <button className="float-right btn-pill btn btn-danger btn-lg">
                        + Add Product
                      </button>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive hover size="lg">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Brand</th>
                      <th>Edit</th>
                      <th>Enable/Disable</th>
                      <th>Available Locations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.products &&
                      this.state.products.map((product, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <Link
                                to={"./Products/viewProduct/" + product._id}
                              >
                                {product.title}
                              </Link>
                              {/* {product.title} */}
                            </td>
                            <td>
                              <img
                                src={`public/Stores/${this.state.storetype}/${user_id}/App/Products/${product.imageUrl}.png`}
                                width="80"
                                alt=""
                              />
                            </td>
                            <td>
                              <Link
                                to={"./Products/editProduct/" + product._id}
                              >
                                <i className="icon-note" />
                              </Link>
                            </td>
                            <td>
                              <AppSwitch
                                className={"mx-1"}
                                variant={"pill"}
                                color={"success"}
                                label
                                checked={product.enable}
                                onChange={() => {
                                  axios
                                    .get(
                                      Constants.BASE_URL +
                                        `api/products/activation/${product._id}`,
                                      {
                                        headers: {
                                          //"content-type": "application/json",
                                          Authorization:
                                            "Bearer " + Auth.getToken("token")
                                        }
                                      }
                                    )
                                    .then(res => {
                                      toastr.success(
                                        "Success",
                                        product.title + " status Updated!"
                                      );
                                    })
                                    .catch(err => {
                                      toastr.warning(
                                        "Warning",
                                        "Please Try again!"
                                      );
                                    });
                                }}
                              />
                            </td>
                            <td>
                              <FormGroup row>
                                <Col md="9">
                                  {this.state.productLocation[product._id]
                                    .location_id &&
                                    this.state.productLocation[
                                      product._id
                                    ].location_id.map(value => {
                                      return (
                                        <FormGroup key={value}>
                                          {this.checked(value) ? (
                                            <i className="fa fa-check fa-lg" />
                                          ) : (
                                            ""
                                          )}
                                          &nbsp;
                                          <Label>
                                            {this.checked(value)
                                              ? this.printName(value)
                                              : ""}
                                          </Label>
                                        </FormGroup>
                                      );
                                    })}
                                </Col>
                              </FormGroup>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem disabled>
                      <PaginationLink previous tag="button" />
                    </PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">5</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink next tag="button" />
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
              <CardFooter />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    locations: state.location,
    //  categories: state.categories,
    storeowner: state.storeowner,
    products: state.products
  };
}
export default connect(mapStateToProps, { getLocations, getAllProduct })(
  Products
);
