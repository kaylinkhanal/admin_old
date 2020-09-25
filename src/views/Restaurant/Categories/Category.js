import React, { Component } from "react";
import axios from "axios";
import { toastr } from "react-redux-toastr";
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
  // FormText,
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
import ImgDropCrop from "../../../components/ImgDropCrop";
import { Constants } from "../../../constants/environment";
import { getSingleCategory } from "../../../redux/actions/categoryActions";
import { connect } from "react-redux";
import Avatarcrop from "../../../components/avatarcrop";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName2: false,
      categoryName: null,
      storename: "",
      storetype: "",
      imageUrl: "",
      enable: false,
      sort: "",
      id: null,
      location: [],
      show: true,
      submitLocation: [],
      selectedImage: "",
      parent_category: "",
      categories: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checked = this.checked.bind(this);
    //console.log("Constructor", this.state);
  }
  async componentDidMount() {
    //Called the first time the component is loaded right before the component is added to the page
    // axios
    //   .get(Constants.BASE_URL + `api/categories/${this.props.match.params.id}`)
    //   .then(res => {
    //     //const switchON = (res.data.enable = "enable" ? true : false);
    //     console.log('category_update',res.data)
    //     this.setState({
    //       categoryName: res.data.categoryName,
    //       imageUrl: res.data.imageUrl,
    //       enable: res.data.enable,
    //       sort: res.data.sort
    //     });
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
    var user_id = Auth.getToken("userId");

    await axios
      .get(Constants.BASE_URL + `api/store/store-owner/${user_id}`, {
        headers: {
          //"content-type": "application/json",
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

    await axios
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

    await axios
      .get(
        Constants.BASE_URL + `api/categories/${this.props.match.params.id}`,
        {
          headers: {
            //"content-type": "application/json",
            Authorization: "Bearer " + Auth.getToken("token")
          }
        }
      )
      .then(res => {
        let category = {};
        category = res.data;
        axios
          .get(
            Constants.BASE_URL +
              `api/categories/locationforcategory/${this.props.match.params.id}`,
            {
              headers: {
                //"content-type": "application/json",
                Authorization: "Bearer " + Auth.getToken("token")
              }
            }
          )
          .then(res => {
            let location = [];
            res.data.map((value, index) => {
              location.push(value.location_id);
            });
            category.locationData = location;
            //console.log(category)
            this.setState({
              categoryName: category.categoryName,
              imageUrl: category.imageUrl,
              enable: category.enable,
              sort: category.sort,
              submitLocation: category.locationData,
              parent_category: category.parent_category
            });
          });
      });

    this.props.getSingleCategory(this.props.match.params.id);
  }

  componentWillReceiveProps(data) {
    console.log(data);
  }
  handleChange = event => {
    this.setState({
      categoryName2: true
    });
    const { submitLocation } = this.state;
    if (event.target.id === "loc" && event.target.checked) {
      this.setState({
        submitLocation: [...submitLocation, event.target.value]
      });
      // submitLocation = [...submitLocation, event.target.value];
    } else if (event.target.id === "loc" && !event.target.checked) {
      console.log("checked");

      this.setState({
        submitLocation: submitLocation.filter((val, i) => {
          return event.target.value !== val;
        })
      });
    } else if (event.target.type === "file") {
      this.setState({
        selectedImage: event.target.files[0]
      });
    } else
      this.setState({
        [event.target.name]: event.target.value
      });
  };

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

  handleSubmit = event => {
    event.preventDefault();
    var blankImage =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFIklEQVR4Xu3VsRHAMAzEsHj/pTOBXbB9pFchyLycz0eAwFXgsCFA4C4gEK+DwENAIJ4HAYF4AwSagD9IczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpEQCAjh7ZmExBIczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpEQCAjh7ZmExBIczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpEQCAjh7ZmExBIczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpEQCAjh7ZmExBIczM1IiCQkUNbswkIpLmZGhH4AStUAMmSuOW2AAAAAElFTkSuQmCC";
    var image = document.getElementById("category").value;
    var compareUpdateImage = document.getElementById("update").value;
    var n = document
      .getElementsByClassName("category")[0]
      .getAttribute("value");
    if (
      (typeof compareUpdateImage != "object" && image == blankImage) ||
      image == ""
    ) {
      const { categoryName, sort, enable, submitLocation } = this.state;
      let formData = new FormData();
      var date = new Date();
      var filename = date.getTime();
      var storename = this.state.storename;
      var storetype = this.state.storetype;

      const newCategory = {
        categoryName: categoryName,
        sort: sort,
        enable: enable,
        submitLocation: submitLocation,
        imageUrl: filename,
        parent_category: this.state.parent_category
      };
      delete newCategory["imageUrl"];
      axios
        .post(
          Constants.BASE_URL +
            `api/categories/location/update/${this.props.match.params.id}`,
          newCategory,
          {
            headers: {
              //"content-type": "application/json",
              Authorization: "Bearer " + Auth.getToken("token")
            }
          }
        )
        .then(res => {
          toastr.success("success", "Updated successfully!");
          this.props.history.goBack();
        })
        .catch(err => toastr.error("Please try again!"));
    } else {
      // if(image==blankImage||image=='')
      // {
      //  toastr.warning('Warning', 'Please select image!');
      //  return;
      // }

      const { categoryName, sort, enable, submitLocation } = this.state;
      let formData = new FormData();
      var date = new Date();
      var filename = date.getTime();
      var storename = this.state.storename;
      var storetype = this.state.storetype;
      if (n == "false") {
        image = "";
        filename = "";
      }
      const newCategory = {
        categoryName: categoryName,
        sort: sort,
        enable: enable,
        submitLocation: submitLocation,
        imageUrl: filename,
        parent_category: this.state.parent_category
      };
      formData.append("file", image);
      formData.append("filename", filename);
      formData.append("categoryName", newCategory);
      formData.append("storename", storename);
      formData.append("storetype", storetype);
      formData.append("storeID", Auth.getToken("userId"));

      axios
        .post(Constants.BASE_URL + `api/categories/upload`, formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + Auth.getToken("token")
          }
        })
        .then(res => {
          axios
            .post(
              Constants.BASE_URL +
                `api/categories/location/update/${this.props.match.params.id}`,
              newCategory,
              {
                headers: {
                  //"content-type": "application/json",
                  Authorization: "Bearer " + Auth.getToken("token")
                }
              }
            )
            .then(res => {
              toastr.success("success", "Updated successfully!");
              this.props.history.goBack();
            })
            .catch(err => toastr.error("Please try again!"));
        })
        .catch(err => {
          toastr.error("Please try again!");
        });
    }
  };

  render() {
    var categories = this.state.categories;
    var storeID = Auth.getToken("userId");
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
          //onSubmit={this.handleSubmit}
          // onChange={this.handleChange}
        >
          <CardHeader>
            <Row>
              <Col xs="10">
                <h5>
                  <i className="icon-puzzle" /> Edit Category:{" "}
                  {this.state.categoryName}
                </h5>
              </Col>
              <Col xs="2">
                <AppSwitch
                  className={"mx-1"}
                  variant={"pill"}
                  color={"success"}
                  label
                  name="sortSwitch"
                  checked={this.state.enable}
                  value={(this.state.enable = "true" ? true : false)}
                  {...console.log("sss", this.state.enable)}
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
              <Col xs="8">
                <FormGroup row>
                  <Col xs="3">
                    <Label htmlFor="text-input">Category Name</Label>
                  </Col>
                  <Col xs="9" md="6">
                    <Form
                      className={
                        this.state.categoryName2 ? "was-validated" : ""
                      }
                    >
                      <Input
                        type="text"
                        id="text-input"
                        name="categoryName"
                        placeholder="Text"
                        defaultValue={this.state.categoryName}
                        onChange={this.handleChange}
                        required={true}
                      />
                      <FormFeedback className="help-block">
                        Please enter category name
                      </FormFeedback>
                    </Form>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Sort By - {this.state.sort}</Label>
                  </Col>
                  <Col xs="12" md="6">
                    {/* <Form className=""> */}
                    <Input
                      type="select"
                      name="sort"
                      id="select"
                      onChange={this.handleChange}
                      value={this.state.sort}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </Input>
                    {/* </Form> */}
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
                              checked={this.checked(data._id)}
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
                        value={this.state.parent_category}
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
              <Col xs="4">
                <FormGroup row>
                  {/* <Col className="float-right">
                    <img src={this.state.imageUrl} width="150" alt="" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <Label htmlFor="text-input" />
                    <Input type="file" id="file-input" name="file-input" />
                  </Col> */}
                  {/* <ImgDropCrop /> */}
                  {/* <img src={`${this.state.storetype}/${this.state.storename}/App/Category/${this.state.imageUrl}.png`} style={{width:"50%", marginTop:"20%", display:this.state.selectedImage===""?"block":"none"}}/> */}
                  <Avatarcrop
                    id="category"
                    defaultImage={`public/Stores/${this.state.storetype}/${storeID}/App/Category/${this.state.imageUrl}.png`}
                    previewImage={this.state.imageUrl}
                    size={[250, 250]}
                  />
                </FormGroup>
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
                    this.state.submitLocation.length == 0 ||
                    !this.state.categoryName
                      ? true
                      : false
                  }
                >
                  <i className="fa fa-dot-circle-o" /> Update
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

function mapStateToProps(state, props) {
  return { category: state.category };
}
export default connect(mapStateToProps, { getSingleCategory })(Category);
