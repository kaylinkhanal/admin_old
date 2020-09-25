import React, { Component } from "react";
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  Table,
  InputGroupAddon,
  InputGroupText,
  Label,
  Breadcrumb,
  BreadcrumbItem,
  Row
} from "reactstrap";
import { Link } from "react-router-dom";

class CustomerInfo extends Component {
  state = {};
  render() {
    return (
      <Card>
        <CardHeader>
          <h5>
            <i className="icon-map" />
            &nbsp;&nbsp; Customer Details
          </h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="6">
              <Row>
                <Col xs="3">
                  <Label htmlFor="dishDiscount">
                    <strong>Customer Name:</strong>
                  </Label>
                </Col>
                <Col xs="3">
                  <Label htmlFor="dishPrice">Mary Smith</Label>
                </Col>
              </Row>
              <Row>
                <Col xs="3">
                  <Label htmlFor="dishDiscount">
                    <strong>Email Address:</strong>
                  </Label>
                </Col>
                <Col xs="4">
                  <Label htmlFor="dishPrice">mary@ats-one.com</Label>
                </Col>
              </Row>
              <Row>
                <Col xs="3">
                  <Label htmlFor="dishDiscount">
                    <strong>Mobile Number:</strong>
                  </Label>
                </Col>
                <Col xs="3">
                  <Label htmlFor="dishPrice">8180000000</Label>
                </Col>
              </Row>
            </Col>
            <Col xs="6">
              <Row>
                <Col xs="3">
                  <Label htmlFor="dishDiscount">
                    <strong>Customer Points:</strong>
                  </Label>
                </Col>
                <Col xs="3">
                  <Label htmlFor="dishPrice">88</Label>
                </Col>
              </Row>
              <Row>
                <Col xs="3">
                  <Label htmlFor="dishDiscount">
                    <strong>Total Sales:</strong>
                  </Label>
                </Col>
                <Col xs="3">
                  <Label htmlFor="dishPrice">$68.90</Label>
                </Col>
              </Row>
            </Col>
          </Row>
          <br />
          <FormGroup Row>
            <p>
              <h5>Orders</h5>
            </p>
            <Table responsive hover size="lg">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Payment Method</th>
                  <th>Order Type</th>
                  <th>Order Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10065</td>
                  <td>Mar 30, 2019</td>
                  <td>COD</td>
                  <td>Home Delivery</td>
                  <td>On the Way</td>
                  <td>$30.00</td>
                </tr>
                <tr>
                  <td>10065</td>
                  <td>Mar 30, 2019</td>
                  <td>COD</td>
                  <td>Home Delivery</td>
                  <td>On the Way</td>
                  <td>$30.00</td>
                </tr>
                <tr>
                  <td>10065</td>
                  <td>Mar 30, 2019</td>
                  <td>COD</td>
                  <td>Home Delivery</td>
                  <td>On the Way</td>
                  <td>$30.00</td>
                </tr>
                <tr>
                  <td>10065</td>
                  <td>Mar 30, 2019</td>
                  <td>COD</td>
                  <td>Home Delivery</td>
                  <td>On the Way</td>
                  <td>$30.00</td>
                </tr>
              </tbody>
            </Table>
          </FormGroup>
        </CardBody>
        <CardFooter>
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
        </CardFooter>
      </Card>
    );
  }
}

export default CustomerInfo;
