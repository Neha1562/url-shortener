import React, { useState, useEffect } from "react";
import "./App.css";

import Button from "@mui/material/Button";
import ShortUrlTable from "./components/ShortUrlTable";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import InputField from "./components/InputField";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = () => {
  const [url, setUrl] = useState("");
  const [urlList, setUrlList] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    fetch("http://localhost:5000/api/generate-short-url", {
      method: "POST",
      body: JSON.stringify({ longUrl: url }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then((response) => {
      setOpen(true);
      setUrl("");
      getAllShortUrls();
    });
  };

  const getEnteredUrl = (enteredUrl) => {
    setUrl(enteredUrl);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const getAllShortUrls = () => {
    fetch("http://localhost:5000/api/short-urls")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUrlList(data);
      });
  };

  useEffect(() => {
    getAllShortUrls();
  }, []);

  return (
    <div className="App">
      <h1> URL SHORTENER</h1>
      <h3>Enter URL</h3>
      <InputField handleCallback={getEnteredUrl} url={url} />
      <div>
        <Button
          variant="contained"
          style={{ width: "700px", marginTop: "20px" }}
          onClick={handleClick}
        >
          Generate Short URL
        </Button>
      </div>
      <div style={{ width: "80%", marginTop: "5%", marginLeft: "10%" }}>
        <ShortUrlTable data={urlList} />
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          URL Shortened Successfully!!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default App;
