import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { Link } from "react-router-dom";
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
  //FormText,
  FormFeedback,
  Input,
  // InputGroup,
  // InputGroupAddon,
  // InputGroupText,
  Label,
  Row
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
import _ from "lodash";

import { createCategory } from "../../../redux/actions/categoryActions";
// import ImgDropCrop from "../../../components/ImgDropCrop";
import axios from "axios";
import { Constants } from "../../../constants/environment";
import Avatarcrop from "../../../components/avatarcrop";

class addCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeownerinfo: [],
      categoryName: null,
      imageUrl: [],
      selectedImage: "",
      enable: true,
      sort: 1,
      location: [],
      submitLocation: [],
      categories: [],
      parent_category: "",
      src: null,
      crop: {
        unit: "%",
        width: 30,
        aspect: 16 / 9
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //console.log("Constructor", this.state);
  }
  componentDidMount() {
    var user_id = Auth.getToken("userId");

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
        axios
          .post(
            Constants.BASE_URL + `api/categories/location/AllLocation`,
            data,
            {
              headers: {
                //"content-type": "application/json",
                Authorization: "Bearer " + Auth.getToken("token")
              }
            }
          )
          .then(res => {
            let data = res.data;
            this.setState({
              categories: data
            });
          });
      });

    axios
      .get(Constants.BASE_URL + `api/store/store-owner/${user_id}`, {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(res => {
        const data = res.data;
        this.setState({
          storeownerinfo: data
        });
      });
  }

  handleChange = event => {
    const { submitLocation } = this.state;
    if (event.target.id === "loc" && event.target.checked) {
      this.setState({
        submitLocation: [...submitLocation, event.target.value]
      });
      // submitLocation = [...submitLocation, event.target.value];
    } else if (event.target.id === "loc" && !event.target.checked) {
      this.setState({
        submitLocation: submitLocation.filter((val, i) => {
          return event.target.value !== val;
        })
      });
    }
    // else if(event.target.type === "file"){
    //   this.setState({
    //     selectedImage:event.target.files[0]
    //   })
    //   console.log(event.target.files[0])
    // }
    else
      this.setState({
        [event.target.name]: event.target.value
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    var blankImage =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFIklEQVR4Xu3VsRHAMAzEsHj/pTOBXbB9pFchyLycz0eAwFXgsCFA4C4gEK+DwENAIJ4HAYF4AwSagD9IczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpEQCAjh7ZmExBIczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpEQCAjh7ZmExBIczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpEQCAjh7ZmExBIczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpEQCAjh7ZmExBIczM1IiCQkUNbswkIpLmZGhH4AStUAMmSuOW2AAAAAElFTkSuQmCC";
    var blankImage1 =
      "data:image/png;base64,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";
    var image = document.getElementById("category").value;
    if (image === blankImage || image === "" || image === blankImage1) {
      toastr.warning("Warning", "Please select image!");
      return;
    }
    const {
      categoryName,
      sort,
      enable,
      submitLocation,
      selectedImage
    } = this.state;
    let formData = new FormData();
    var date = new Date();
    var filename = date.getTime();
    var storetype = this.state.storeownerinfo[0].storetype[0].storeTypeID;
    var storename = this.state.storeownerinfo[0].storeName;
    var storeID = this.state.storeownerinfo[0].user_id;
    const newCategory = {
      categoryName: categoryName,
      sort: sort,
      enable: enable,
      submitLocation: submitLocation,
      imageUrl: filename,
      restaurantID: Auth.getToken("userId"),
      parent_category: this.state.parent_category
    };
    // formData.append('file', canvas);
    formData.append("file", image);
    formData.append("filename", filename);
    formData.append("categoryName", newCategory);
    formData.append("storetype", storetype);
    formData.append("storename", storename);
    formData.append("storeID", storeID);
    axios
      .post(Constants.BASE_URL + `api/categories/upload`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(res => {
        if (res.data == "") {
          toastr.warning("Warning", "Please select image!");
          return;
        }
        axios
          .post(Constants.BASE_URL + `api/categories/location`, newCategory, {
            headers: {
              //"content-type": "application/json",
              Authorization: "Bearer " + Auth.getToken("token")
            }
          })
          .then(res => {
            toastr.success("success", "Added successfully!");
            this.props.history.goBack();
          })
          .catch(err => toastr.error("Please try again!"));
      })
      .catch(err => toastr.warning("Warning", "Please select image!"));
    console.log("pppp", newCategory);
  };

  //-------------------------------------------------------------

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
    return (
      <Card>
        <Form
          action=""
          method="post"
          encType="multipart/form-data"
          className="form-horizontal"
          // onSubmit={this.handleSubmit}
          // onChange={this.handleChange}
        >
          <CardHeader>
            <Row>
              <Col xs="10">
                <h5>
                  <i className="icon-puzzle" /> Add New Category
                </h5>
              </Col>
              <Col xs="2">
                <AppSwitch
                  className={"mx-1"}
                  variant={"pill"}
                  color={"success"}
                  label
                  checked={this.state.enable}
                  onChange={() => {
                    this.setState({
                      enable: !this.state.enable
                    });
                  }}
                />
              </Col>
            </Row>
          </CardHeader>

          <CardBody>
            <FormGroup row>
              <Col xs="7">
                <FormGroup row>
                  <Col xs="3">
                    <Label htmlFor="text-input">Category Name</Label>
                  </Col>
                  <Col xs="9" md="6">
                    <Form
                      className={
                        this.state.categoryName != null ? "was-validated" : ""
                      }
                    >
                      <FormGroup>
                        <Input
                          type="text"
                          id="text-input"
                          name="categoryName"
                          placeholder="Title"
                          defaultValue={this.state.categoryName}
                          onChange={this.handleChange}
                          required={
                            this.state.categoryName === "" ? true : false
                          }
                        />
                        <FormFeedback className="help-block">
                          Please enter category name
                        </FormFeedback>
                      </FormGroup>
                    </Form>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Sort By - {this.state.sort}</Label>
                  </Col>
                  <Col xs="12" md="6">
                    <Form className="">
                      <Input
                        type="select"
                        name="sort"
                        id="select"
                        onChange={this.handleChange}
                        value={this.state.sort}
                        required={true}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </Input>
                      <FormFeedback className="help-block">
                        Please provide a valid information
                      </FormFeedback>
                      <FormFeedback valid className="help-block">
                        Input provided
                      </FormFeedback>
                    </Form>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Locations</Label>
                  </Col>
                  <Col md="9">
                    {this.state.location &&
                      this.state.location.map((data, index) => {
                        return (
                          <FormGroup check className="checkbox" key={index}>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              id={"loc"}
                              name={data.locationName}
                              value={data._id}
                              //checked={true}
                              onChange={this.handleChange}
                            />
                            <Label
                              check
                              className="form-check-label"
                              htmlFor="checkbox1"
                            >
                              {data.locationName}
                            </Label>
                          </FormGroup>
                        );
                      })}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Parent category</Label>
                  </Col>
                  <Col xs="12" md="6">
                    <Form className="">
                      <Input
                        type="select"
                        name={"parent_category"}
                        id="parentCategory"
                        onChange={this.handleChange}
                      >
                        <option value="">No parent</option>
                        {totalCategory &&
                          totalCategory.map((parentCategory, index) => {
                            return (
                              <option key={index} value={parentCategory._id}>
                                {parentCategory.parent
                                  ? parentCategory.parent + " > "
                                  : ""}
                                {parentCategory.categoryName}
                              </option>
                            );
                          })}
                      </Input>
                    </Form>
                  </Col>
                </FormGroup>
              </Col>
              <Col xs="5">
                <FormGroup row>
                  <Col md="12">
                    {/* <ImgDropCrop /> */}
                    <Input
                      type="hidden"
                      name="canvas"
                      value=""
                      id="hidden_data"
                    />
                    <Avatarcrop id="category" size={[250, 250]} />
                  </Col>
                </FormGroup>
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
                  onClick={this.handleSubmit}
                  disabled={
                    this.state.submitLocation.length == 0 ||
                    !this.state.categoryName
                      ? true
                      : false
                  }
                >
                  <i className="fa fa-dot-circle-o" /> Create
                </Button>
              </Col>
              <Col xs="2">
                <Button
                  type="button"
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
        </Form>
      </Card>
    );
  }
}

addCategory.propTypes = {
  createCategory: PropTypes.func.isRequired
  //newCategory: PropTypes.object
};

// const mapStateToProps = state => ({
//   newCategory: state.categories.item
// });

export default connect(null, { createCategory })(addCategory);
