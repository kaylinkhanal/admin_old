import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  MDBSelect,
  MDBDataTable,
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Row,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import Multiselect from "multiselect-dropdown-react";
import { AppSwitch } from "@coreui/react";
import _ from "lodash";
import axios from "axios";
import { createCategory } from "../../../redux/actions/categoryActions";
import ImgDropCrop from "../../../components/ImgDropCrop";
import { toastr } from "react-redux-toastr";
import { Constants } from "../../../constants/environment";
import Auth from "../../../cookie/Auth";
import MultiSelectReact from "multi-select-react";
import Select from "react-select";
import Avatarcrop from "../../../components/avatarcrop";
import { Picky } from "react-picky";
import "react-picky/dist/picky.css"; // Include CSS

class addProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DeleteChoices: false,
      storeownerinfo: [],
      DeleteOption: false,
      categories: [],
      locations: [],
      tags: [],
      submitLocation: [],
      category: "",
      selectedImage: "",
      tag: [],
      imageUrl: "",
      dishName: null,
      dishDescription: null,
      enable: true,
      multiSelect: [],
      varients: [],
      varientsElement: [],
      dishchoice: null,
      rows: [
        {
          dishchoice: "",
          discount: "0",
          dishprice: "",
          defaultVariant: "radio"
        }
      ],

      extraIngredients: [
        // {dishOption: '', dishOptionPrice: ''}
      ],

      selectedOption: "",
      deleteIndex: "",
      deleteDishchoice: false,
      AddOnOptions: [],
      choices: [],
      globalOptions: [],
      addonoptionData: [],
      values: [],
      data: [],
      AddOnOptionsSave: []
    };
    this.toggleDeleteChoices = this.toggleDeleteChoices.bind(this);
    this.toggleDeleteOption = this.toggleDeleteOption.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.multiHandleChange = this.multiHandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteRows = this.deleteRows.bind(this);
    this.deleteExtraIngredients = this.deleteExtraIngredients.bind(this);
    this.changeExtraIntegredients = this.changeExtraIntegredients.bind(this);
  }

  async componentDidMount() {
    var user_id = Auth.getToken("userId");
    await axios
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

    await axios
      .get(Constants.BASE_URL + "api/dishoption/global/options", {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(res => {
        if (res.data) {
          console.log(res.data);
          this.setState({
            globalOptions: res.data
          });
        }
      });

    await axios
      .get(Constants.BASE_URL + "api/choice?store=" + user_id, {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(res => {
        if (res.data.length != 0) {
          this.setState({
            choices: res.data
          });
          // var options = res.data[0].ChoiceOptions;
          // var { rows } = this.state;
          // rows = [];

          // options.map((option, index)=> {
          //   if(option==res.data[0].enableChoice){
          //     rows.push({dishchoice: option, discount: '0', dishprice: '' ,defaultVariant: option==res.data[0].enableChoice?'radio':''})
          //   }

          // })
          // options.map((option, index)=> {
          //   if(option!=res.data[0].enableChoice){
          //   rows.push({dishchoice: option, discount: '0', dishprice: '' ,defaultVariant: option==res.data[0].enableChoice?'radio':''})
          // }
          // })

          // this.setState({
          //   rows
          // })
        }
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
          locations: data
        });
      });
    await axios
      .post(
        Constants.BASE_URL + `api/categories/location/AllLocation`,
        this.state.locations,
        {
          headers: {
            //"content-type": "application/json",
            Authorization: "Bearer " + Auth.getToken("token")
          }
        }
      )
      .then(res => {
        this.setState({
          categories: res.data
        });
      });

    await axios
      .get(Constants.BASE_URL + `api/tags/product/data?store=${user_id}`, {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(res => {
        var data = {};

        this.setState({
          tags: res.data
        });
      });

    await axios
      .get(Constants.BASE_URL + "api/dishoption/store/" + user_id, {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(res => {
        this.setState({
          AddOnOptions: res.data
        });
        var user_id = Auth.getToken("userId");
        var { globalOptions } = this.state;
        globalOptions.map((option, index) => {
          if (option.store_id && option.store_id == user_id) {
            globalOptions.splice(index, 1);
          }
        });
        var storeOptions = this.state.AddOnOptions;
        var AddOnOptions = [];
        AddOnOptions.push(...globalOptions, ...storeOptions);
        var { data } = this.state;
        AddOnOptions.map((option, index) => {
          data.push({ name: option.optionName, value: option.optionName });
        });
        this.setState({
          data
        });
        this.setState({
          AddOnOptionsSave: AddOnOptions
        });
      });
  }

  toggleDeleteChoices(e) {
    if (e.target.value == undefined) {
      if (e.target.parentElement.name == "dishchoice") {
        this.setState({ deleteDishchoice: true });
      }
      this.setState({ deleteIndex: e.target.parentElement.value });
    } else {
      if (e.target.name == "dishchoice") {
        this.setState({ deleteDishchoice: true });
      }
      this.setState({ deleteIndex: e.target.value });
    }

    let { DeleteChoices } = this.state;
    this.setState({
      DeleteChoices: !DeleteChoices
    });
  }

  toggleDeleteOption(e) {
    if (e.target.value == undefined) {
      this.setState({ deleteIndex: e.target.parentElement.value });
    } else {
      this.setState({ deleteIndex: e.target.value });
    }

    let { DeleteOption } = this.state;
    this.setState({
      DeleteOption: !DeleteOption
    });
  }

  handleChange = event => {
    const { submitLocation } = this.state;
    if (event.target.id === "loc" && event.target.checked) {
      this.setState({
        submitLocation: [...submitLocation, event.target.value]
      });
    } else if (event.target.id === "loc" && !event.target.checked) {
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

  multiHandleChange = e => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ multiSelect: value });
  };

  updateValue = (e, idx) => {
    let { rows } = this.state;
    if (e.target.name === "defaultVariant") {
      rows.map((value, index) => {
        value["defaultVariant"] = "";
      });
      rows[idx][e.target.name] = "radio";
    } else {
      rows[idx][e.target.name] = e.target.value;
    }

    this.setState({
      rows
    });
  };

  checkvariant(array) {
    for (var i = 0; i < array.length; i++) {
      if (
        array[i].discount == "" ||
        array[i].dishprice == "" ||
        array[i].dishchoice == ""
      ) {
        return false;
      }
    }
    return true;
  }

  checkextraIngredients(array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].dishOption == "" || array[i].dishOptionPrice == "") {
        return false;
      }
    }
    return true;
  }

  handleSubmit = event => {
    event.preventDefault();
    if (!this.checkvariant(this.state.rows)) {
      toastr.error("Please enter varient items!");
      return;
    }
    var blankImage =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFIklEQVR4Xu3VsRHAMAzEsHj/pTOBXbB9pFchyLycz0eAwFXgsCFA4C4gEK+DwENAIJ4HAYF4AwSagD9IczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpEQCAjh7ZmExBIczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpEQCAjh7ZmExBIczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpEQCAjh7ZmExBIczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpEQCAjh7ZmExBIczM1IiCQkUNbswkIpLmZGhH4AStUAMmSuOW2AAAAAElFTkSuQmCC";
    var productImage = document.getElementById("product").value;
    // var canvas = document.getElementById('canvas');
    if (productImage == blankImage || productImage == "") {
      toastr.warning("Warning", "Please select image!");
      return;
    }

    var { extraIngredients } = this.state;
    var { AddOnOptionsSave } = this.state;
    var extraFilter = [];
    for (var i = 0; i < extraIngredients.length; i++) {
      var rr = true;
      for (var j = 0; j < AddOnOptionsSave.length; j++) {
        if (extraIngredients[i].dishOption == AddOnOptionsSave[j].optionName) {
          rr = false;
          break;
        }
      }
      if (rr) {
        extraFilter.push(extraIngredients[i]);
      }
    }
    var user_id = Auth.getToken("userId");
    if (extraFilter.length != 0) {
      extraFilter.map((extra, index) => {
        var submitData = {
          restaurantID: this.state.storeownerinfo[0].store_type_id,
          optionName: extra.dishOption,
          price: extra.dishOptionPrice,
          store_id: user_id
        };

        axios
          .post(Constants.BASE_URL + `api/dishoption/`, submitData, {
            headers: {
              //"content-type": "application/json",
              Authorization: "Bearer " + Auth.getToken("token")
            }
          })
          .then(res => {
            console.log("success");
          });
      });
    }

    // if(ll){
    //   toastr.error('Please enter Dish Add-On option items!');
    //   return;
    // }
    //  if(canvas == null||canvas.width==300||canvas.width==0)
    //  {console.log(canvas);
    //   toastr.warning('Warning', 'Please select image!');
    //   return;
    //  }
    // canvas = canvas.toDataURL('image/png');
    var date = new Date();
    var filename = date.getTime();
    var storetype = this.state.storeownerinfo[0].storetype[0].storeTypeID;
    var storename = this.state.storeownerinfo[0].storeName;
    let { rows } = this.state;
    const newProduct = {
      title: this.state.dishName,
      category: this.state.category,
      description: this.state.dishDescription,
      imageUrl: filename,
      tags: this.state.selectedOption,
      location: this.state.submitLocation,
      enable: this.state.enable,
      variants: rows,
      extraIngredients: this.state.extraIngredients
    };
    const { selectedImage } = this.state;
    let formdata = new FormData();
    formdata.append("file", productImage);
    formdata.append("filename", filename);
    formdata.append("storetype", storetype);
    formdata.append("storename", storename);
    formdata.append("storeID", user_id);
    axios
      .post(Constants.BASE_URL + `api/products/`, newProduct, {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(res => {
        if (res.data)
          axios
            .post(Constants.BASE_URL + `api/products/upload`, formdata, {
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
              toastr.success("success", "Added successfully!");
              this.props.history.goBack();
            })
            .catch(err => {
              toastr.error("Please try again!");
            });
      })
      .catch(err => {
        toastr.error("Please try again!");
      });
  };

  addRow = () => {
    if (!this.checkvariant(this.state.rows)) {
      toastr.error("Please enter varient items!");
      return;
    }
    const { choices } = this.state;
    var dishchoice = choices[0].enableChoice;
    const rows = [
      ...this.state.rows,
      {
        discount: "0",
        dishprice: "",
        dishchoice: dishchoice,
        defaultVariant: ""
      }
    ];
    this.setState({
      rows
    });
  };

  deleteRows = () => {
    let { rows } = this.state;
    let { deleteIndex } = this.state;
    let { DeleteChoices } = this.state;
    let { deleteDishchoice } = this.state;
    if (deleteDishchoice) {
      delete rows[deleteIndex]["dishchoice"];
      this.setState({ rows });
    } else {
      rows = rows.filter(function(value, index) {
        return index != deleteIndex;
      });
      //rows.pop();
      this.setState({ rows });
    }

    this.setState({
      DeleteChoices: !DeleteChoices
    });
  };
  addExtraIngredients = () => {
    var { addonoptionData } = this.state;
    if (addonoptionData.length == 0) {
      if (!this.checkextraIngredients(this.state.extraIngredients)) {
        toastr.error("Please enter Dish Add-On option items!");
        return;
      }
      const extraIngredients = [
        ...this.state.extraIngredients,
        { dishOption: "", dishOptionPrice: "" }
      ];
      this.setState({ extraIngredients });
      this.setState({
        addonoptionData: []
      });
    } else {
      var { extraIngredients } = this.state;
      extraIngredients = addonoptionData;
      this.setState({
        extraIngredients
      });
    }
  };

  deleteExtraIngredients = () => {
    let { extraIngredients } = this.state;
    let { deleteIndex } = this.state;
    let { DeleteOption } = this.state;
    extraIngredients = extraIngredients.filter(function(value, index) {
      return index != deleteIndex;
    });
    this.setState({
      extraIngredients
    });

    this.setState({
      DeleteOption: !DeleteOption
    });
  };

  changeExtraIntegredients = (e, index) => {
    let { extraIngredients } = this.state;
    extraIngredients[index][e.target.name] = e.target.value;
    this.setState({
      extraIngredients
    });
  };

  //material
  handleChang = selectedOption => {
    this.setState({ selectedOption });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`);
    }
  };

  choiceChange(e) {
    var id = e.target.value;
    var { choices } = this.state;

    // {dishchoice:'', discount: '0', dishprice: '', defaultVariant: 'radio'}
    if (id == "") {
      var { rows } = this.state;
      rows = [
        {
          dishchoice: "",
          discount: "0",
          dishprice: "",
          defaultVariant: "radio"
        }
      ];
      this.setState({
        rows
      });
    } else {
      var choiceOptions = choices[id].ChoiceOptions;
      if (choiceOptions.length != 0) {
        var { rows } = this.state;
        rows = [];

        choiceOptions.map((option, index) => {
          if (option == choices[id].enableChoice) {
            rows.push({
              dishchoice: option,
              discount: "0",
              dishprice: "",
              defaultVariant: "radio"
            });
          }
        });

        choiceOptions.map((option, index) => {
          if (option != choices[id].enableChoice) {
            rows.push({
              dishchoice: option,
              discount: "0",
              dishprice: "",
              defaultVariant: option == choices[id].enableChoice ? "radio" : ""
            });
          }
        });
        this.setState({
          rows
        });
      }
    }
  }

  AddOnOptionChange = values => {
    var { AddOnOptionsSave } = this.state;

    var data = [];
    if (values.length != 0) {
      values.map((value, index) => {
        AddOnOptionsSave.map((option, index) => {
          if (value == option.optionName) {
            data.push({
              dishOption: option.optionName,
              dishOptionPrice: option.price
            });
          }
        });
      });
    }

    var { extraIngredients } = this.state;
    var extraFilter = [];
    for (var i = 0; i < extraIngredients.length; i++) {
      var rr = true;
      for (var j = 0; j < AddOnOptionsSave.length; j++) {
        if (extraIngredients[i].dishOption == AddOnOptionsSave[j].optionName) {
          rr = false;
          break;
        }
      }
      if (rr) {
        extraFilter.push(extraIngredients[i]);
      }
    }

    extraIngredients = [...extraFilter, ...data];
    var uniq = {};
    extraIngredients = extraIngredients.filter(
      obj => !uniq[obj.dishOption] && (uniq[obj.dishOption] = true)
    );

    this.setState({
      extraIngredients
    });
  };

  render() {
    const { selectedOption } = this.state;
    let options = [];
    this.state.tags.map((value, index) => {
      options[index] = { value: value._id, label: value.tag };
    });

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
    var globalOptions = this.state.globalOptions;
    globalOptions.map((option, index) => {
      if (option.store_id && option.store_id == user_id) {
        globalOptions.splice(index, 1);
      }
    });

    var storeOptions = this.state.AddOnOptions;
    var AddOnOptions = [];

    AddOnOptions.push(...globalOptions, ...storeOptions);
    var data = [];
    AddOnOptions.map((option, index) => {
      data.push({ name: option.optionName, value: option.optionName });
    });

    var { extraIngredients } = this.state;
    var rows = [];

    extraIngredients.map((data, index) => {
      rows.push({
        "Add-One Name": (
          <Input
            type="text"
            id="dishName"
            name="dishOption"
            placeholder="Extra Bread"
            value={data.dishOption}
            onChange={e => this.changeExtraIntegredients(e, index)}
          />
        ),
        price: (
          <Input
            type="number"
            id="dishOptionPrice"
            name="dishOptionPrice"
            placeholder="1.95"
            min="0"
            value={data.dishOptionPrice}
            onChange={e => this.changeExtraIntegredients(e, index)}
          />
        ),
        Delete: (
          <Button
            color="danger"
            onClick={this.toggleDeleteOption}
            className="mr-1"
            value={index}
          >
            <i className="fa fa-trash" value={index} />
          </Button>
        )
      });
    });

    var columns = [
      {
        label: "Add-One Name",
        field: "Add-One Name",
        sort: "asc",
        width: 150
      },
      {
        label: "price",
        field: "price",
        sort: "asc",
        width: 150
      },

      {
        label: "Delete",
        field: "Delete",
        sort: "asc",
        width: 150
      }
    ];

    const datatables = {
      columns: columns,
      rows: rows
    };

    return (
      <Card>
        <Form
          action=""
          method="post"
          encType="multipart/form-data"
          className="form-horizontal"
          // onSubmit={this.handleSubmit}
          //onChange={this.handleChange}
        >
          <CardHeader>
            <Row>
              <Col xs="10">
                <h5>
                  <i className="fa fa-cutlery fa-lg" /> &nbsp;&nbsp;Add New Dish
                </h5>
              </Col>
              <Col xs="2">
                <AppSwitch
                  className={"mx-1"}
                  variant={"pill"}
                  color={"success"}
                  label
                  //name="enable"
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
              <Col xs="6">
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="dishName">
                        <strong>Dish Name</strong>
                      </Label>
                      <Form
                        className={
                          this.state.dishName != null ? "was-validated" : ""
                        }
                      >
                        <Input
                          type="text"
                          id="dishName"
                          name="dishName"
                          placeholder="Dish Title"
                          onChange={this.handleChange}
                          required={this.state.dishName === "" ? true : false}
                        />
                        <FormFeedback className="help-block">
                          Please enter Dish Name
                        </FormFeedback>
                      </Form>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="category">
                        <strong>Category</strong>
                      </Label>
                      <Form className="">
                        <Input
                          type="select"
                          name="category"
                          id="category"
                          onChange={this.handleChange}
                        >
                          <option value="">select category</option>
                          {totalCategory &&
                            totalCategory.map((category, index) => {
                              return (
                                <option value={category._id} key={index}>
                                  {category.parent
                                    ? category.parent + " > "
                                    : ""}
                                  {category.categoryName}
                                </option>
                              );
                            })}
                        </Input>
                      </Form>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="dishInfo">
                    <strong>Dish Description</strong>
                  </Label>
                  <Form
                    className={
                      this.state.dishDescription != null ? "was-validated" : ""
                    }
                  >
                    <Input
                      type="textarea"
                      name="dishDescription"
                      id="textarea-input"
                      rows="4"
                      placeholder="Description ..."
                      onChange={this.handleChange}
                      required={
                        this.state.dishDescription === "" ? true : false
                      }
                    />
                    <FormFeedback className="help-block">
                      Please enter dishDescription
                    </FormFeedback>
                  </Form>
                </FormGroup>
                <FormGroup row>
                  <Col xs="8">
                    <Label htmlFor="dishLocations">
                      <strong>Locations</strong>
                    </Label>
                    {this.state.locations &&
                      this.state.locations.map((location, index) => {
                        return (
                          <FormGroup check className="checkbox" key={index}>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              id="loc"
                              name="checkbox1"
                              value={location._id}
                              onChange={this.handleChange}
                            />
                            <Label
                              check
                              className="form-check-label"
                              htmlFor="checkbox1"
                            >
                              {location.locationName}
                            </Label>
                          </FormGroup>
                        );
                      })}
                  </Col>
                  <Col xs="4">
                    <Label>
                      Tags
                      <Form className="">
                        <Select
                          value={selectedOption}
                          onChange={this.handleChang}
                          options={options}
                          isMulti={true}
                        />
                      </Form>
                    </Label>
                  </Col>
                </FormGroup>
              </Col>
              <Col xs="4">
                <FormGroup row className="text-center">
                  <Col xs="12">
                    <Label htmlFor="text-input">
                      <strong>Select Image</strong>
                    </Label>
                    <br />
                    {/* <ImgDropCrop /> */}
                    <Avatarcrop id="product" size={[250, 250]} />
                  </Col>
                </FormGroup>
              </Col>

              <Col xs="12">
                <FormGroup>
                  <Breadcrumb>
                    <BreadcrumbItem>
                      <h5>Variant Information</h5>
                    </BreadcrumbItem>
                  </Breadcrumb>
                </FormGroup>

                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="dishInfo">
                        <strong>Load Choice Settings</strong>
                      </Label>
                      <Input
                        className="form-input"
                        type="select"
                        name="choice"
                        onChange={this.choiceChange.bind(this)}
                      >
                        <option value="">Select Settings</option>
                        {this.state.choices &&
                          this.state.choices.map((choice, index) => {
                            return (
                              <option key={index} value={index}>
                                {choice.ChoiceName}
                              </option>
                            );
                          })}
                      </Input>
                    </FormGroup>
                    {this.state.rows.map((row, index) => {
                      return (
                        <div key={index}>
                          <FormGroup row key={index}>
                            <Col xs="6">
                              <FormGroup>
                                <Row>
                                  <Col xs="9">
                                    <Label htmlFor="dishChoices">
                                      <strong>Dish Choices</strong>
                                    </Label>
                                  </Col>
                                  <Col xs="3">
                                    <Input
                                      type="radio"
                                      name="defaultVariant"
                                      checked={row.defaultVariant === "radio"}
                                      onChange={e => this.updateValue(e, index)}
                                      value={row.defaultVariant}
                                    />
                                  </Col>
                                </Row>

                                {row.dishchoice != null ? (
                                  <Row>
                                    <Col xs="10">
                                      <Input
                                        type="text"
                                        id="dishChoice"
                                        name="dishchoice"
                                        placeholder="Half/Full/Bread Type"
                                        onChange={e =>
                                          this.updateValue(e, index)
                                        }
                                        required={true}
                                        value={row.dishchoice}
                                      />
                                    </Col>

                                    {/* <Col xs="2">
                                  <Button
                                    color="danger"
                                    onClick={this.toggleDeleteChoices}
                                    className="mr-1"
                                    type="button"
                                    name={'dishchoice'}
                                    value={index}
                                  >
                                  <i className="fa fa-trash" onClick={this.toggleDeleteChoices}/>
                                </Button>
                                </Col> */}
                                  </Row>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </Col>
                          </FormGroup>
                          <Row>
                            <Col xs="2">
                              <Label htmlFor="dishDiscount">
                                <strong>Discount</strong>
                              </Label>
                            </Col>
                            <Col xs="2">
                              <Label htmlFor="dishPrice">
                                <strong>Dish Price</strong>
                              </Label>
                            </Col>
                            <Col xs="2">
                              <Label htmlFor="dishTotalPrice">
                                <strong>Total Price</strong>
                              </Label>
                            </Col>
                          </Row>
                          <FormGroup row>
                            <Col xs="2">
                              <Input
                                type="number"
                                id="dishDiscount"
                                name="discount"
                                placeholder="0/10"
                                value={row.discount}
                                onChange={e => this.updateValue(e, index)}
                                min="0"
                              />
                            </Col>
                            <Col xs="2">
                              <Input
                                type="number"
                                id="dishPrice"
                                name="dishprice"
                                placeholder="11.95"
                                value={row.dishprice}
                                onChange={e => this.updateValue(e, index)}
                                min="0"
                              />
                            </Col>
                            <Col xs="2">
                              <Input
                                type="text"
                                id="dishTotalPrice"
                                name="dishTotalPrice"
                                placeholder=""
                                disabled
                                value={row.dishprice * (1 - row.discount / 100)}
                              />
                            </Col>
                            <Col xs="2">
                              <Button
                                color="danger"
                                onClick={this.toggleDeleteChoices}
                                className="mr-1"
                                type="button"
                                value={index}
                              >
                                <i
                                  className="fa fa-trash"
                                  onClick={this.toggleDeleteChoices}
                                />
                              </Button>
                            </Col>
                          </FormGroup>
                          <hr />
                        </div>
                      );
                    })}
                    {/* <Modal
                        isOpen={this.state.DeleteChoices}
                        toggle={this.toggleDeleteChoices}
                        className={"modal-danger " + this.props.className}
                      >
                        <ModalHeader toggle={this.toggleDeleteChoices}>
                          DELETE OPTION
                        </ModalHeader>
                        <ModalBody>
                        Are you sure  to delete?
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            onClick={this.deleteRows}
                          >
                            Do Something
                          </Button>{" "}
                          <Button
                            color="secondary"
                            onClick={this.toggleDeleteChoices}
                          >
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal> */}
                    <MDBModal
                      isOpen={this.state.DeleteChoices}
                      toggle={this.toggleDeleteChoices}
                      className={"modal-danger " + this.props.className}
                    >
                      <MDBModalHeader toggle={this.toggleDeleteChoices}>
                        DELETE OPTION
                      </MDBModalHeader>
                      <MDBModalBody>Are you sure to delete?</MDBModalBody>
                      <MDBModalFooter>
                        <MDBBtn
                          color="secondary"
                          onClick={this.toggleDeleteChoices}
                        >
                          Cancel
                        </MDBBtn>
                        <MDBBtn color="danger" onClick={this.deleteRows}>
                          DELETE
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModal>
                    <Button
                      type="button"
                      size="md"
                      color="success"
                      onClick={this.addRow}
                    >
                      <i className="fa fa-plus-square-o" />
                      &nbsp;&nbsp;Add Dish Choices
                    </Button>
                  </Col>
                  {/* Secound Row */}
                  <Col xs="6">
                    <Row>
                      <Col xs="4">
                        <Label htmlFor="dishOption">
                          <strong>Dish Add-On Option</strong>
                        </Label>
                      </Col>
                      <Col xs="2">
                        <Label htmlFor="dishOptionPrice">
                          <strong>Price</strong>
                        </Label>
                      </Col>
                    </Row>

                    <FormGroup row>
                      <Col md="12">
                        <Multiselect
                          options={this.state.data}
                          onSelectOptions={this.AddOnOptionChange.bind(this)}
                        />
                        {/* <Picky
                        id="picky"
                        options={optionNames}
                        value={this.state.values}
                        multiple={true}
                        includeSelectAll={true}
                        includeFilter={true}
                        onChange={this.AddOnOptionChange.bind(this)}
                        dropdownHeight={600}
                      /> */}
                        {/* <Input
                        type="select"
                        name="multiple-select"
                        id="multiple-select"
                        multiple
                        onChange={this.AddOnOptionChange.bind(this)}
                      >
                      {AddOnOptions&&AddOnOptions.map((AddOnOption, index) => {
                        return (
                         <option  value={AddOnOption.price?AddOnOption.price:''} key={ index }>{AddOnOption.optionName}</option>
                        )
                      })}
                        
                      </Input> */}
                      </Col>
                    </FormGroup>
                    <MDBDataTable striped bordered hover data={datatables} />
                    {/* {this.state.extraIngredients.map((data, index)=>{
                     return (
                      <FormGroup row className="my-0" key={index}>
                      <Col xs="4">
                        <FormGroup>
                          <Input
                            type="text"
                            id="dishName"
                            name="dishOption"
                            placeholder="Extra Bread"
                            value={data.dishOption}
                            onChange={(e)=>this.changeExtraIntegredients(e, index)}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="2">
                        <FormGroup>
                          <Input
                            type="number"
                            id="dishOptionPrice"
                            name="dishOptionPrice"
                            placeholder="1.95"
                            min="0"
                            value={data.dishOptionPrice}
                            onChange={(e)=>this.changeExtraIntegredients(e, index)}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="2">
                        <FormGroup>
                          <Button
                            color="danger"
                            className="mr-1"
                            type="button"
                            value={index}
                            onClick={this.toggleDeleteOption}
                          >
                            <i className="fa fa-trash" value={index}/>
                          </Button>
                         
                        </FormGroup>
                      </Col>
                        </FormGroup>
                     )
                   })} */}
                    <MDBModal
                      isOpen={this.state.DeleteOption}
                      className={"modal-danger " + this.props.className}
                    >
                      <MDBModalHeader toggle={this.toggleDeleteOption}>
                        DELETE OPTION
                      </MDBModalHeader>
                      <MDBModalBody>Are you sure to delete?</MDBModalBody>
                      <MDBModalFooter>
                        <MDBBtn
                          color="secondary"
                          onClick={this.toggleDeleteOption}
                        >
                          Cancel
                        </MDBBtn>
                        <MDBBtn
                          color="danger"
                          onClick={this.deleteExtraIngredients}
                        >
                          DELETE
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModal>

                    <hr />
                    <Button
                      type="button"
                      size="md"
                      color="success"
                      onClick={this.addExtraIngredients.bind(this)}
                    >
                      <i className="fa fa-plus-square-o" />
                      &nbsp;&nbsp;Add Dish Option
                    </Button>
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
                    this.state.dishName === "" ||
                    this.state.dishDescription === "" ||
                    this.state.category === "" ||
                    this.state.submitLocation.length === 0
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

export default addProduct;
