import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  getSingleProduct,
  resetSingleProduct
} from "../../../redux/actions/productActions";
import {
  orderUpdate,
  orderUpdateByOption
} from "../../../redux/actions/orderActions";
import Auth from "../../../cookie/Auth.js";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
  TabContent,
  TabPane,
  Button,
  FormGroup,
  Label,
  Input,
  Table,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import { Link } from "react-router-dom";
let Order_status = "";
let OrderProcess = "";
let grandTotal = 0;
var extraIngredients = [];
var choices = "";
var choice_price = 0;
class ChoiceProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 0,
      price: 0,
      quantity: 0,
      choice_price: 0,
      options_price: 0,
      orderId: "",
      sel_choice: {},
      description: ""
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.updatedOption.status == 200) {
      this.props.history.push(
        "/Restaurant/Orders/Orders/view/" + this.state.orderId
      );
    }
  }
  componentWillMount() {
    this.props.getSingleProduct(this.props.match.params.id);
    this.setState({
      productId: this.props.match.params.id,
      price: this.props.match.params.price,
      quantity: this.props.match.params.qt,
      orderId: this.props.match.params.order
    });
  }
  componentDidMount() {
    this.props.orders.map(row => {
      if (row._id == this.state.orderId) {
        row.productDetails.map(item => {
          if (item.productId == this.props.match.params.id) {
            extraIngredients = item.extraIngredients
              ? item.extraIngredients
              : [];
            choices = item.size ? item.size : "";
            choice_price = item.price ? item.price : "";
            this.setState({
              description: item.description ? item.description : ""
            });
          }
        });
      }
    });
  }
  selChoice = row => {
    var temp = {};
    temp.name = row.size;
    temp.price = row.price;
    choice_price = row.price;
    choices = row.size;
    this.setState({ choice_price: row.price });
  };
  optionsProduct = (event, row) => {
    var temp_array = [];
    var temp = this.state.options_price;
    if (event.target.checked) {
      temp += parseFloat(row.price);
      extraIngredients.push({ name: row.name, price: row.price });
    } else {
      temp -= parseFloat(row.price);
      extraIngredients.map(element => {
        if (element.name != row.name) {
          temp_array.push(element);
        }
      });
      extraIngredients = temp_array;
    }
    this.setState({ options_price: temp });
  };
  onSubmit = () => {
    const postData = {
      id: this.state.orderId,
      productId: this.state.productId,
      user: Auth.getToken("userId"),
      options: extraIngredients,
      choice: choices,
      price: choice_price,
      description: this.state.description
    };
    this.props.orderUpdateByOption(postData);
  };

  onBack = () => {
    this.props.history.goBack();
  };
  checked_option = name => {
    let checked = false;
    extraIngredients.map(element => {
      if (element.name == name) {
        checked = true;
      }
    });
    return checked;
  };
  changeHandle = event => {
    this.setState({ description: event.target.value });
  };

  render() {
    const { product, orders } = this.props;
    var choice_product = this.props.product.variants
      ? this.props.product.variants
      : [];
    var options_product = this.props.product.extraIngredients
      ? this.props.product.extraIngredients
      : [];
    var total_price = 0;
    var option_price = 0;
    var option_formular = "";
    var formular = "";

    choice_product.map((item, index) => {
      if (item.size == choices) {
        choice_price = item.price ? item.price : 0;
      }
    });

    options_product.map((row, index) => {
      extraIngredients.map(element => {
        if (element.name == row.name) {
          option_price += parseFloat(row.price);
          option_formular += " + $" + parseFloat(row.price).toFixed(2);
        }
      });
    });

    //console.log();
    total_price =
      parseFloat(this.state.quantity) *
      (parseFloat(choice_price) + parseFloat(option_price));
    formular =
      "( $" +
      choice_price +
      option_formular +
      " ) x " +
      this.state.quantity +
      " = ";

    return (
      <Card>
        <CardHeader className="">
          <Row>
            <Col xs="12" sm="12" md="12" className="p-0">
              <p className="h5 mt-2 text-dark text-center">{product.title}</p>
            </Col>
          </Row>
        </CardHeader>
        <CardBody className="p-0 p-md-3">
          <Row className=" ml-2 mr-2 ml-md-4 mr-md-2">
            <Col xs="6" sm="6" md="6">
              <p className="h4 mt-2 text-dark">
                Quantity: {this.state.quantity}
              </p>
            </Col>
            <Col xs="6" sm="6" md="6">
              <p className="h4 mt-2 text-dark">Price: ${this.state.price}</p>
            </Col>
          </Row>
          <Row className=" ml-2 mr-2 ml-md-4 mr-md-2">
            <Col xs="12" sm="6" md="6">
              <p className="h3 mt-2 text-dark text-center ">Choices</p>
              <Row className=" ml-2 mr-2 ml-md-4 mr-md-2">
                <Col xs="12" sm="12" md="12">
                  {choice_product.map((row, index) => {
                    let checked = false;
                    if (row.size == choices) {
                      checked = true;
                      choice_price = row.price ? row.price : 0;
                    }
                    return (
                      <FormGroup key={index} check className="radio">
                        <Input
                          className="form-check-input"
                          type="radio"
                          id="radio1"
                          name="radios"
                          value="option1"
                          checked={checked}
                          onChange={() => this.selChoice(row)}
                        />
                        <Label
                          check
                          className="form-check-label"
                          htmlFor="radio1"
                        >
                          {row.size + " $ " + parseFloat(row.price).toFixed(2)}
                        </Label>
                      </FormGroup>
                    );
                  })}
                </Col>
              </Row>
            </Col>
            <Col xs="12" sm="6" md="6">
              <p className="h3 mt-2 text-dark text-center ">Options</p>

              {options_product.map((row, index) => {
                return (
                  <Row key={index} className=" ml-2 mr-2 ml-md-4 mr-md-2">
                    <Col xs="12" sm="12" md="12">
                      <FormGroup check className="checkbox">
                        <Input
                          onChange={event => this.optionsProduct(event, row)}
                          className="form-check-input"
                          type="checkbox"
                          id="checkbox1"
                          name="checkbox1"
                          value="option1"
                          checked={this.checked_option(row.name)}
                        />
                        <Label
                          check
                          className="form-check-label"
                          htmlFor="checkbox1"
                        >
                          {row.name + " $" + parseFloat(row.price).toFixed(2)}
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>

          <Row className=" ml-2 mr-2 ml-md-4 mr-md-2">
            <Col xs="12" sm="12" md="12">
              <p className="h4 mt-2 text-dark">Introductions:</p>
              <Input
                type="textarea"
                name="textarea-input"
                id="textarea-input"
                rows="4"
                value={this.state.description}
                onChange={this.changeHandle}
                placeholder="Introduction..."
              />
            </Col>
            <Label htmlFor="textarea-input">
              Total: {formular} ${total_price.toFixed(2)}
            </Label>
          </Row>
        </CardBody>
        <CardFooter>
          <Row className="  ml-md-4 mr-md-2 p-2">
            <Col xs="12" sm="12" md="9">
              <Button
                variant="primary"
                className="appept_btn bg-green"
                onClick={this.onSubmit}
              >
                Submit
              </Button>
              <Button
                variant="primary"
                className="appept_btn bg-green"
                onClick={this.onBack}
              >
                Back
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    product: state.product.product,
    orders: state.order.orders,
    updatedOption: state.order.updatedOption
  };
}
export default connect(
  mapStateToProps,
  { getSingleProduct, resetSingleProduct, orderUpdate, orderUpdateByOption }
)(ChoiceProduct);
