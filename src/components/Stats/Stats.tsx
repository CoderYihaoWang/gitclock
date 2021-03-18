import React from 'react';
import {IStats} from "../../Interfaces";
import './Stats.css';

interface IProps {
  stats: IStats|null
  setStats: (stats: IStats|null) => void
}

export default function Stats(props: IProps) {
  const total = props.stats === null || props.stats.commits === null
    ? 1
    : props.stats.commits.reduce((a, b) => a + b)
  const data = props.stats?.commits
    && [...props.stats?.commits.slice(6), ...props.stats?.commits.slice(0, 6)]
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

  const info = <div className="stats-info-container">
    <img src={props.stats?.userProfile?.avatarUrl} alt={props.stats?.userProfile?.username} className="avatar" />
    <span>{props.stats?.userProfile?.name} (@</span>
    <span>{props.stats?.userProfile?.username}</span>
    <span>) makes most commits {props.stats?.type === 'night' ? 'at' : 'in the'}</span>
    <div className="stats-info-type">{props.stats?.type}</div>
  </div>

  const column = (max: number, n: number, hour: number) => <div className="stats-chart-column-container">
    <div className="stats-chart-column-percent">{(n * 100).toFixed(0)}%</div>
    <div className="stats-chart-column-data">
      <div className="stats-chart-column-bar">
        {new Array(Math.round(n / max * 10)).fill(0).map(_ => <div className="stats-chart-square" />)}
      </div>
      <div className="stats-chart-column-hour">{hour}:00</div>
    </div>
  </div>

  const max = data?.reduce((a, b) => a > b ? a : b) || total

  const chart = <div className="stats-chart-container">
    {data?.map((n, i) => column(max / total, n / total, (i + 6) % 24))}
  </div>

  return <div className={containerClassName}>
    { info }
    { chart }
  </div>
}