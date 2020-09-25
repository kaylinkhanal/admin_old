import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from "reactstrap";
import { Link } from "react-router-dom";

class CustomerList extends Component {
  state = {};
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="10">
                    <h5>
                      <i className="icon-user" />
                      &nbsp;&nbsp; Customer List
                    </h5>
                  </Col>
                  <Col xs="2" />
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive hover size="lg">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Email Address</th>
                      <th>Contact Number</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Link to="./CustomerInfo">Mary Smith2</Link>
                      </td>
                      <td>mary@gmail.com</td>
                      <td>8180000000</td>
                      <td>0.78</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="./Location">Mary Smith</Link>
                      </td>
                      <td>mary@gmail.com</td>
                      <td>8180000000</td>
                      <td>0.78</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="./Location">Mary Smith</Link>
                      </td>
                      <td>mary@gmail.com</td>
                      <td>8180000000</td>
                      <td>0.78</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="./Location">Mary Smith</Link>
                      </td>
                      <td>mary@gmail.com</td>
                      <td>8180000000</td>
                      <td>0.78</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="./Location">Mary Smith</Link>
                      </td>
                      <td>mary@gmail.com</td>
                      <td>8180000000</td>
                      <td>0.78</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="./Location">Mary Smith</Link>
                      </td>
                      <td>mary@gmail.com</td>
                      <td>8180000000</td>
                      <td>0.78</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="./Location">Mary Smith</Link>
                      </td>
                      <td>mary@gmail.com</td>
                      <td>8180000000</td>
                      <td>0.78</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="./Location">Mary Smith</Link>
                      </td>
                      <td>mary@gmail.com</td>
                      <td>8180000000</td>
                      <td>0.78</td>
                    </tr>
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

export default CustomerList;
