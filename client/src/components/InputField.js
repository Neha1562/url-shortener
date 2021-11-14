import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const InputField = (props) => {
  const [errorText, setErrorText] = useState("");
  const regExpValidateUrl =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const handleChange = (e) => {
    if (e.target.value.match(regExpValidateUrl)) {
      props.handleCallback(e.target.value);
      setErrorText("");
    } else {
      setErrorText("Invalid URL");
    }
  };
  return (
    <div>
      <TextField
        id="outlined-basic"
        label="URL"
        onChange={handleChange}
        variant="outlined"
        style={{ width: "700px" }}
        helperText={errorText}
        error={errorText !== ""}
      />
    </div>
  );
};

export default InputField;
