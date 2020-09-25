import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {Constants} from "../../../constants/environment";
import {toastr} from 'react-redux-toastr'
import {
  Table,
  // Button,
  // ButtonDropdown,
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
  // Breadcrumb,
  // Modal,
  // ModalBody,
  // ModalFooter,
  // ModalHeader,
  Row
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
import Axios from "axios";
import Auth from "../../../cookie/Auth";
import { connect } from "react-redux";
import { editTag, getSingleTag } from  "../../../redux/actions/tagAction";

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DeleteChoices: false,
      DeleteOption: false,
      tag:"",
      enable:false,
      tag1:false
    };
    this.toggleDeleteChoices = this.toggleDeleteChoices.bind(this);
    this.toggleDeleteOption = this.toggleDeleteOption.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //console.log("Constructor", this.state);
  }

  componentDidMount() {
    this.props.getSingleTag(this.props.match.params.id);
    Axios.get(Constants.BASE_URL + `api/tags/${this.props.match.params.id}`)
    .then(res=>{console.log(res.data)
      this.setState({
        tag:res.data.tag,
        enable: res.data.enable
      })
    })
  }

  componentWillReceiveProps(data){console.log(data)
  }
  toggleDeleteChoices() {
    this.setState({
      DeleteChoices: !this.state.DeleteChoices
    });
  }
  toggleDeleteOption() {
    this.setState({
      DeleteOption: !this.state.DeleteOption
    });
  }

  handleChange = event => {

    this.setState({
      [event.target.name]: event.target.value,
      tag1:true
    });
  };

  handleSubmit = () => {
     this.props.editTag(this.props.match.params.id, {tag:this.state.tag, enable: this.state.enable});
    Axios.put(Constants.BASE_URL + `api/tags/${this.props.match.params.id}`,{tag:this.state.tag, enable: this.state.enable},
    {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    })
    .then(res=>{
                toastr.success('success', 'Updated successfully!')
                this.setState({
                  tag:""
                });
                this.props.history.goBack();
            })
            .catch(err => {
                console.log(err)
                toastr.error('Please Try again!')
            })
  };

  render() {console.log(this.props)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="10">
                    <h5>
                      <i className="icon-info" />
                      &nbsp;&nbsp; Edit Tag
                    </h5>
                  </Col>
                  <Col xs="2">
                      <AppSwitch
                        className={"mx-1"}
                        variant={"pill"}
                        color={"success"}
                        label
                        checked={this.state.enable}
                        onChange={
                          ()=>{this.setState({enable: !this.state.enable})}
                        }
                    />
                  </Col>
                  
                </Row>
              </CardHeader>
              <CardBody>
                <FormGroup row>
                  <Col xs="1">
                    <Label htmlFor="dishDiscount">
                      <strong>Tag Name</strong>
                    </Label>
                  </Col>
                  <Col xs="2">
                    <Form className={this.state.tag1?"was-validated":""}>
                          <Input
                            type="text"
                            id="dishDiscount"
                            name="tag"
                            placeholder="Enter new Tag"
                            value={this.state.tag}
                            onChange={this.handleChange}
                            required={true}
                          />
                           <FormFeedback className="help-block">
                             Please provide a valid information
                            </FormFeedback>
                            <FormFeedback valid className="help-block">
                             Input provided
                            </FormFeedback>
                    </Form>
                   
                  </Col>
                  <Col xs="2">
                    <button className="float-right btn-pill btn btn-danger btn-md" onClick={this.handleSubmit}
                      disabled={this.state.tag==""?true:false}
                    >
                       Edit Tag
                    </button>
                  </Col>
                  <Col xs="1">
                    <button className="float-right btn-pill btn btn-danger btn-md" onClick={()=>{this.props.history.goBack();}}>
                       cancel
                    </button>
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}


function mapStateToProps(state,props) {  
  return {
        getSingleTag: state.getSingleTag,
        editTag: state.editTag
      };
}
export default connect(mapStateToProps, { getSingleTag, editTag })(Tag);