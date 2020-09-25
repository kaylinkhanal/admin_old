import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Constants } from "../../constants/environment";
import Clock from 'react-live-clock';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import PropTypes from "prop-types";
import moment from "moment";
import Auth from "../../cookie/Auth";
import {
  AppAsideToggler,
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";
import logo from "../../assets/img/brand/logo.svg";
import sygnet from "../../assets/img/brand/sygnet.svg";

(function() {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  Date.prototype.getMonthName = function() {
    return months[this.getMonth()];
  };
  Date.prototype.getDayName = function() {
    return days[this.getDay()];
  };
})();


const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};



class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id:'',
      date:new Date(),
      d:new Date(),
      popupVisible: false
  }
  this.handleClick = this.handleClick.bind(this);
  this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }
  componentDidMount() 
  {
    const userId = Auth.getToken("userId");
    this.setState({
      user_id: userId,
    });
  }

  handleClick() {
    if (!this.state.popupVisible) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
       popupVisible: !prevState.popupVisible,
    }));
  }
  
  handleOutsideClick(e) {
    // console.log(e.target.attributes.tabindex);return;
    if(e.target.attributes.tabindex == undefined) {
      this.setState({
        popupVisible: true
      })
    }
    // ignore clicks on the component itself
    // if (this.node.contains(e.target)) {
    //   return;
    // }
    
     this.handleClick();
  }

  callMe(){
    setInterval(()=>{
      this.setState({date:new Date()})
    }, 1000*40)
  }
   
  // dropdown(e) {
  //   if(e.target.className == "img-avatar"){
  //     document.getElementById('dropdown').style.display = "block";
  //   } else {
  //     document.getElementById('dropdown').style.display = "none";
  //   }
  // }
 
  // toggle() {
  //   this.setState({
  //     dropdownOpen: !this.state.dropdownOpen
  //   });
  // }


  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    var dd = this.state.date
    var ff = dd.getDate();
    var month = dd.getMonthName();
    var day = dd .getDayName();
    var time = moment(dd).format("YYYY hh:mm A");

    return (
      <React.Fragment >
        {/**<AppSidebarToggler className="d-lg-none" display="md" mobile /> */}
        {window.innerWidth > 980 ? (
          <AppNavbarBrand
            full={{ src: logo, width: 89, height: 25, alt: "CoreUI Logo" }}
            minimized={{
              src: sygnet,
              width: 30,
              height: 30,
              alt: "CoreUI Logo"
            }}
          />
        ) : (
          ""
        )}

        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/">Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#/users">Users</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Settings</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
         
          {/* <h4>{day+"  "}{'  '}{month}{'  '}{ff+', '+time}</h4>
          {this.callMe()} */}
          <Clock
            //date={'1997-12-31T14:15:23+01:00'}
            format={'dddd, MMMM Mo, YYYY, h:mm:ss A'}
            ticking={true}
            //timezone={'Australia/Sydney'} 
            style={{fontSize:"25px"}}
          />
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-bell" />
              <Badge pill color="danger">
                5
              </Badge>
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-list" />
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-location-pin" />
            </NavLink>
          </NavItem>
          <AppHeaderDropdown direction="down" >
       
            {/* <DropdownToggle nav> */}
            <a aria-haspopup="true"  className="nav-link" aria-expanded="false" id="avatar" onClick={this.handleClick}>
              <img
                src={"../../assets/img/avatars/6.jpg"}
                className="img-avatar"
                alt="admin@bootstrapmaster.com"
              />
            </a>
            {/* </DropdownToggle> */}
            <DropdownMenu right style={{ right: "-50px", display: this.state.popupVisible?"block":"none" }} id="dropdown">
          
              <DropdownItem header tag="div" className="text-center">
                <strong>Account</strong>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-bell-o" /> Updates
                <Badge color="info">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-envelope-o" /> Messages
                <Badge color="success">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-tasks" /> Tasks
                <Badge color="danger">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-comments" /> Comments
                <Badge color="warning">42</Badge>
              </DropdownItem>
              <DropdownItem header tag="div" className="text-center">
                <strong>Settings</strong>
              </DropdownItem>
              <DropdownItem tag={Link} to={"/users/details/"+this.state.user_id}>
                 
                  <i className="fa fa-user" /> Profile
                
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-wrench" /> Settings
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-usd" /> Payments
                <Badge color="secondary">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-file" /> Projects
                <Badge color="primary">42</Badge>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <i className="fa fa-shield" /> Lock Account
              </DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
