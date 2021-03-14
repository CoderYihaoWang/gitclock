import React from 'react';
import {IStats} from "../Interfaces";

interface IProps {
  stats: IStats
  setStats: (stats: IStats|null) => void
}

export default function Stats(props: IProps) {
  return <>
    <button onClick={()=>props.setStats(null)}>New search</button>
  </>
}