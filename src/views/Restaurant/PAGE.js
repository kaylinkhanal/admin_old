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

class DeliveryArea extends Component {
  state = {};
  render() {
    return (
      <Card>
        <CardHeader>
          <h5>
            <i className="icon-map" />
            &nbsp;&nbsp; Delivery Area's & Settings
          </h5>
        </CardHeader>
        <CardBody>
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
                type="text"
                id="dishDiscount"
                name="dishDiscount"
                placeholder="0/10"
              />
            </Col>
            <Col xs="2">
              <Input
                type="text"
                id="dishPrice"
                name="dishPrice"
                placeholder="11.95"
              />
            </Col>
            <Col xs="2">
              <Input
                type="text"
                id="dishTotalPrice"
                name="dishTotalPrice"
                placeholder=""
                disabled
              />
            </Col>
            <Col xs="2">
              <Input type="select" name="openDay" id="openDay">
                <option>Monday</option>
                <option>Tuesday</option>
                <option selected>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </Input>
            </Col>
            <Col xs="2">
              <Button
                color="danger"
                onClick={this.toggleDeleteChoices}
                className="mr-1"
              >
                <i className="fa fa-trash" />
              </Button>
            </Col>
            <Col xs="2">
              <FormGroup>
                <Button
                  type="submit"
                  size="md"
                  color="success"
                  onSubmit={this.handleSubmit}
                >
                  <i className="fa fa-plus-square-o" />
                  &nbsp;&nbsp;Add Merchant
                </Button>
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup>
            <Breadcrumb>
              <BreadcrumbItem>
                <h5>Customer Details</h5>
              </BreadcrumbItem>
            </Breadcrumb>
          </FormGroup>
          <hr />
        </CardBody>
        <CardFooter>
          <Row>
            <Col xs="10">
              <Button
                type="submit"
                size="lg"
                color="primary"
                onSubmit={this.handleSubmit}
              >
                <i className="fa fa-dot-circle-o" /> Create
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

export default DeliveryArea;
