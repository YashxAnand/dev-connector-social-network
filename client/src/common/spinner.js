import React from "react";
import Spinner from "./spinner.gif";

export default function spinner() {
  return (
    <div>
      <img
        src={Spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt='Loading...'
      ></img>
    </div>
  );
}
