import React, { Component } from "react";
import {
  SketchPicker,
  HuePicker,
  BlockPicker,
  PhotoshopPicker
} from "react-color";
import Dropzone from "react-dropzone";
import Auth from "../../../cookie/Auth";
//import ReactAvatarEditor from 'react-avatar-editor';
import { toastr } from "react-redux-toastr";
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
import Avatarcrop from "../../../components/avatarcrop";
import axios from "axios";
import { Constants } from "../../../constants/environment";
import { AppSwitch } from "@coreui/react";

//https://github.com/casesandberg/react-color
//https://casesandberg.github.io/react-color/

class AppTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appTheme: [],
      appColor: "",
      appImage: [],
      about: "",
      storeownerinfo: [],
      storename: "",
      storetype: "",
      appBanner: "",
      enable: false,
      carouselUrl: [],
      user_id: ""
    };
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var user_id = Auth.getToken("userId");
    this.setState({
      user_id: user_id
    });
    axios
      .get(Constants.BASE_URL + `api/store/store-owner/${user_id}`, {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(res => {
        document.documentElement.scrollTop = 0;
        const data = res.data;
        if (data && data.length != 0) {
          var storetype = res.data[0].storetype[0].storeTypeID;
          var storename = res.data[0].storeName;
          this.setState({
            storename: storename,
            storetype: storetype
          });
        }
      });

    axios
      .get(Constants.BASE_URL + `api/settings/${user_id}`, {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(res => {
        if (res.data.appTheme && res.data.appTheme.length != 0) {
          var appTheme = res.data.appTheme[0];
          this.setState({
            appColor: appTheme.appColor,
            appImage: appTheme.appImage,
            about: appTheme.about,
            appBanner: appTheme.appBanner,
            enable: appTheme.enable,
            carouselUrl: appTheme.carouselUrl
          });
        }
      });
  }

  handleColorChange(color) {
    this.setState({
      appColor: color.hex
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    var canvas = document.getElementById("canvas");
  }

  checkvariant(array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == null) {
        return false;
      }
    }
    return true;
  }

  handleSubmit() {
    var user_id = Auth.getToken("userId");
    var blankImage =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFIklEQVR4Xu3VsRHAMAzEsHj/pTOBXbB9pFchyLycz0eAwFXgsCFA4C4gEK+DwENAIJ4HAYF4AwSagD9IczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpEQCAjh7ZmExBIczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpEQCAjh7ZmExBIczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpEQCAjh7ZmExBIczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpEQCAjh7ZmExBIczM1IiCQkUNbswkIpLmZGhH4AStUAMmSuOW2AAAAAElFTkSuQmCC";
    //var canvas = [];
    var carouselUrl = [];
    var data = [];
    var date = new Date();
    var filename = date.getTime();
    var bannerUrl = date.getTime();
    var appBanner = document.getElementById("banner").value;
    var carousel1 = document.getElementById("carousel1").value;
    var carousel2 = document.getElementById("carousel2").value;
    var carousel3 = document.getElementById("carousel3").value;

    var n0 = document.getElementsByClassName("banner")[0].getAttribute("value");
    var n1 = document
      .getElementsByClassName("carousel1")[0]
      .getAttribute("value");
    var n2 = document
      .getElementsByClassName("carousel2")[0]
      .getAttribute("value");
    var n3 = document
      .getElementsByClassName("carousel3")[0]
      .getAttribute("value");

    if (n0 == "false") {
      bannerUrl = "";
      appBanner = "";
    }
    if (n1 == "false") {
      carousel1 = "";
      imageUrl1 = "";
    }
    if (n2 == "false") {
      carousel2 = "";
      imageUrl2 = "";
    }
    if (n3 == "false") {
      carousel3 = "";
      imageUrl3 = "";
    }

    var carouselImage = [];
    var carouselUrl = [];
    var imageUrl1 = filename + "_carousel1";
    var imageUrl2 = filename + "_carousel2";
    var imageUrl3 = filename + "_carousel3";

    if (appBanner == blankImage) {
      appBanner = "";
      bannerUrl = "";
    }
    if (carousel1 == blankImage) {
      carousel1 = "";
      imageUrl1 = "";
    }
    if (carousel2 == blankImage) {
      carousel2 = "";
      imageUrl2 = "";
    }
    if (carousel3 == blankImage) {
      carousel3 = "";
      imageUrl3 = "";
    }
    carouselImage = [carousel1, carousel2, carousel3];

    carouselUrl = [imageUrl1, imageUrl2, imageUrl3];

    if (appBanner == "" && this.state.appBanner == "") {
      var com = false;
    } else {
      var com = true;
    }
    let appTheme = {
      about: this.state.about,
      appColor: this.state.appColor,
      user_id: user_id,
      storename: this.state.storename,
      storetype: this.state.storetype,
      appBanner: appBanner,
      bannerUrl: bannerUrl,
      enable: com ? this.state.enable : false,
      carousel1: carousel1,
      carousel2: carousel2,
      carousel3: carousel3,
      carouselUrl: carouselUrl,
      carouselUrl1: imageUrl1,
      carouselUrl2: imageUrl2,
      carouselUrl3: imageUrl3
    };
    axios
      .post(Constants.BASE_URL + `api/settings/upload`, appTheme, {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(res => {
        toastr.success("success", "Added successfully!");
        window.location.reload();
      })
      .catch(erro => {
        toastr.error("Please try again!");
      });
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <Row>
            <Col xs="11">
              <h5>
                <i className="icon-drop" />
                &nbsp;&nbsp;App Theme
              </h5>
            </Col>
            <Col xs="1"></Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Breadcrumb>
            <BreadcrumbItem>
              <h5>App Color</h5>
            </BreadcrumbItem>
          </Breadcrumb>
          <FormGroup row className="my-0">
            <Col xs="6">
              <FormGroup>
                <HuePicker
                  color={this.state.appColor}
                  onChangeComplete={this.handleColorChange}
                />
                <BlockPicker
                  color={this.state.appColor}
                  onChangeComplete={this.handleColorChange}
                />
              </FormGroup>
            </Col>
            <Col xs="6">
              <Row>
                <Col xs="5">
                  <FormGroup>
                    <Label>
                      <strong>App Banner(350 Width * 175 Height)</strong>
                    </Label>
                    {/* <ImgDropCrop style={{ width:"350px", height:"175px"}} id='banner'/> */}
                    <div>
                      <Avatarcrop
                        id="banner"
                        //defaultImage={`public/Stores/${this.state.storetype}/${this.state.storename}/App/Carousel/${this.state.appBanner}.png`}
                        defaultImage={`public/Stores/${this.state.storetype}/${this.state.user_id}/App/Carousel/${this.state.appBanner}.png`}
                        previewImage={this.state.appBanner}
                        size={[350, 175]}
                      />
                      {/* {this.state.storetype+'/'+this.state.storename+'/App/Carousel/'+this.state.appBanner+'png'} */}
                    </div>
                  </FormGroup>
                </Col>
                <Col xs="5">
                  <AppSwitch
                    className={"mx-1"}
                    variant={"pill"}
                    color={"success"}
                    label
                    checked={this.state.enable}
                    name="enable"
                    onChange={() => {
                      axios
                        .get(
                          Constants.BASE_URL +
                            `api/settings/activation/${this.state.user_id}`,
                          {
                            headers: {
                              //"content-type": "application/json",
                              Authorization: "Bearer " + Auth.getToken("token")
                            }
                          }
                        )
                        .then(res => {
                          toastr.success(
                            "Success",
                            "App Banner Status Updated!"
                          );
                        })
                        .catch(err => {
                          toastr.warning("Warning", "Please Try again!");
                        });
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </FormGroup>

          <Breadcrumb>
            <BreadcrumbItem>
              <h5>App Carousel</h5>
            </BreadcrumbItem>
          </Breadcrumb>
          <FormGroup row className="my-0" className="text-center">
            <Col xs="4">
              <FormGroup>
                <Label>
                  <strong>Image 1 (430 x 230)</strong>
                </Label>

                {/* <ImgDropCrop style={{ width:"430px", height:"230px"}} id="carousel"/> */}
                {/* {this.state.carouselUrl&&this.state.carouselUrl.length!=0
                ? <img src={`${this.state.storetype}/${this.state.storename}/App/Carousel/${this.state.carouselUrl[0]}.png`} width="150" alt="" />:""
                } */}
                <Avatarcrop
                  id="carousel1"
                  defaultImage={`public/Stores/${this.state.storetype}/${this.state.user_id}/App/Carousel/${this.state.carouselUrl[0]}.png`}
                  previewImage={this.state.carouselUrl[0]}
                  size={[420, 230]}
                />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <Label>
                  <strong>Image 2 (430 x 230)</strong>
                </Label>
                {/* <ImgDropCrop style={{ width:"430px", height:"230px"}} id="carousel"/> */}
                {/* {this.state.carouselUrl&&this.state.carouselUrl.length!=0
                ? <img src={`${this.state.storetype}/${this.state.storename}/App/Carousel/${this.state.carouselUrl[1]}.png`} width="150" alt="" />:""
                } */}
                <Avatarcrop
                  id="carousel2"
                  defaultImage={`public/Stores/${this.state.storetype}/${this.state.user_id}/App/Carousel/${this.state.carouselUrl[1]}.png`}
                  previewImage={this.state.carouselUrl[1]}
                  size={[420, 230]}
                />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <Label>
                  <strong>Image 3 (430 x 230)</strong>
                </Label>
                {/* <ImgDropCrop style={{ width:"430px", height:"230px"}} id="carousel"/> */}
                {/* {this.state.carouselUrl&&this.state.carouselUrl.length!=0
                ? <img src={`${this.state.storetype}/${this.state.storename}/App/Carousel/${this.state.carouselUrl[2]}.png`} width="150" alt="" />:""
                } */}
                <Avatarcrop
                  id="carousel3"
                  defaultImage={`public/Stores/${this.state.storetype}/${this.state.user_id}/App/Carousel/${this.state.carouselUrl[2]}.png`}
                  previewImage={this.state.carouselUrl[2]}
                  size={[420, 230]}
                />
              </FormGroup>
            </Col>
          </FormGroup>
          <Breadcrumb>
            <BreadcrumbItem>
              <h5>About Us</h5>
            </BreadcrumbItem>
          </Breadcrumb>
          <FormGroup row className="my-0">
            <Col xs="8">
              <FormGroup>
                <Input
                  type="textarea"
                  name="about"
                  id="textarea-input"
                  rows="4"
                  value={this.state.about}
                  onChange={this.handleChange}
                  placeholder="About us..."
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
              >
                <i className="fa fa-dot-circle-o" /> Update
              </Button>
            </Col>
            <Col xs="2">
              <Button type="cancel" size="lg" color="danger">
                <i className="fa fa-ban" /> Cancel
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}
export default AppTheme;
