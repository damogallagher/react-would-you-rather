import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { handleAddQuestion } from "../../actions/shared";
import { Redirect } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export function NewQuestion(props) {  

  const dispatch = useDispatch();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [toHome, setToHome] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.toLowerCase() === 'optionone') {
      setOptionOne(value)
    } else if (name.toLowerCase() === 'optiontwo') {
      setOptionTwo(value)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleAddQuestion(optionOne, optionTwo));
    setOptionOne("")
    setOptionTwo("")
    setToHome(true)
  };

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <span>
        <Paper sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}>
          <Grid item md={12} sm container>
            <Grid
              item
              md
              container
              direction="column"
              spacing={1}
              align="center"
              justify="center"
              alignItems="center"
            >
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  style={{ fontWeight: "bold" }}
                >
                  Create New Question
                </Typography>
                <Typography variant="body2">Complete the question</Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  style={{ fontWeight: "bold" }}
                >
                  Would you rather...
                </Typography>
                <Fragment>
                  <TextField
                    name="optionOne"
                    label="Option 1"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <Typography variant="body2" gutterBottom>
                    or
                  </Typography>
                  <TextField
                    name="optionTwo"
                    label="Option 2"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <Typography variant="body2" color="text.secondary">
                    <br />
                    <br />
                    <Button
                      variant="contained"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Submit Question
                    </Button>
                  </Typography>
                </Fragment>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </span>
    );
  
}


