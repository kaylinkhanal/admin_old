import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {Constants} from "../../../constants/environment";
import {toastr} from 'react-redux-toastr';
import { connect } from "react-redux";
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
import { getTags, createTag } from  "../../../redux/actions/tagAction";

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DeleteChoices: false,
      DeleteOption: false,
      tags:[],
      newTag:null
    };
    this.toggleDeleteChoices = this.toggleDeleteChoices.bind(this);
    this.toggleDeleteOption = this.toggleDeleteOption.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //console.log("Constructor", this.state);
  }

  componentDidMount() {
    this.props.getTags();
    console.log(this.props);
    
    // var user_id = Auth.getToken("userId");console.log(user_id);
    // Axios.get(Constants.BASE_URL + `api/tags?store=${user_id}`)
    // .then(res=>{
    //   this.setState({
    //     tags:res.data
    //   })
    // })
  }

  componentWillReceiveProps(data){
    this.setState({
      tags: data.tags.tags
    })
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
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    this.props.createTag({ tag:this.state.newTag, restaurantID:user_id });
    var user_id = Auth.getToken("userId");
    Axios.post(Constants.BASE_URL + `api/tags?store=${user_id}`,{tag:this.state.newTag, restaurantID:user_id},
    {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    })
    .then(res=>{
                this.state.tags.push(res.data)
                toastr.success('success', 'Added successfully!')
                this.setState({
                  newTag:""
                })
            })
            .catch(err => {
                console.log(err)
                toastr.error('Please Try again!')
            })
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="6">
                    <h5>
                      <i className="icon-info" />
                      &nbsp;&nbsp; App Tags
                    </h5>
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
                    <Form className={this.state.newTag!=null?"was-validated":""}>
                          <Input
                            type="text"
                            id="dishDiscount"
                            name="newTag"
                            placeholder="Enter new Tag"
                            value={this.state.newTag}
                            onChange={this.handleChange}
                            required={this.state.newTag === ""?true:false}
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
                      disabled={this.state.newTag===""||this.state.newTag===null?true:false}
                    >
                      + Add Tag
                    </button>
                  </Col>
                </FormGroup>
                <br />
                <br />
                <Row>
                  <Col xs="6">
                    <Table responsive hover size="lg">
                      <thead>
                        <tr>
                          <th>Tag Name</th>
                          <th>Update</th>
                          <th>Enable</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.tags&&this.state.tags.map((tag, index) => {
                          return(
                             <tr key={index}>
                          <td>
                            <p>{tag.tag}</p>
                          </td>
                          <td>
                            <Link to={"/Restaurant/Tag/edit/"+tag._id}><i className="icon-note" title="Edit" /></Link>
                          </td>
                          <td>
                            <AppSwitch
                              className={"mx-1"}
                              variant={"pill"}
                              color={"success"}
                              label
                              checked={tag.enable}
                              onChange={()=>{axios.get(Constants.BASE_URL + `api/tags/activation/${tag._id}`,
                              {
                                headers: {
                                  //"content-type": "application/json",
                                  Authorization: "Bearer "+Auth.getToken('token'),
                                }
                              })
                                .then(res=>{toastr.success('Success', tag.tag+' Status Updated!')})
                                .catch(err=>{toastr.warning('Warning', 'Please Try again!')})
                              }}
                            />
                          </td>
                        </tr>
                          )
                        })}
                       
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

// export default Tags;
function mapStateToProps(state,props) {  
  return {tags:state.tags,
          newTag:state.newTag
      };
}


export default connect(mapStateToProps, { getTags, createTag })(Tags);

