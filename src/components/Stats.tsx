import React from 'react';
import {IStats} from "../Interfaces";

interface IProps {
  stats: IStats
  setStats: (stats: IStats|null) => void
}

export default function Stats(props: IProps) {
  return <>
    <div>{`${props.stats.userProfile?.username}`}</div>
    <button onClick={()=>props.setStats(null)}>New search</button>
  </>
}