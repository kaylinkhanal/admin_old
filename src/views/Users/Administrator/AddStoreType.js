import React, { Component } from "react";
import { Alert } from "reactstrap";
import { toastr } from "react-redux-toastr";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  FormFeedback,
  Form
} from "reactstrap";
import axios from "axios";
import { Constants } from "../../../constants/environment";
import Auth from "../../../cookie/Auth";
//import redux action for adding new store type
import { getStoreTypesAction } from "../../../redux/actions/storeTypesActions";
import { getstore } from "../../../redux/actions/getStoreAction";
import { connect } from "react-redux";

class AddStoreType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      req: false,
      new_store_type: null,
      store_types: [],
      data: []
    };
  }

  async componentWillReceiveProps(data) {
    //this.setState({store_types:data.store_type.store_type})
    var body = data.store_type.store_type;
    const param = this.state.data;
    const row = this.state.store_types;
    var temp = [];
    for (var i = 0; i < body.length; i++) {
      var storetype = body[i];
      await axios
        .get(
          Constants.BASE_URL + "api/store-type/store_count/" + storetype._id,
          {
            headers: {
              //"content-type": "application/json",
              Authorization: "Bearer " + Auth.getToken("token")
            }
          }
        )
        .then(res => {
          storetype.hello = res.data;
          temp.push(storetype);
        });
    }

    this.setState({
      store_types: temp
    });
  }

  componentWillMount() {
    this.props.getstore();
  }

  onChangeInputStoreType = event => {
    this.setState({
      new_store_type: event.target.value
    });

    this.setState({
      req: true
    });
  };

  //event handler function when click the add new store type button.
  handleAddNewStoreType = async () => {
    var date = new Date();
    var storeTypeID = date.getTime();

    await axios
      .post(
        Constants.BASE_URL + "api/store-type",
        { storeTypeName: this.state.new_store_type, storeTypeID },
        {
          headers: {
            //"content-type": "application/json",
            Authorization: "Bearer " + Auth.getToken("token")
          }
        }
      )
      .then(res => {
        this.state.store_types.push(res.data);

        this.props.getStoreTypesAction(this.state.store_types);
        toastr.success("success", "Added successfully!");
      })
      .catch(err => {
        console.log(err);
        toastr.error("Please Try again!");
      });
    this.setState({
      new_store_type: ""
    });
  };

  renderBody = () => {
    const { store_types } = this.state;
    var bodies = [];
    store_types.map((store_type, index) => {
      //console.log("store type", store_type);
      bodies.push(
        <FormGroup row key={index}>
          <Col xs="3">
            <Label htmlFor="dishDiscount">
              <strong>
                {store_type.storeTypeName ? store_type.storeTypeName : ""}
              </strong>
            </Label>
          </Col>
          <Col xs="3">
            <Label htmlFor="dishDiscount">
              <strong>ID:</strong>{" "}
              {store_type.storeTypeID ? store_type.storeTypeID : ""}
            </Label>
          </Col>
          <Col xs="3">
            <Label htmlFor="dishDiscount">
              <strong>Stores:</strong> {store_type.hello}
            </Label>
          </Col>
        </FormGroup>
      );
    });
    return bodies;
  };
  render() {
    return (
      <Card>
        <CardHeader>
          <h5>
            <i className="icon-home" />
            &nbsp;&nbsp; Stores Types
          </h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="3">
              <Label htmlFor="dishDiscount">
                <strong>Store</strong>
              </Label>
            </Col>
          </Row>
          <FormGroup row>
            <Col xs="5">
              <Form
                className={
                  this.state.new_store_type !== null ? "was-validated" : ""
                }
              >
                <Input
                  value={this.state.new_store_type}
                  onChange={this.onChangeInputStoreType}
                  type="text"
                  id="inputWarning2i"
                  name="store_type"
                  placeholder=""
                  required={this.state.req}
                  className="form-control-warning"
                />
                <FormFeedback className="help-block">
                  Please provide a valid information
                </FormFeedback>
                <FormFeedback valid className="help-block">
                  Input provided
                </FormFeedback>
              </Form>
            </Col>

            <Col xs="4">
              <FormGroup>
                <Button
                  type="submit"
                  size="md"
                  color="success"
                  onClick={this.handleAddNewStoreType}
                  disabled={
                    this.state.new_store_type == "" ||
                    this.state.new_store_type == null
                      ? true
                      : false
                  }
                >
                  {/*this.handleAddNewStoreType*/}
                  <i className="fa fa-plus-square-o" />
                  &nbsp;&nbsp;Add Store Type
                </Button>
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup>
            <Breadcrumb>
              <BreadcrumbItem>
                <h5>Store Types</h5>
              </BreadcrumbItem>
            </Breadcrumb>
          </FormGroup>

          {this.renderBody()}
        </CardBody>
        <CardFooter />
      </Card>
    );
  }
}

function mapStateToProps(state, props) {
  return { store_type: state.store_type };
}
export default connect(mapStateToProps, { getstore, getStoreTypesAction })(
  AddStoreType
);
