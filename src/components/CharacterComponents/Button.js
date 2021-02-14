import React, {useState} from "react";

const Button = ({statName, increaseStat, buttonLabel}) => {


  let lowerCaseStatName = statName.toString().toLowerCase()


  return(
      <div>
        <button className="stat_buttons" type="button" onClick={() => increaseStat(lowerCaseStatName)}>{buttonLabel}</button>
      </div>
  )
};

export default Button;