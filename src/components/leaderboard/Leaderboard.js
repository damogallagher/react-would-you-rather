import React from "react";
import { useSelector } from "react-redux";
import LeaderboardCard from "./LeaderboardCard.js";
import Box from "@mui/material/Box";

export function Leaderboard() {  
  const users = useSelector((state) => state.users);
  const leaderboardUsers = [];
  Object.keys(users).forEach((userId) => {
    const user = users[userId];
    user.totalCount = user.questions.length + Object.keys(user.answers).length;
    leaderboardUsers.push(user);
  });
  leaderboardUsers.sort((a, b) => b.totalCount - a.totalCount);

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
};
