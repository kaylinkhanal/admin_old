import React, { Component } from "react";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  BrowserRouter
} from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { connect } from "react-redux";
import Loadable from "react-loadable";
import { getMeAction } from "./redux/actions/authActions";
import { getOrderByLocation } from "./redux/actions/orderActions";
import Auth from "./cookie/Auth.js";
import "./App.scss";
var token = "";
const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = Loadable({
  loader: () => import("./containers/DefaultLayout"),
  loading,
  delay: 3000
});

const AdminDashboard = React.lazy(() =>
  import("./views/Users/Administrator/AdminDashboard")
);

// Pages
const Login = Loadable({
  loader: () => import("./views/Pages/Login"),
  loading,
  delay: 3000
});

const Register = Loadable({
  loader: () => import("./views/Pages/Register"),
  loading
});

const Page404 = Loadable({
  loader: () => import("./views/Pages/Page404"),
  loading
});

const Page500 = Loadable({
  loader: () => import("./views/Pages/Page500"),
  loading
});
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false
    };
  }
  componentWillMount() {
    token = Auth.getToken("token");
    //this.props.getOrderByLocation();
    //this.props.getMeAction(token);
  }
  render() {
    let main = "";
    token = Auth.getToken("token");
    var role = Auth.getToken("role");
    if (token != "" && token != "failed") {
      main = <Route path="/" name="Home" component={DefaultLayout} />;
    } else {
      main = <Redirect exact to="/login" />;
    }

    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route
            exact
            path="/register"
            name="Register Page"
            component={Register}
          />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          {main}
        </Switch>
      </HashRouter>
    );
  }
}

function mapStateToProps(state, props) {
  return { token: state.auth.token, user: state.auth.user };
}

export default connect(mapStateToProps, { getMeAction, getOrderByLocation })(
  App
);
