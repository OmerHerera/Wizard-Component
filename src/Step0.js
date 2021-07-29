import React, { useState, useRef } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import UndoIcon from "@material-ui/icons/Undo";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

export default function Step0({
  next,
  persistentStepsData,
  setPersistentStepsData
}) {
  const [error, setError] = useState(false);
  const [name, setName] = useState(persistentStepsData.step0.name);
  const [undos, setUndos] = useState([]);
  const [disabled, setDisabled] = useState(true && !name);
  const delayedSetup = useRef(
    _.debounce((e) => setUndos((undos) => [...undos, e]), 500)
  ).current;
  const validate = ({ target: { value } }) => {
    if (!/[^a-zA-Z]/.test(value) && value !== "") {
      setError(false);
      setName(value);
      setDisabled(false);
      console.log("Calling");
      delayedSetup(value);
    } else {
      setError(true);
      setName(value);
      setDisabled(true);
    }
  };
  const classes = useStyles();
  const undo = () => {
    console.log(`undos: ${undos}`);
    let prev = undos.pop();
    if (prev === name) {
      prev = undos.pop();
    }
    console.log(`undo: ${prev}`);
    prev && setName(prev);
  };
  return (
    <Paper elevation={3}>
      <p>Step 0️⃣ </p>
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
        <Button
          disabled={undos.length >= 1 ? false : true}
          onClick={undo}
          size="small"
          variant="contained"
          color="default"
          startIcon={<UndoIcon />}
        >
          Undo
        </Button>
      </FormControl>
      <div className={classes.root}>
        <Button
          disabled={disabled}
          onClick={() => {
            setPersistentStepsData({
              ...persistentStepsData,
              ...{ step0: { name: name } }
            });
            next(1);
          }}
          variant="contained"
          color="primary"
        >
          Next
        </Button>
      </div>
    </Paper>
  );
}
