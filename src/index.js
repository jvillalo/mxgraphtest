import React from "react";
import ReactDOM from "react-dom";
import MxGraphEditor from "./components/MxGraphGridEditor";
import App2 from "./components/App2";
import "antd/dist/antd.css";
import "./styles.css";
import TestModel from "./components/TestModel";
import openSocket from "socket.io-client";

function Appp() {
  return (
    <div>
      <TestModel />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Appp />, rootElement);
