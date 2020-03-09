import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import AndroidIcon from "@material-ui/icons/Android";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

var levenshtein = require("js-levenshtein");

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

//TODO load this from some config file later
const testSentences = [
  "hallo welt",
  "Hallo Welt",
  "Eddy ist super!",
  "Und noch etwas mit vielen Leerzeichen!!",
  "Findest Du auch ein Fragezeichen?",
  "Das hier sieht aus wie ein Gartenzaun: #"
];

export default function Typer() {
  const [textValue, setTextValue] = useState("");
  const [level, setLevel] = useState(0);
  const [errors, setErrors] = useState(9); //TODO fix this to reflect real value at startup
  const [nextLevelDisabled, setNextLevelDisabled] = useState(true);

  const classes = useStyles();
  const match = inputText => {
    setTextValue(inputText);
    const textSimilarity = levenshtein(inputText, testSentences[level]);
    setErrors(textSimilarity);
    setNextLevelDisabled(textSimilarity > 0);
    return "Todo, some matching... " + inputText;
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Badge badgeContent={errors} color={errors > 0 ? "error" : "primary"}>
          <AndroidIcon />
        </Badge>
        <Typography component="h1" variant="h5">
          Tippe mir nach...
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="myInput"
            label="Schreibe hier"
            autoComplete="off"
            name="myInput"
            value={textValue}
            onChange={event => match(event.target.value)}
            autoFocus
          />
          <Typography variant="h6" component="h2" gutterBottom>
            Tippe diesen Satz:
            <br /> <b>{testSentences[level]}</b>
          </Typography>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={nextLevelDisabled}
            className={classes.submit}
            onClick={() => {
              setLevel((level + 1) % testSentences.length);
              setTextValue("");
              match("");
              console.log("Entering next leveL: " + level);
            }}
          >
            Super, nächstes Level..
          </Button>
        </form>
      </div>
    </Container>
  );
}
