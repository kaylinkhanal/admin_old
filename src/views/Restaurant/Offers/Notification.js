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
  TabContent,
  TabPane,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  ListGroup,
  ListGroupItem,
  Label,
  Breadcrumb,
  BreadcrumbItem,
  Row
} from "reactstrap";

class Notification extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 1
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <Card>
        <CardHeader>
          <h5>
            <i className="icon-speech" />
            &nbsp;&nbsp; Notification
          </h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="4">
              <Label htmlFor="dishDiscount">
                <strong>Notification Title</strong>
              </Label>
            </Col>
            <Col xs="4">
              <Label htmlFor="dishPrice">
                <strong>Message</strong>
              </Label>
            </Col>
          </Row>
          <FormGroup row>
            <Col xs="4">
              <Input
                type="text"
                id="dishDiscount"
                name="dishDiscount"
                placeholder="Free Taco!"
              />
            </Col>

            <Col xs="5">
              <Input
                type="textarea"
                name="textarea-input"
                id="textarea-input"
                rows="3"
                placeholder="Message Content..."
              />
            </Col>

            <Col xs="2">
              <FormGroup>
                <Button
                  type="submit"
                  size="lg"
                  color="success"
                  onSubmit={this.handleSubmit}
                >
                  <i className="fa fa-plus-square-o" />
                  &nbsp;&nbsp;Create Message
                </Button>
              </FormGroup>
            </Col>
          </FormGroup>
          <br />
          <br />
          <Breadcrumb>
            <BreadcrumbItem>
              <h5>Send Notification Message's</h5>
            </BreadcrumbItem>
          </Breadcrumb>
          <Row>
            <Col xs="4">
              <Label htmlFor="dishDiscount">
                <strong>Message Title</strong>
              </Label>
            </Col>
            <Col xs="4">
              <Label htmlFor="dishPrice">
                <strong>Message</strong>
              </Label>
            </Col>
          </Row>
          <Row>
            <Col xs="4">
              <ListGroup id="list-tab" role="tablist">
                <ListGroupItem
                  onClick={() => this.toggle(0)}
                  action
                  active={this.state.activeTab === 0}
                >
                  Free Taco!
                </ListGroupItem>
                <ListGroupItem
                  onClick={() => this.toggle(1)}
                  action
                  active={this.state.activeTab === 1}
                >
                  Buy 1 Get 1 Free
                </ListGroupItem>
                <ListGroupItem
                  onClick={() => this.toggle(2)}
                  action
                  active={this.state.activeTab === 2}
                >
                  Free Delivery Over $50
                </ListGroupItem>
                <ListGroupItem
                  onClick={() => this.toggle(3)}
                  action
                  active={this.state.activeTab === 3}
                >
                  Double Points
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col xs="8">
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId={0}>
                  <p>
                    Velit aute mollit ipsum ad dolor consectetur nulla officia
                    culpa adipisicing exercitation fugiat tempor. Voluptate
                    deserunt sit sunt nisi aliqua fugiat proident ea ut. Mollit
                    voluptate reprehenderit occaecat nisi ad non minim tempor
                    sunt voluptate consectetur exercitation id ut nulla. Ea et
                    fugiat aliquip nostrud sunt incididunt consectetur culpa
                    aliquip eiusmod dolor. Anim ad Lorem aliqua in cupidatat
                    nisi enim eu nostrud do aliquip veniam minim.
                  </p>
                  <Row>
                    <Col xs="3">
                      <Label htmlFor="dishDiscount">
                        <strong>Last Send</strong>
                      </Label>
                    </Col>
                    <Col xs="3">
                      <Label htmlFor="dishPrice">
                        <strong>Number of Times</strong>
                      </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="3">
                      <Label htmlFor="dishDiscount">
                        <p>4/18/2019</p>
                      </Label>
                    </Col>
                    <Col xs="1">
                      <p>
                        <Badge className="float-right" pill>
                          17
                        </Badge>
                      </p>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId={1}>
                  <p>
                    Cupidatat quis ad sint excepteur laborum in esse qui. Et
                    excepteur consectetur ex nisi eu do cillum ad laborum.
                    Mollit et eu officia dolore sunt Lorem culpa qui commodo
                    velit ex amet id ex. Officia anim incididunt laboris
                    deserunt anim aute dolor incididunt veniam aute dolore do
                    exercitation. Dolor nisi culpa ex ad irure in elit eu
                    dolore. Ad laboris ipsum reprehenderit irure non commodo
                    enim culpa commodo veniam incididunt veniam ad.
                  </p>
                  <Row>
                    <Col xs="3">
                      <Label htmlFor="dishDiscount">
                        <strong>Last Send</strong>
                      </Label>
                    </Col>
                    <Col xs="3">
                      <Label htmlFor="dishPrice">
                        <strong>Number of Times</strong>
                      </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="3">
                      <Label htmlFor="dishDiscount">
                        <p>4/21/2019</p>
                      </Label>
                    </Col>
                    <Col xs="1">
                      <p>
                        <Badge className="float-right" pill>
                          14
                        </Badge>
                      </p>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId={2}>
                  <p>
                    Ut ut do pariatur aliquip aliqua aliquip exercitation do
                    nostrud commodo reprehenderit aute ipsum voluptate. Irure
                    Lorem et laboris nostrud amet cupidatat cupidatat anim do ut
                    velit mollit consequat enim tempor. Consectetur est minim
                    nostrud nostrud consectetur irure labore voluptate irure.
                    Ipsum id Lorem sit sint voluptate est pariatur eu ad
                    cupidatat et deserunt culpa sit eiusmod deserunt.
                    Consectetur et fugiat anim do eiusmod aliquip nulla laborum
                    elit adipisicing pariatur cillum.
                  </p>
                  <Row>
                    <Col xs="3">
                      <Label htmlFor="dishDiscount">
                        <strong>Last Send</strong>
                      </Label>
                    </Col>
                    <Col xs="3">
                      <Label htmlFor="dishPrice">
                        <strong>Number of Times</strong>
                      </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="3">
                      <Label htmlFor="dishDiscount">
                        <p>3/11/2019</p>
                      </Label>
                    </Col>
                    <Col xs="1">
                      <p>
                        <Badge className="float-right" pill>
                          12
                        </Badge>
                      </p>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId={3}>
                  <p>
                    Irure enim occaecat labore sit qui aliquip reprehenderit
                    amet velit. Deserunt ullamco ex elit nostrud ut dolore nisi
                    officia magna sit occaecat laboris sunt dolor. Nisi eu minim
                    cillum occaecat aute est cupidatat aliqua labore aute
                    occaecat ea aliquip sunt amet. Aute mollit dolor ut
                    exercitation irure commodo non amet consectetur quis amet
                    culpa. Quis ullamco nisi amet qui aute irure eu. Magna
                    labore dolor quis ex labore id nostrud deserunt dolor
                    eiusmod eu pariatur culpa mollit in irure.
                  </p>
                  <Row>
                    <Col xs="3">
                      <Label htmlFor="dishDiscount">
                        <strong>Last Send</strong>
                      </Label>
                    </Col>
                    <Col xs="3">
                      <Label htmlFor="dishPrice">
                        <strong>Number of Times</strong>
                      </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="3">
                      <Label htmlFor="dishDiscount">
                        <p>1/10/2019</p>
                      </Label>
                    </Col>
                    <Col xs="1">
                      <p>
                        <Badge className="float-right" pill>
                          19
                        </Badge>
                      </p>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <Row>
            <Col xs="10" />
            <Col xs="2">
              <Button
                type="submit"
                size="lg"
                color="primary"
                onSubmit={this.handleSubmit}
              >
                <i className="fa fa-dot-circle-o" /> Send Message
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

export default Notification;
