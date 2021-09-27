import React, { Component } from "react";
import { connect } from "react-redux";
import LeaderboardCard from "./LeaderboardCard.js";
import Box from "@mui/material/Box";
class Leaderboard extends Component {
  render() {
    const { leaderboardUsers } = this.props;
    return (
      <Box sx={{ width: "100%" }}>
        <div>
          <ul className="users-array-list">
            {leaderboardUsers.map((leaderboardUser, index) => (
              <li key={leaderboardUser.id}>
                <LeaderboardCard userId={leaderboardUser.id} index={index} />
              </li>
            ))}
          </ul>
        </div>
      </Box>
    );
  }
}

function mapStateToProps({ users }) {
  const leaderboardUsers = [];
  Object.keys(users).forEach((userId) => {
    const user = users[userId];
    user.totalCount = user.questions.length + Object.keys(user.answers).length;
    leaderboardUsers.push(user);
  });
  leaderboardUsers.sort((a, b) => b.totalCount - a.totalCount);
  return {
    leaderboardUsers,
  };
}

export default connect(mapStateToProps)(Leaderboard);
