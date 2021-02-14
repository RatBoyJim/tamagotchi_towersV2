import React from "react";
import loadingGif from "../gifs/other/loading.gif";
const loadingImg =
  loadingGif;

const Loading = () => (
  <div className="spinner">
    <img src={loadingImg} alt="Loading..." />
  </div>
);

export default Loading;