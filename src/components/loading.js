import React from "react";
const loadingImg =
  "../gifs/other/loading.gif";

const Loading = () => (
  <div className="spinner">
    <img src={loadingImg} alt="Loading..." />
  </div>
);

export default Loading;