import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCategories,
  getAllCategory
} from "../../../redux/actions/categoryActions";
import { getLocations } from "../../../redux/actions/locationAction";
import { getStoreOwner } from "../../../redux/actions/userAction";

import { Constants } from "../../../constants/environment";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import img from "../../../../src/assets/1562792156985.png";
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
import { inherits } from "util";
import Auth from "../../../cookie/Auth";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
      categories: [],
      id: "AllLocation",
      storename: "",
      storetype: ""
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  async componentDidMount() {
    var user_id = Auth.getToken("userId");
    // get all locations per user_id
    await axios
      .get(Constants.BASE_URL + `api/locations/restaurant/${user_id}`, {
        headers: {
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(res => {
        const data = res.data;
        this.setState({
          location: data
        });
      });
    this.props.getLocations();
    this.props.getStoreOwner();
    await axios
      .get(Constants.BASE_URL + `api/store/store-owner/${user_id}`, {
        headers: {
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(async res => {
        const data = await res.data;
        this.setState({
          storename: data[0].storeName,
          storetype: data[0].storetype[0].storeTypeID
        });
      });
    this.props.getAllCategory(this.state.id, this.state.location);
    // await axios.post(Constants.BASE_URL + `api/categories/location/${this.state.id}`, this.state.location)
    // .then(async res=>{
    //   let data = res.data;
    //   let temp = []
    //   for ( var i=0;i<data.length;i++){
    //      let category = data[i]
    //        await axios.get(Constants.BASE_URL + `api/categories/locationforcategory/${category._id}`)
    //     .then(res=>{
    //       category.locationData = res.data

    //     })
    //        await axios.get(Constants.BASE_URL + `api/products/category/${category._id}?store=${user_id}`)
    //    .then(res=>{
    //      category.productData = res.data.length
    //      temp.push(category)
    //    })
    //   }

    //  this.setState({
    //    categories:data
    //  })
    // })
  }

  componentWillReceiveProps(data) {
    this.setState({
      categories: data.categories.categories
    });
  }

  async onChangeValue(e) {
    this.setState({
      id: e.target.value
    });
    let id = e.target.value;
    var user_id = Auth.getToken("userId");
    this.props.getAllCategory(id, this.state.location);
    // await axios.post(Constants.BASE_URL + `api/categories/location/${id}`, this.state.location)
    // .then(async res=>{
    //   let data = res.data;
    //   let temp = []
    //   for ( var i=0;i<data.length;i++){
    //      let category = data[i]
    //        await axios.get(Constants.BASE_URL + `api/categories/locationforcategory/${category._id}`)
    //     .then(res=>{
    //       category.locationData = res.data
    //     })
    //        await axios.get(Constants.BASE_URL + `api/products/category/${category._id}?store=${user_id}`)
    //    .then(res=>{
    //      category.productData = res.data.length;console.log(res.data);
    //      temp.push(category)
    //    })
    //   }
    //   console.log(temp);
    //  this.setState({
    //    categories:data
    //  })

    // })
  }

  render() {
    var categories = this.state.categories;
    categories.sort(function(a, b) {
      return a.sort - b.sort;
    });
    var sub = [];
    var totalCategory = [];
    categories &&
      categories.map((category, index) => {
        if (!category.parent_category) {
          var sub_category = categories.filter(function(value) {
            return value.parent_category == category._id;
          });
          if (sub_category.length != 0) {
            totalCategory.push(category, ...sub_category);
          } else {
            totalCategory.push(category);
          }
        }
      });
    totalCategory &&
      totalCategory.map((category, index) => {
        if (category.parent_category) {
          var parent_category = categories.filter(function(value) {
            return category.parent_category == value._id;
          });
          category.parent = parent_category[0].categoryName;
          if (!sub[parent_category[0]._id]) {
            sub[parent_category[0]._id] = [];
          }
        }
      });
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
                      Categories
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
                      value={this.state.id}
                      onChange={this.onChangeValue}
                    >
                      <option value="AllLocation">All location</option>
                      {this.state.location &&
                        this.state.location.map((data, index) => {
                          return (
                            <option value={data._id} key={index}>
                              {data.locationName}
                            </option>
                          );
                        })}
                    </Input>
                  </Col>
                  <Col xs="5">
                    <Link to="./Categories/addCategory">
                      <button className="float-right btn-pill btn btn-danger btn-lg">
                        + Add Category
                      </button>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive hover size="lg" bordered>
                  <thead>
                    <tr>
                      <th width="22%" scope="col">
                        Category Name
                      </th>
                      <th width="28%" scope="col">
                        Main Image
                      </th>
                      <th width="10%" scope="col">
                        Sort
                      </th>
                      <th width="10%" scope="col">
                        Enable
                      </th>
                      <th width="15%" scope="col">
                        Available Locations
                      </th>
                      <th scope="col">View Category Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {totalCategory &&
                      totalCategory.map((category, index) => (
                        <tr key={index}>
                          <th scope="row">
                            <Link to={`/restaurant/categories/${category._id}`}>
                              {category.parent ? category.parent + " > " : ""}
                              {category.categoryName}
                            </Link>
                          </th>
                          <td
                            style={{
                              textAlign: "center",
                              verticalAlign: "inherit"
                            }}
                          >
                            <Link to={`/restaurant/categories/${category._id}`}>
                              <img
                                src={`public/Stores/${this.state.storetype}/${user_id}/App/Category/${category.imageUrl}.png`}
                                width="150"
                                alt=""
                              />
                            </Link>
                          </td>
                          <td>{category.sort}</td>
                          <td>
                            <AppSwitch
                              className={"mx-1"}
                              variant={"pill"}
                              color={"success"}
                              label
                              checked={category.enable}
                              onChange={() => {
                                axios
                                  .get(
                                    Constants.BASE_URL +
                                      `api/categories/activation/${category._id}`,
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
                                      category.categoryName + " Status Updated!"
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
                                {category.locationData &&
                                  category.locationData.map(
                                    (location, index) => {
                                      return (
                                        <FormGroup key={index}>
                                          {location.location[0] ? (
                                            <i className="fa fa-check fa-lg" />
                                          ) : (
                                            ""
                                          )}
                                          &nbsp;
                                          <Label>
                                            {location.location[0]
                                              ? location.location[0]
                                                  .locationName
                                              : ""}
                                          </Label>
                                        </FormGroup>
                                      );
                                    }
                                  )}
                              </Col>
                            </FormGroup>
                          </td>
                          <td>
                            <Link to="#">
                              {category.productData + " Items in this Category"}{" "}
                            </Link>
                          </td>
                        </tr>
                      ))}
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

// Categories.propTypes = {
//   fetchCategories: PropTypes.func.isRequired,
//   categories: PropTypes.array.isRequired
// };

//get the state from Redux and map it within our component
// const mapStateToProps = state => ({
//   categories: state.categories.items
// });

// export default connect(
//   mapStateToProps,
//   { fetchCategories }
// )(Categories);

function mapStateToProps(state, props) {
  return {
    locations: state.location,
    categories: state.categories,
    storeowner: state.storeowner
  };
}
export default connect(mapStateToProps, {
  getLocations,
  getAllCategory,
  getStoreOwner
})(Categories);
