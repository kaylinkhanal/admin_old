import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import Auth from "../../cookie/Auth";
import { Constants } from "../../constants/environment";
import axios from "axios";
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";
// routes config
import admin_navigation from "../../admin_nav";
import routes from "../../routes";
import { logoutAction, getMeAction } from "../../redux/actions/authActions";
import {
  getOrderByLocation,
  resetOrders
} from "../../redux/actions/orderActions";

const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      path: "",
      dashboard: []
    };
  }

  loading = () => {
    return <div className="animated fadeIn pt-1 text-center">Loading...</div>;
  };

  componentWillReceiveProps(props) {
    var role = Auth.getToken("role");
    var path = props.location.pathname;
    this.setState({
      path: path
    });
  }
  componentDidMount() {
    var user_id = Auth.getToken("userId");
    axios
      .get(Constants.BASE_URL + `api/store/store-owner/${user_id}`, {
        headers: {
          //"content-type": "application/json",
          Authorization: "Bearer " + Auth.getToken("token")
        }
      })
      .then(res => {
        const data = res.data;
        this.setState({
          dashboard: data
        });
      });
  }
  signOut(e) {
    e.preventDefault();
    this.props.logoutAction("token", "");
    this.props.logoutAction("role", "");
    this.props.resetOrders();

    this.props.history.push("/login");
  }
  render() {
    var role = Auth.getToken("role");
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense fallback={this.loading()}>
              {role === "Admin" ? (
                <AppSidebarNav
                  navConfig={
                    this.props.new_navigation
                      ? this.props.new_navigation
                      : admin_navigation
                  }
                  {...this.props}
                />
              ) : (
                <AppSidebarNav
                  navConfig={
                    this.props.new_navigation
                      ? this.props.new_navigation
                      : navigation
                  }
                  {...this.props}
                />
              )}
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {this.state.path != "/dashboard" ? (
              <Suspense fallback={this.loading()}>
                <AppBreadcrumb appRoutes={routes} />
              </Suspense>
            ) : (
              <Suspense fallback={this.loading()}>
                <div>
                  <nav className="breadcrumb" style={{ height: "52px" }}>
                    {this.state.dashboard ? (
                      <ol aria-label="breadcrumb">
                        <li
                          className="breadcrumb-item"
                          style={{ float: "left", listStyleType: "none" }}
                        >
                          <a style={{ fontSize: "120%" }}>
                            {this.state.dashboard[0].storetype[0].storeTypeName}
                          </a>
                        </li>
                        <li
                          className="breadcrumb-item"
                          style={{ float: "left", listStyleType: "none" }}
                        >
                          <a style={{ fontSize: "120%" }}>
                            {this.state.dashboard[0].storeName}
                          </a>
                        </li>
                      </ol>
                    ) : (
                      ""
                    )}
                  </nav>
                </div>
              </Suspense>
            )}

            <Container fluid className="pr-0 pl-0 pl-md-3 pr-md-3">
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  {role === "Admin" ? (
                    <Redirect
                      from="/"
                      to="/Users/Administrator/AdminDashboard"
                    />
                  ) : (
                    <Redirect from="/" to="/Restaurant/products" />
                  )}
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return { token: state.auth.token };
}

export default connect(mapStateToProps, {
  logoutAction,
  getMeAction,
  getOrderByLocation,
  resetOrders
})(DefaultLayout);
