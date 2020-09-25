import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import {Constants} from "../../../constants/environment";
import axios from "axios";
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
  Row,
  //Table
} from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import {getStoreTypesAction} from '../../../redux/actions/storeTypesActions'
import {getstore} from '../../../redux/actions/getStoreAction'
import {connect} from 'react-redux'

//import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
// const Widget03 = lazy(() => import("../../../views/Widgets/Widget03"));
import Auth from "../../../cookie/Auth"
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
    "Sunday 1/4/2019"
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

class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      display:[]
    };
  }

  async componentWillReceiveProps(data){
    
    var dashboardData = []; 
    var body = data.store_type.store_type;
    var temp = [];
    var data = []
    for ( var i = 0; i < body.length; i++) {
       dashboardData.push(body[i].storeTypeName)
       var storetype = body[i];
        await axios.get(Constants.BASE_URL + 'api/store-type/adminStoreDashboard/'+storetype._id,
        {
          headers: {
            //"content-type": "application/json",
            Authorization: "Bearer "+Auth.getToken('token'),
          }
        })
        .then(res=>{
              
              temp.push(res.data)
        })

    }
    for ( var i = 0;i<temp.length;i++){
      data[i] = [];
      data[i].push(dashboardData[i], temp[i])
    }
    this.setState({
      display:data
    })
}

  componentDidMount(){
    this.props.getstore();
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
    var time = new Date()
    var month = time.getMonthName()
    console.log(month)
    return (
      <div className="animated fadeIn">
        {this.state.display&&this.state.display.map((val, index)=>{
          return(
            <Row key={index}>
            <Col xs="12" sm="6" lg="3">
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
                      <i className="fa fa-cutlery fa-lg mt-4" />
                    </Dropdown>
                  </ButtonGroup>
                  <div className="text-value">{val[0]}</div>
                  <div>{val[1].store}</div>
                </CardBody>
                <div className="chart-wrapper mx-3" style={{ height: "50px" }} />
              </Card>
            </Col>
            <Col xs="12" sm="6" lg="5">
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
                  <div className="text-value">{ month+" Orders"}</div>
                  <div>{val[1].order}</div>
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
                      <i className="icon-people" />
                    </ButtonDropdown>
                  </ButtonGroup>
                  <div className="text-value">TOTAL USERS</div>
                  <div>{val[1].order}</div>
                </CardBody>
                <div className="chart-wrapper mx-3" style={{ height: "50px" }} />
              </Card>
            </Col>
          </Row>
         
          )
        })}
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


function mapStateToProps(state, props) {
  return { store_type: state.store_type };
}
export default  connect(mapStateToProps, {getstore, getStoreTypesAction})(AdminDashboard);