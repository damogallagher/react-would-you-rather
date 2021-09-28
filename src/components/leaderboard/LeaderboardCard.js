import React from "react";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Badge from "@mui/material/Badge";
import StarIcon from "@mui/icons-material/Star";

export function LeaderboardCard(props) {    
    // destructure values we need
    const { userId, index } = props

    const users = useSelector((state) => state.users);
    const user = users[userId];
    const answeredQuestions = Object.keys(user.answers).length;
    const questionsCreated = user.questions.length;
    const totalScore = questionsCreated + answeredQuestions
    const { avatarURL, name } = user;

    return (
      <span>
        <Paper sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item>
              <Badge badgeContent={index + 1} color="primary">
                <StarIcon color="action" />
              </Badge>
              <Avatar alt={name} src={avatarURL} />
            </Grid>
            <Grid item md={9} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <b>Answered Questions:</b> {answeredQuestions}
                    <br />
                    <b>Questions Created:</b> {questionsCreated}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <b>Score</b> <br />
              <br />
              {totalScore}
            </Grid>
          </Grid>
        </Paper>
      </span>
    );

}

LeaderboardCard.propTypes = {
  userId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};