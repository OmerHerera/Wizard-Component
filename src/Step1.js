import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

export default function Step1({
  next,
  persistentStepsData,
  setPersistentStepsData
}) {
  const [error, setError] = useState(false);
  const [name, setName] = useState(persistentStepsData.step1.name);
  const [disabled, setDisabled] = useState(true && !name);
  const validate = ({ target: { value } }) => {
    if (!/[^a-zA-Z]/.test(value) && value !== "") {
      setError(false);
      setName(value);
      setDisabled(false);
    } else {
      setError(true);
      setName(value);
      setDisabled(true);
    }
  };
  const classes = useStyles();
  return (
    <Paper elevation={3}>
      <p>Step 1️⃣ </p>
      <FormControl>
        <TextField
          error={error}
          label="Name"
          required
          value={name}
          onChange={(e) => {
            validate(e);
          }}
          helperText={error ? "Only Text" : ""}
          type="text"
        />
      </FormControl>
      <div className={classes.root}>
        <Button
          disabled={disabled}
          onClick={() => {
            setPersistentStepsData({
              ...persistentStepsData,
              ...{ step1: { name: name } }
            });
            next(2);
          }}
          variant="contained"
          color="primary"
        >
          Next
        </Button>
        <Button
          disabled={disabled}
          onClick={() => {
            setPersistentStepsData({
              ...persistentStepsData,
              ...{ step1: { name: name } }
            });
            next(0);
          }}
          variant="contained"
          color="primary"
        >
          Previous
        </Button>
      </div>
    </Paper>
  );
}
