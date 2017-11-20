import React from "react";

const StandingsTableGame = ({ game }) => {
  const teamNameClass = game.teamName
    ? game.teamName.toLowerCase()
    : "glyphicon glyphicon-minus standings__glyphicon text-center";
  let outcomeClass = "";
  if (game.outcome === "success") {
    outcomeClass = "standings__team-cell--victory";
  } else if (game.outcome === "failure") {
    outcomeClass = "standings__team-cell--defeat";
  }

  return (
    <div className={"standings__team-cell center-block " + outcomeClass}>
      <div className={"center-block " + teamNameClass} />
    </div>
  );
};

export default StandingsTableGame;
