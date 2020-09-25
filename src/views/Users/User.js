import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserById } from "../../redux/actions/userAction";
import {toastr} from 'react-redux-toastr'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  FormFeedback
} from "reactstrap";
// import {
//   AppAside,
//   AppBreadcrumb,
//   AppFooter,
//   AppHeader,
//   AppSidebar,
//   AppSidebarFooter,
//   AppSidebarForm,
//   AppSidebarHeader,
//   AppSidebarMinimizer,
//   AppSidebarNav
// } from "@coreui/react";

import Auth from "../../cookie/Auth";
import axios from "axios";
import { Constants } from "../../constants/environment";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      req:false,
      email_validation: "",
      confirm_password_validation: true,
      old_password_validation: false,
      user_id: "",
      toggle_change_password: false,
      toggle_change_email: false,
      update_user_info: {
        oldPassword: null,
        newPassword: null,
        confirmPassword: null,
        newEmail: null
      },
      cookieid:'',
      user_info: {
        user_name: "",
        user_email: "",
        user_role: ""
      }
    };
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );
  componentWillReceiveProps(data){
   
    const user = data.user.user;
    const user_id = data.match.params.id;
    this.setState({
      user_id: user_id,
      user_info:{
        user_name:user.name,
        user_email:user.email,
        user_role:user.role
      }
    });
  }
  componentDidMount() {
    const userId = Auth.getToken("userId");
    this.setState({
      cookieid:userId
    })
    const token = Auth.getToken("token");
    const user_id = this.props.match.params.id;
    this.props.getUserById(user_id);
    const user = this.props.user;
    
    this.setState({
      user_id: user_id,
      user_info:{
        uer_name:user.name,
        user_email:user.email,
        user_role:user.role
      }
    });
   }
 
    // axios
    //   .get(Constants.BASE_URL + "api/users/" + userId + "/" + token)
    //   .then(res => {
    //     console.log(res.data);
    //     this.setState({
    //       user_info: {
    //         user_name: res.data.name,
    //         user_email: res.data.email,
    //         user_role: res.data.role
    //       }
    //     });
    //   });
  
  
    onChangeInputValue = e => {
    const { update_user_info } = this.state;
    update_user_info[e.target.name] = e.target.value;
    if (e.target.name === "newEmail") {
      this.setState({
        email_validation: e.target.value.match(
          /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
        )
          ? ""
          : "not validation"
      });
    }
    if (e.target.name === "confirmPassword") {
      if (update_user_info.newPassword !== update_user_info.confirmPassword) {
        this.setState({
          confirm_password_validation: true
        });
      } else {
        this.setState({
          confirm_password_validation: false
        });
      }
    }
    this.setState({
      update_user_info
    });
    this.setState({
      req:true
    })
  };
  handleToggleChangePassword = () => {
    this.setState({
      toggle_change_password: !this.state.toggle_change_password
    });
  };
  handleToggleChangeEmail = () => {
    this.setState({
      toggle_change_email: !this.state.toggle_change_email
    });
  };

  handleUpdatePassword = () => {
    const { update_user_info } = this.state;
    var user_id = this.state.user_id;
    axios
      .post(Constants.BASE_URL + "api/users/update-password/"+user_id, {
        user_id: this.state.user_id,
        oldPassword: update_user_info.oldPassword,
        updated_password: update_user_info.newPassword
      },
      {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer "+Auth.getToken('token'),
        }
      })
      .then(res => {
        
        if(res.data._id){
        this.setState({
          old_password_validation: false,
          update_user_info: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
          }
        });
        toastr.success('success', 'Updated successfully!')
        }
        if(res.data.auth){
          this.setState({
            old_password_validation: false,
            update_user_info: {
              oldPassword: "",
              newPassword: "",
              confirmPassword: ""
            }
          });
          toastr.warning('Warning', 'The old password does not match!')
        }
      })
      .catch(err => {
        
        this.setState({
          old_password_validation: true,
          update_user_info: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
          }
        });
        toastr.error('Please try again!')
      });
    this.setState({
      update_user_info: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      }
    });
  };
  handleUpdateEmail = () => {
    const { newEmail } = this.state.update_user_info;
    var user_id = this.state.user_id;

    axios
      .post(Constants.BASE_URL + "api/users/update-email/"+user_id, {
        user_id: user_id,
        updated_email: newEmail
      },
      {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer "+Auth.getToken('token'),
        }
      })
      .then(res => {
        this.setState({
          user_info: {
            user_name: res.data.name,
            user_email: res.data.email,
            user_role: res.data.role
          },
          update_user_info: {
            newEmail: ""
          }
        });
        toastr.success('success', 'Updated successfully!')
      });
      
  };

  render() {
    const {user} = this.props.user
    var compare;
    if(this.state.cookieid === this.state.user_id)
      compare = true;
    else
      compare = false;
      
    return (
      <Card>
         
        <CardHeader>
          <h5>
            <i className="icon-user" />
            &nbsp;&nbsp; User Profile
          </h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="2">
              <Label htmlFor="dishDiscount">
                <strong>Name</strong>
              </Label>
            </Col>
            <Col xs="2">
              <Label htmlFor="dishPrice">
                <strong>Email</strong>
              </Label>
            </Col>
            <Col xs="2">
              <Label htmlFor="dishTotalPrice">
                <strong>Role</strong>
              </Label>
            </Col>
          </Row>
          <FormGroup row>
            <Col xs="2">
              <Label htmlFor="dishTotalPrice">{this.state.user_info.user_name}</Label>
            </Col>
            <Col xs="2">
              <Label htmlFor="dishTotalPrice">{this.state.user_info.user_email}</Label>
            </Col>
            <Col xs="2">
              <Label htmlFor="dishTotalPrice">{this.state.user_info.user_role}</Label>
            </Col>
          </FormGroup>

          <Row>
            <Col xs={"12"} sm={"6"}>
              <Form className="was-validated">
                <FormGroup check style={{ margin: "20px" }}>
                <Input
                  onClick={this.handleToggleChangePassword}
                  className="form-check-input"
                  type="checkbox"
                  id="changePassword"
                  name="changePassword"
                />
                
                <Label
                  check
                  className="form-check-label"
                  htmlFor="changePassword"
                >
                  Change Password
                </Label>
              </FormGroup>
              </Form>
              
              {this.state.toggle_change_password ? (
                <Col>
               
                  {compare?( <Form className={this.state.update_user_info.oldPassword !== null?"was-validated":""}><FormGroup row>
                    <Col xs="4">

                      <Label htmlFor="dishTotalPrice">
                        <strong>Old Password</strong>
                      </Label>
                    </Col>
                    <Col xs="8">
                      <Input
                        type="password"
                        name={"oldPassword"}
                        onChange={this.onChangeInputValue}
                        invalid={this.state.old_password_validation}
                        value={this.state.update_user_info.oldPassword}
                        id="oldPassword"
                        required={this.state.req}
                      />
                       <FormFeedback className="help-block">
                      Please enter old password
                    </FormFeedback>
                    
                    </Col>
                  </FormGroup></Form> ):('')}
                
                  {/* {this.state.old_password_validation ? (
                    <p style={{ color: "red" }}>
                      Your password is not correct.{" "}
                    </p>
                  ) : (
                    ""
                  )} */}


                  <FormGroup row>
                    <Col xs="4">
                      <Label htmlFor="dishTotalPrice">
                        <strong>New Password</strong>
                      </Label>
                    </Col>
                    <Col xs="8">
                      <Form className={this.state.update_user_info.newPassword?"was-validated":""}>
                        <Input
                        type="password"
                        id="newPassword"
                        value={this.state.update_user_info.newPassword}
                        onChange={this.onChangeInputValue}
                        //invalid={this.state.confirm_password_validation}
                        name="newPassword"
                        required={this.state.req}
                      />
                       <FormFeedback className="help-block">
                      Please enter new password
                    </FormFeedback>
                    
                      </Form>
                      
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="4">
                      <Label htmlFor="dishTotalPrice">
                        <strong>Conform New Password</strong>
                      </Label>
                    </Col>
                    <Col xs="8">
                      <Form className={this.state.update_user_info.confirmPassword?"was-validated":""}>
                          <Input
                        type="password"
                        onChange={this.onChangeInputValue}
                        id="confirmPassword"
                        value={this.state.update_user_info.confirmPassword}
                        //invalid={this.state.confirm_password_validation}
                        name="confirmPassword"
                        required={this.state.req}
                      />
                       <FormFeedback className="help-block">
                      Please enter confirm password
                    </FormFeedback>
                    
                      </Form>
                      
                    </Col>
                  </FormGroup>
                  <Col xs="6">
                    <Button
                      color="danger"
                      onClick={this.handleUpdatePassword}
                      disabled={this.state.confirm_password_validation}
                      className="mr-1"
                    >
                      Change Password
                    </Button>
                  </Col>
                </Col>
              ) : (
                ""
              )}
            </Col>
            <Col xs={"12"} sm={"6"}>
              <Form className="was-validated">
                  <FormGroup check style={{ margin: "20px" }}>
                <Input
                  className="form-check-input"
                  onClick={this.handleToggleChangeEmail}
                  type="checkbox"
                  id="changeEmail"
                  name="changeEmail"
                  value="true"
              
                />
                <Label check className="form-check-label" htmlFor="changeEmail">
                  Change Email
                </Label>
              </FormGroup>

              </Form>
              
              {this.state.toggle_change_email ? (
                <Col>
                  <FormGroup row>
                    <Col xs="4">
                      <Label htmlFor="dishTotalPrice">
                        <strong>Old Email</strong>
                      </Label>
                    </Col>
                    <Col xs="8">
                      <Form className="was-validated">
                        <Input
                        type="text"
                        value={user.email}
                        disabled
                        id="dishDiscount"
                        name="dishDiscount"
                        required={this.state.req}
                      />
                      </Form>
                      
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="4">
                      <Label htmlFor="dishTotalPrice">
                        <strong
                          style={{
                            color:
                              this.state.email_validation !== ""
                                ? "red"
                                : "black"
                          }}
                  
                        >
                          New Email
                        </strong>
                      </Label>
                    </Col>
                    <Col xs="8">
                      <Form className={this.state.update_user_info.newEmail !== null?"was-validated":""}>
                          <Input
                        type="email"
                        style={{
                          border:
                            this.state.email_validation !== ""
                              ? "1px solid red"
                              : "",
                          boxShadow:
                            this.state.email_validation !== ""
                              ? "1px 0px 5px 1px rgba(255,0,0,1)"
                              : ""
                        }}
                        onChange={this.onChangeInputValue}
                        value={this.state.update_user_info.newEmail}
                        id="newEmail"
                        name="newEmail"
                        required={this.state.req}
                      />
                       <FormFeedback className="help-block">
                      Please provide a valid information
                     </FormFeedback>
                     <FormFeedback valid className="help-block">
                      Input provided
                     </FormFeedback>
                      </Form>
                      
                    </Col>
                  </FormGroup>
                  <Col xs="6">
                    <FormGroup>
                      <Button
                        type="button"
                        size="md"
                        color="success"
                        onClick={this.handleUpdateEmail}
                        disabled={this.state.email_validation !== ""||this.state.update_user_info.newEmail==''?true:false }
                      >
                        Change Email
                      </Button>
                    </FormGroup>
                  </Col>
                </Col>
              ) : (
                ""
              )}
            </Col>
          </Row>

          <hr />
        </CardBody>
        <CardFooter />
      </Card>
    );
  }
}

function mapStateToProps(state, props) {
  return { user: state.user };
}
export default connect(
  mapStateToProps,
  { getUserById }
)(User);
