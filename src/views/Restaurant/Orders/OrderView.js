import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

import {
  getOrderByLocation,
  orderUpdate,
  resetUpdatedOrder,
  resetUpdatedOptions
} from "../../../redux/actions/orderActions";
import {
  getSingleProduct,
  resetSingleProduct
} from "../../../redux/actions/productActions";
import Auth from "../../../cookie/Auth.js";

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  Button,
  FormGroup,
  Input,
  Table
} from "reactstrap";
let Order_status = "";
let OrderProcess = "";
let grandTotal = 0;
class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderid: 0,
      orderStatus: ""
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.updatedOrder.status == 200 && OrderProcess == "Accepted") {
      this.props.getOrderByLocation();
      this.props.resetUpdatedOrder();
    }
  }
  componentWillMount() {
    this.setState({ orderid: this.props.match.params.id });
    this.props.getOrderByLocation();
  }
  acceptProcess = () => {
    const postData = {
      id: this.state.orderid,
      grandTotal: grandTotal,
      user: Auth.getToken("userId"),
      status: OrderProcess
    };
    this.props.orderUpdate(postData);
  };
  cancelProcess = () => {
    const postData = {
      id: this.state.orderid,
      grandTotal: grandTotal,
      user: Auth.getToken("userId"),
      status: "Cancelled"
    };
    this.props.orderUpdate(postData);
  };
  tabClick = btn => {
    console.log(btn);
    if (btn == "today_btn") {
      this.setState({
        today_btn: true,
        yesterday_btn: false,
        all_btn: false,
        custome_btn: false
      });
    } else if (btn == "yesterday_btn") {
      this.setState({
        today_btn: false,
        yesterday_btn: true,
        all_btn: false,
        custome_btn: false
      });
    } else if (btn == "custome_btn") {
      this.setState({
        today_btn: false,
        yesterday_btn: false,
        all_btn: false,
        custome_btn: true
      });
    } else {
      this.setState({
        today_btn: false,
        yesterday_btn: false,
        all_btn: true,
        custome_btn: false
      });
    }
  };
  clickProduct = row => {
    this.props.resetSingleProduct();
    this.props.getSingleProduct(row.productId);
    this.props.resetUpdatedOptions();
    this.props.history.push(
      "/Restaurant/Orders/Orders/product/" +
        row.productId +
        "/" +
        row.price +
        "/" +
        row.Quantity +
        "/" +
        this.state.orderid
    );
  };
  render() {
    if (this.props.updatedOrder.status == 200 && OrderProcess != "Accepted") {
      this.props.history.push("/Restaurant/Orders/Orders");
    }
    const { orders } = this.props;
    let orderNo = "";
    let customerName = "";
    let payment_method = "";
    let delivery_fee = 0;
    let subTotal = 0;
    let customer_phone = "";
    let address1 = "";
    let zip_city = "";
    let created_at = "";
    let products = [];
    let color_status = "";
    let discount = 0;
    let order_total = 0;
    let btn_status = "";
    let taxInfo = {};
    let order_confirm = "";
    let on_it_way = "";
    let delivered = "";
    let reward = 0;

    orders.map(row => {
      if (row._id == this.state.orderid) {
        orderNo = row.orderID;
        customerName = row.userInfo.name;
        payment_method = row.paymentOption;
        delivery_fee = row.deliveryCharge;
        // subTotal=parseFloat(row.subTotal);
        customer_phone = row.userInfo.contactNumber.toString();
        customer_phone =
          "(" +
          customer_phone.substr(0, 3) +
          ") " +
          customer_phone.substr(3, 3) +
          "-" +
          customer_phone.substr(6, 4);
        address1 = row.shippingAddress.address;
        zip_city = row.shippingAddress.zip + ", " + row.shippingAddress.city;
        taxInfo = row.taxInfo ? row.taxInfo : {};
        var date_temp = new Date(row.createdAt);
        created_at = moment(row.createdAt).format("MM/DD/YYYY hh:mm A");

        products = row.productDetails;
        row.productDetails.map(item => {
          discount += parseFloat(item.Discount);
        });

        reward = parseFloat(row.loyalty ? row.loyalty : 0);

        products.map((row, index) => {
          var option_price = 0;
          var product_price = 0;
          var extraIngredients = row.extraIngredients
            ? row.extraIngredients
            : [];
          product_price += parseFloat(row.price);
          extraIngredients.map(item => {
            option_price += parseFloat(item.price);
          });
          subTotal +=
            (parseFloat(product_price) + parseFloat(option_price)) *
            parseInt(row.Quantity);
        });

        order_total += subTotal;
        order_total += discount;
        order_total += delivery_fee == "Free" ? 0 : parseFloat(delivery_fee);
        //order_total+=parseFloat(Auth.getToken('taxinfo'));
        order_total += parseFloat(taxInfo.amount);
        order_total += reward;
        grandTotal = order_total;

        Order_status = row.status;
        if (row.status == "Pending" && row.orderType == "Pick Up") {
          color_status = "pickup";
          // order_confirm="pickup";
          OrderProcess = "Accepted";
          btn_status = "Accept Order";
        } else if (
          row.status == "Pending" &&
          row.orderType == "Home Delivery"
        ) {
          color_status = "new_order";
          //order_confirm="new_order";
          OrderProcess = "Accepted";
          btn_status = "Accept Order";
        } else if (row.status == "On the Way") {
          color_status = "open_order";
          on_it_way = "open_order";
          OrderProcess = "Delivered";
          btn_status = "Deliver Order";
        } else if (row.status == "Delivered") {
          color_status = "bg-blue";
          delivered = "bg-blue ";
        } else if (row.status == "Cancelled") {
          color_status = "bg1_red";
          OrderProcess = "Canceled";
        } else if (row.status == "Accepted") {
          order_confirm = "new_order";
          color_status = "new_order";
          OrderProcess = "On the Way";
          btn_status = "On the way Order";
        }
        console.log(Order_status, "order status");
      }
    });

    return (
      <Card>
        <CardHeader className="mb-0 pb-0">
          <Row>
            <Col xs="4" sm="4" md="4" className="p-0">
              <Button
                color="secondary"
                className="non_border"
                className={order_confirm + " non_border"}
                block
              >
                Order Confirmed
              </Button>
            </Col>

            <Col xs="4" sm="4" md="4" className="p-0">
              <Button
                color="secondary"
                className={on_it_way + " non_border"}
                block
              >
                On it's Way
              </Button>
            </Col>
            <Col xs="3" sm="3" md="3" className="p-0">
              <Button
                color="secondary"
                className={delivered + "non_border"}
                block
              >
                Delivered
              </Button>
            </Col>
            <Col xs="1" sm="1" md="1" className="p-0 mg_auto">
              {Order_status == "On the Way" ? (
                <span className="text-center h5">
                  <i className="fa fa-truck fa-lg ml-2" />
                </span>
              ) : (
                <span className="text-center h5">
                  <i className="fa fa-shopping-bag fa-lg ml-2" />
                </span>
              )}
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="6" md="6" className="pl-2" />
            <Col xs="12" sm="6" md="6" className="pl-2" />
          </Row>
        </CardHeader>
        <CardBody className="p-0 p-md-3">
          <Row className=" ml-2 mr-2 ml-md-4 mr-md-2">
            <Col xs="12" sm="6" md="6">
              <Row>
                <Col xs="12" sm="6" md="6" className="pl-2">
                  <p className="h5 mt-2 text-dark">Order# {orderNo}</p>
                </Col>
              </Row>
              <Row>
                <Col xs="12" sm="12" md="12" className="tableCard">
                  <Row className="p-2">
                    <Col xs="8" sm="8" md="8">
                      Payment Method:
                    </Col>
                    <Col xs="4" sm="4" md="4" className="text-center">
                      {payment_method}
                    </Col>
                  </Row>
                  <Row className="p-2">
                    <Col xs="8" sm="8" md="8">
                      Sub Total:
                    </Col>
                    <Col xs="4" sm="4" md="4" className="text-center">
                      $ {subTotal.toFixed(2)}
                    </Col>
                  </Row>
                  <Row className="p-2">
                    <Col xs="8" sm="8" md="8">
                      Discount:
                    </Col>
                    <Col xs="4" sm="4" md="4" className="text-center">
                      $ {parseFloat(discount).toFixed(2)}
                    </Col>
                  </Row>
                  <Row className="p-2">
                    <Col xs="8" sm="8" md="8">
                      State Tax:
                    </Col>
                    <Col xs="4" sm="4" md="4" className="text-center">
                      $ {parseFloat(taxInfo.amount).toFixed(2)}
                    </Col>
                  </Row>
                  <Row className="p-2">
                    <Col xs="8" sm="8" md="8">
                      Delivery Fee:
                    </Col>
                    <Col xs="4" sm="4" md="4" className="text-center">
                      {delivery_fee != "Free"
                        ? "$ " + parseFloat(delivery_fee).toFixed(2)
                        : delivery_fee}
                    </Col>
                  </Row>
                  <Row className="p-2">
                    <Col xs="8" sm="8" md="8">
                      Tip:
                    </Col>
                    <Col xs="4" sm="4" md="4" className="text-center">
                      $ 0.00
                    </Col>
                  </Row>
                  <Row className="p-2">
                    <Col xs="8" sm="8" md="8">
                      Rewards:
                    </Col>
                    <Col xs="4" sm="4" md="4" className="text-center">
                      $ {parseFloat(reward).toFixed(2)}
                    </Col>
                  </Row>
                  <Row className="p-2 total_card">
                    <Col xs="8" sm="8" md="8">
                      <p className="h5 text-dark">Order Total:</p>
                    </Col>
                    <Col xs="4" sm="4" md="4" className="text-center">
                      <p className="h5 text-dark">$ {order_total.toFixed(2)}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs="12" sm="6" md="6">
              <Row>
                <Col xs="12" sm="12" md="12" className="pl-2">
                  <p className="h5 mt-2 text-dark">Customer Info:</p>
                </Col>
                <Col xs="12" sm="12" md="12" className="ml-md-3 tableCard">
                  <Row className="p-2">
                    <Col xs="8" sm="8" md="6">
                      {customerName}
                    </Col>
                    <Col xs="4" sm="4" md="6" className="text-center" />
                  </Row>
                  <Row className="p-2">
                    <Col xs="8" sm="8" md="6">
                      {customer_phone}
                    </Col>
                    <Col xs="4" sm="4" md="6" className="text-center" />
                  </Row>
                  <Row className="p-2">
                    <Col xs="8" sm="8" md="6" />
                    <Col xs="4" sm="4" md="6" className="text-center" />
                  </Row>
                  <Row className="p-2">
                    <Col xs="8" sm="8" md="6">
                      {address1}
                    </Col>
                    <Col xs="4" sm="4" md="6" className="text-center" />
                  </Row>
                  <Row className="p-2">
                    <Col xs="8" sm="8" md="6">
                      {zip_city}
                    </Col>
                    <Col xs="4" sm="4" md="6" className="text-center" />
                  </Row>
                  <Row className="p-2">
                    <Col xs="8" sm="8" md="6" />
                    <Col xs="4" sm="4" md="6" className="text-center" />
                  </Row>
                  <Row className="p-2 mb-2">
                    <Col xs="8" sm="8" md="10">
                      <p className="h5 text-dark">Instructions:</p>
                    </Col>
                    <Col xs="4" sm="4" md="2" className="text-center" />
                  </Row>
                  <Row className="p-2">
                    <Col xs="8" sm="8" md="6" />
                    <Col xs="4" sm="4" md="6" className="text-center" />
                  </Row>
                  <Row className="p-2">
                    <Col xs="8" sm="8" md="6" />
                    <Col xs="4" sm="4" md="6" className="text-center" />
                  </Row>
                  <Row className="p-2">
                    <Col xs="12" sm="12" md="12" className="text-center">
                      {created_at}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className=" ml-2 mr-2 ml-md-4 mr-md-2 ">
            <Col xs="12" sm="12" md="12">
              <p className="h5 mt-2 text-dark">Customer Order:</p>
            </Col>
          </Row>
          <div>
            <Table responsive size="sm">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Options</th>
                  <th>Quantities</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((row, index) => {
                  var extraIngredients = row.extraIngredients
                    ? row.extraIngredients
                    : [];
                  var temp = [];
                  var total_price = 0;
                  var total_option = 0;
                  extraIngredients.map(item => {
                    temp.push(item.name);
                    total_option += parseFloat(item.price);
                  });
                  total_price =
                    (parseFloat(total_option) + parseFloat(row.price)) *
                    parseInt(row.Quantity);

                  return (
                    <tr key={index} onClick={() => this.clickProduct(row)}>
                      <td>{row.title}</td>
                      <td>{temp.join() ? temp.join() : "No selected"}</td>
                      <td>X {row.Quantity}</td>
                      <td>${row.price}</td>
                      <td>$ {total_price.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {/**
           <Row key={'ht'} className=" ml-2 mr-2 ml-md-4 mr-md-2 p-2">  
                  <Col xs="3" sm="3" md="3" className="th"> 
                     Product Name
                  </Col>  
                  <Col xs="3" sm="3" md="3" className="text-left th"> 
                   Options
                  </Col>                    
                  <Col xs="2" sm="2" md="2" className="text-left th"> 
                  Quantities
                  </Col>   
                  <Col xs="2" sm="2" md="2" className="text-left th"> 
                  Price
                </Col>
                <Col xs="2" sm="2" md="2" className="text-left th"> 
                  Total
                </Col>
           </Row>    

          {
            products.map((row,index)=>{
              var extraIngredients=row.extraIngredients?row.extraIngredients:[];
              var temp=[]; 
              var total_price=0;
              var total_option=0;             
              extraIngredients.map(item=>{
                temp.push(item.name);
                total_option+=parseFloat(item.price);
              })
              total_price=(parseFloat(total_option)+parseFloat(row.price))*parseInt(row.Quantity);

            return <Row key={index} className=" ml-2 mr-2 ml-md-4 mr-md-2 p-2" onClick={()=>this.clickProduct(row)}>  
                  <Col xs="3" sm="3" md="3"> 
                    {row.title}
                  </Col>  
                  <Col xs="3" sm="3" md="3" className="text-left"> 
                  {temp.join()?temp.join():"No selected"}
                  </Col>                    
                  <Col xs="2" sm="2" md="2" className="text-left"> 
                  X {row.Quantity}
                  </Col>   
                  <Col xs="2" sm="2" md="2" className="text-left"> 
                  ${row.price}
                  </Col>
                  <Col xs="2" sm="2" md="2" className="text-left"> 
                   $ {total_price.toFixed(2)}
                  </Col>     
              </Row>
            })
          }
           */}
          </div>
        </CardBody>
        <CardFooter>
          <Row className="  ml-md-4 mr-md-2 p-2">
            <Col xs="12" sm="3" md="6">
              {Order_status != "Delivered" && Order_status != "Cancelled" ? (
                <FormGroup>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Message:"
                    required
                  />
                </FormGroup>
              ) : null}
            </Col>
            <Col xs="12" sm="9" md="6">
              {Order_status != "Delivered" && Order_status != "Cancelled" ? (
                <Button
                  variant="primary"
                  className={"appept_btn " + color_status}
                  onClick={this.acceptProcess}
                >
                  {btn_status}
                </Button>
              ) : null}
              {Order_status != "Delivered" && Order_status != "Cancelled" ? (
                <Button
                  variant="primary"
                  onClick={this.cancelProcess}
                  className="appept_btn bg1_red "
                >
                  Cancel Order
                </Button>
              ) : null}
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

function mapStateToProps(state, props) {
  return { orders: state.order.orders, updatedOrder: state.order.updatedOrder };
}
export default connect(
  mapStateToProps,
  {
    getOrderByLocation,
    orderUpdate,
    resetUpdatedOrder,
    getSingleProduct,
    resetSingleProduct,
    resetUpdatedOptions
  }
)(Orders);
