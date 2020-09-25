import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Redirect, Route, Switch } from "react-router-dom";
import Auth from "../../cookie/Auth";
import {
  // Badge,
  // Button,
  ButtonDropdown,
  ButtonGroup,
  //ButtonToolbar,
  Card,
  CardBody,
  //CardFooter,
  CardHeader,
  //CardTitle,
  Col,
  Dropdown,
  // DropdownItem,
  // DropdownMenu,
  // DropdownToggle,
  // Progress,
  Row
  //Table
} from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";

//const Widget03 = lazy(() => import("../../views/Widgets/Widget03"));

// const brandPrimary = getStyle("--primary");
// const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
// const brandWarning = getStyle("--warning");
// const brandDanger = getStyle("--danger");

// Card Chart 2
const cardChartData2 = {
  labels: [
    "Monday 1/4/2019",
    "Tuesday 2/4/2019",
    "Wednesday 3/4/2019",
    "Thursday 3/4/2019",
    "Friday 3/4/2019",
    "Saturday 5/4/2019",
    "Sunday 1/4/2019",
    "Monday 1/4/2019",
    "Tuesday 2/4/2019",
    "Wednesday 3/4/2019",
    "Thursday 3/4/2019",
    "Friday 3/4/2019",
    "Saturday 5/4/2019",
    "Sunday 1/4/2019",
    "Monday 1/4/2019",
    "Tuesday 2/4/2019",
    "Wednesday 3/4/2019",
    "Thursday 3/4/2019",
    "Friday 3/4/2019",
    "Saturday 5/4/2019",
    "Sunday 1/4/2019",
    "Monday 1/4/2019",
    "Tuesday 2/4/2019",
    "Wednesday 3/4/2019",
    "Thursday 3/4/2019",
    "Friday 3/4/2019",
    "Saturday 5/4/2019",
    "Sunday 1/4/2019",
    "Monday 2/4/2019"
  ],
  datasets: [
    {
      label: "Orders",
      backgroundColor: brandInfo,
      borderColor: "rgba(255,255,255,.55)",
      data: [
        1,
        18,
        9,
        17,
        34,
        22,
        11,
        1,
        18,
        9,
        17,
        34,
        22,
        11,
        1,
        18,
        9,
        17,
        34,
        22,
        11,
        1,
        18,
        9,
        17,
        34,
        22,
        11
      ]
    }
  ]
};
const bar = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent"
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent"
        }
      }
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5
        }
      }
    ]
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
};

// Card Chart 4
const cardChartData4 = {
  labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  datasets: [
    {
      label: "Tel Aviv Fish",
      backgroundColor: "rgba(255,255,255,.3)",
      borderColor: "transparent",
      data: [22, 17, 44]
    }
  ]
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  }
};

// Main Chart

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    var role = Auth.getToken("role");
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown
                    id="card1"
                    isOpen={this.state.card1}
                    toggle={() => {
                      this.setState({ card1: !this.state.card1 });
                    }}
                  >
                    <i className="icon-basket-loaded" />
                  </ButtonDropdown>
                </ButtonGroup>
                <div className="text-value">APRIL ORDERS</div>
                <div>28</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: "50px" }}>
                <Line
                  data={cardChartData2}
                  options={cardChartOpts2}
                  height={70}
                />
              </div>
            </Card>
          </Col>
          {role === "Admin" ? (
            <Redirect
              from="/dashboard"
              to="/Users/Administrator/AdminDashboard"
            />
          ) : (
            <Redirect from="/dashboard" to="/dashboard" />
          )}
          <Col xs="12" sm="6" lg="2">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown
                    id="card2"
                    isOpen={this.state.card2}
                    toggle={() => {
                      this.setState({ card2: !this.state.card2 });
                    }}
                  >
                    <i className="icon-layers" />
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">CATEGORIES</div>
                <div>5</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: "50px" }} />
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="2">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown
                    id="card3"
                    isOpen={this.state.card3}
                    toggle={() => {
                      this.setState({ card3: !this.state.card3 });
                    }}
                  >
                    <i className="icon-layers" />
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">PRODUCTS</div>
                <div>12</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: "50px" }} />
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="2">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown
                    id="card4"
                    isOpen={this.state.card4}
                    toggle={() => {
                      this.setState({ card4: !this.state.card4 });
                    }}
                  >
                    <i className="icon-location-pin" />
                  </ButtonDropdown>
                </ButtonGroup>
                <div className="text-value">LOCATION</div>
                <div>3</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: "50px" }}>
                <Bar
                  data={cardChartData4}
                  options={cardChartOpts4}
                  height={70}
                />
              </div>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="2">
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown
                    id="card4"
                    isOpen={this.state.card4}
                    toggle={() => {
                      this.setState({ card4: !this.state.card4 });
                    }}
                  >
                    <i className="icon-location-pin" />
                  </ButtonDropdown>
                </ButtonGroup>
                <div className="text-value">USERS</div>
                <div>653</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: "50px" }}>
                <Bar
                  data={cardChartData4}
                  options={cardChartOpts4}
                  height={70}
                />
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>Monthly Chart</CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <Bar data={bar} options={options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
