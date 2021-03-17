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

  const info = <div>
    <img src={props.stats?.userProfile?.avatarUrl} alt={props.stats?.userProfile?.username} className="avatar" />
    <span>{props.stats?.userProfile?.name}(</span>
    <span>{props.stats?.userProfile?.username}</span>
    <span>) makes most commits {props.stats?.type === 'night' ? 'at' : 'in the'}</span>
    <span>{props.stats?.type}</span>
  </div>

  const chart = <div>

  </div>

  return <div className={containerClassName}>
    { info }
    { chart }
  </div>
}