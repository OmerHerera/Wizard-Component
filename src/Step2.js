import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
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

export default function Step2({
  next,
  persistentStepsData,
  setPersistentStepsData
}) {
  const [open, setOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState(persistentStepsData.step2.name);
  const [disabled, setDisabled] = useState(true && !name);
  useEffect(() => {
    if (complete) {
      setOpen(true);
    }
  }, [complete]);
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
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          This is the data from all the steps:
          {JSON.stringify(persistentStepsData)}
        </Alert>
      </Collapse>
      <p>Step 2️⃣ </p>
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
              ...{ step2: { name: name } }
            });
            next(1);
          }}
          variant="contained"
          color="primary"
        >
          Previous
        </Button>
        <Button
          disabled={disabled}
          onClick={() => {
            setPersistentStepsData({
              ...persistentStepsData,
              ...{ step2: { name: name } }
            });
            setOpen(true);
          }}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </div>
    </Paper>
  );
}
