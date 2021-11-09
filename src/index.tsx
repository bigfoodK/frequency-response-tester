import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Provider from "./store/Provider";

const websocket = new WebSocket("ws://" + location.host + "/hotReload");
websocket.onmessage = (event) => {
  const message = event.data;
  console.log(message);
  if (typeof message !== "string" || message !== "hotReload") {
    return;
  }
  console.log("hotReload after 100ms");
  setTimeout(() => {
    location.reload();
  }, 100);
};

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
