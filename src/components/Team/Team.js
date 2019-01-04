import React from "react";

import s from "./Team.module.scss";
import ImageMap from "../../images/image-map";

const Team = ({team, onClick, showTeamName = true, size}) => (
  <div className={s.team} onClick={() => onClick && onClick(team)}>
    <img src={ImageMap[team.image]} width={size} height={size}/>
    {showTeamName && <div>{team.city}</div>}
    {showTeamName && <div>{team.name}</div>}
  </div>
);

export default Team;