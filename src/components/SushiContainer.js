import React from "react";
import MoreButton from "./MoreButton";
import Sushi from "./Sushi";

function SushiContainer(props) {

  const {allSushi, forwardSushi, eatSushi} = props

  const displaySushi = allSushi.map(sushi=> <Sushi key={sushi.id} sushi={sushi} eatSushi={eatSushi}/>)

  return (
    <div className="belt">
      {displaySushi}
      
      <MoreButton moreSushi={forwardSushi} />
    </div>
  );
}

export default SushiContainer;
