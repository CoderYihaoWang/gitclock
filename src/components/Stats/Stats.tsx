import React from 'react';
import {IStats} from "../../Interfaces";
import './Stats.css';

interface IProps {
  stats: IStats|null
  setStats: (stats: IStats|null) => void
}

export default function Stats(props: IProps) {
  const containerClassName = ((stats: IStats|null) => {
    if (!stats) {
      return 'stats-container hidden'
    }
    switch (stats.type) {
      case 'morning':
        return 'stats-container bg-morning'
      case 'afternoon':
        return 'stats-container bg-afternoon'
      case 'evening':
        return 'stats-container bg-evening'
      case 'night':
        return 'stats-container bg-night'
    }
    return 'stats-container'
  })(props.stats)

  return <div className={containerClassName}>
    {
      props.stats === null ? <></> : <div>
        <div>{`${props.stats.userProfile?.username}`}</div>
        <img src={props.stats.userProfile?.avatarUrl}  alt={props.stats.userProfile?.username}/>
        <div>{`${props.stats.commits}`}</div>
        <div>{props.stats.commits.reduce((a,b)=>a+b)}</div>
        <button onClick={()=>props.setStats(null)}>New search</button>
      </div>
    }
  </div>
}