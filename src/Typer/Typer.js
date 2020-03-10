import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Badge from "@material-ui/core/Badge";

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
const situationSentences = [
  "Willkommen bei Eddys Abenteuer! Eddy das Erdmännchen möchte nach Hause. Helfe ihm und tippe den Satz.",
  "Weiter geht es über die Wiesen.. Aber wo ist sein Zuhause...",
  "Achtung, ein Fuchs, was macht er jetzt?",
  "Da oben sieht es aus wie ein Adler...",
  "Das Haus ist nur noch 30 Meter weit",
  "Das hier sieht aus wie Eddys Tür!"
];

const actionSentences = [
  "ich laufe los",
  "Immer der Sonne nach",
  "Ein Fuchs, jetzt laufe ich schneller!",
  "Ich verstecke mich hinter dem Gartenzaun ###",
  "Eddy legt den Endspurt für die letzten 30 Meter ein",
  "Tür auf und rein!"
];

export default function Typer() {
  const [textValue, setTextValue] = useState("");
  const [level, setLevel] = useState(0);
  const [errors, setErrors] = useState(9); //TODO fix this to reflect real value at startup
  const [nextLevelDisabled, setNextLevelDisabled] = useState(true);

  const classes = useStyles();
  const match = inputText => {
    setTextValue(inputText);
    const textSimilarity = levenshtein(inputText, actionSentences[level]);
    setErrors(textSimilarity);
    setNextLevelDisabled(textSimilarity > 0);
    return "Some matching... " + inputText;
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Badge badgeContent={errors} color={errors > 0 ? "error" : "primary"}>
          <AndroidIcon />
        </Badge>
        <Typography component="h1" variant="h5"></Typography>
        <form className={classes.form} noValidate>
          <Typography variant="h6" component="h2" gutterBottom>
            {situationSentences[level]}
            <br /> <b>{actionSentences[level]}</b>
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Schreibe hier"
            autoComplete="off"
            name="myInput"
            value={textValue}
            onChange={event => match(event.target.value)}
            autoFocus
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={nextLevelDisabled}
            className={classes.submit}
            onClick={() => {
              setLevel((level + 1) % actionSentences.length);
              setTextValue("");
              match("");
              console.log("Entering next level: " + level);
            }}
          >
            Super, nächstes Level..
          </Button>
        </form>
      </div>
    </Container>
  );
}
