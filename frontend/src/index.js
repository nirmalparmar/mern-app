import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import Uploader from './Upload';
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Uploader />, document.getElementById("root"));
registerServiceWorker();

