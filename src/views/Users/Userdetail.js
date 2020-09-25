import React, { Component } from "react";
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
  Row
} from "reactstrap";

import Auth from "../../cookie/Auth";
import axios from "axios";
import { Constants } from "../../constants/environment";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_validation: "",
      confirm_password_validation: false,
      old_password_validation: false,
      user_id: "",
      toggle_change_password: false,
      toggle_change_email: false,
      update_user_info: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        newEmail: ""
      },
      user_info: {
        user_name: "",
        user_email: "",
        user_role: ""
      }
    };
  }

  componentDidMount() {
    const userId = Auth.getToken("userId");
    const token = Auth.getToken("token");
    this.setState({
      user_id: userId
    });
    axios
      .get(Constants.BASE_URL + "api/users/" + userId + "/" + token,
      {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer "+Auth.getToken('token'),
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          user_info: {
            user_name: res.data.name,
            user_email: res.data.email,
            user_role: res.data.role
          }
        });
      });
  }

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
    axios
      .post(Constants.BASE_URL + "api/users/update-password", {
        _id: this.state.user_id,
        oldPassword: update_user_info.oldPassword,
        newPassword: update_user_info.newPassword
      },
      {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer "+Auth.getToken('token'),
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          old_password_validation: false,
          update_user_info: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
          }
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          old_password_validation: true,
          update_user_info: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
          }
        });
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
    axios
      .post(Constants.BASE_URL + "api/users/update-email", {
        user_id: this.state.user_id,
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
      });
  };

  render() {
    const { user_info } = this.state;
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
              <Label htmlFor="dishTotalPrice">{user_info.user_name}</Label>
            </Col>
            <Col xs="2">
              <Label htmlFor="dishTotalPrice">{user_info.user_email}</Label>
            </Col>
            <Col xs="2">
              <Label htmlFor="dishTotalPrice">{user_info.user_role}</Label>
            </Col>
          </FormGroup>

          <Row>
            <Col xs={"12"} sm={"6"}>
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
              {this.state.toggle_change_password ? (
                <Col>
                  <FormGroup row>
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
                        id="oldPassword"
                      />
                    </Col>
                  </FormGroup>
                  {this.state.old_password_validation ? (
                    <p style={{ color: "red" }}>
                      Your password is not correct.{" "}
                    </p>
                  ) : (
                    ""
                  )}
                  <FormGroup row>
                    <Col xs="4">
                      <Label htmlFor="dishTotalPrice">
                        <strong>New Password</strong>
                      </Label>
                    </Col>
                    <Col xs="8">
                      <Input
                        type="password"
                        id="newPassword"
                        onChange={this.onChangeInputValue}
                        invalid={this.state.confirm_password_validation}
                        name="newPassword"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="4">
                      <Label htmlFor="dishTotalPrice">
                        <strong>Conform New Password</strong>
                      </Label>
                    </Col>
                    <Col xs="8">
                      <Input
                        type="password"
                        onChange={this.onChangeInputValue}
                        id="confirmPassword"
                        invalid={this.state.confirm_password_validation}
                        name="confirmPassword"
                      />
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
              {this.state.toggle_change_email ? (
                <Col>
                  <FormGroup row>
                    <Col xs="4">
                      <Label htmlFor="dishTotalPrice">
                        <strong>Old Email</strong>
                      </Label>
                    </Col>
                    <Col xs="8">
                      <Input
                        type="text"
                        value={user_info.user_email}
                        disabled
                        id="dishDiscount"
                        name="dishDiscount"
                      />
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
                      />
                    </Col>
                  </FormGroup>
                  <Col xs="6">
                    <FormGroup>
                      <Button
                        type="button"
                        size="md"
                        color="success"
                        onClick={this.handleUpdateEmail}
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

export default User;
