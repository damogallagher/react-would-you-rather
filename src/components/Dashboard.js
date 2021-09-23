import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question.js";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class Dashboard extends Component {
  state = {
    value: 0,
  };
  handleChange = (event, newValue) => {
    this.setState(() => ({
      value: newValue,
    }));
  };

  render() {
    const { value } = this.state;
    /*return (
      <div>
        <h3 className="center">Your Timeline</h3>
        <ul className="dashboard-list">
          {this.props.questionIds.map((id) => (
            <li key={id}>
              <Question questionId={id}/>
            </li>
          ))}
        </ul>
      </div>
    );*/
    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
          <div>
            <p className="center">Your Timeline</p>
            <ul className="dashboard-list">
              {this.props.questionIds.map((id) => (
                <li key={id}>
                  <Question questionId={id} />
                </li>
              ))}
            </ul>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
    );
  }
}
function mapStateToProps({ questions }) {
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Dashboard);
