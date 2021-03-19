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

  const max = data?.reduce((a, b) => a > b ? a : b) || total

  const containerClassName = ((stats: IStats|null) => {
    if (!stats) {
      return 'stats-container hidden'
    }
    switch (stats.type) {
      case 'morning':
        return 'stats-container stats-bg-morning'
      case 'afternoon':
        return 'stats-container stats-bg-afternoon'
      case 'evening':
        return 'stats-container stats-bg-evening'
      case 'night':
        return 'stats-container stats-bg-night'
    }
    return 'stats-container'
  })(props.stats)

  const period = ((stats: IStats|null) => {
    switch (stats?.type) {
      case 'morning':
        return '6:00 - 12:00'
      case 'afternoon':
        return '12:00 - 18:00'
      case 'evening':
        return '18:00 - 24:00'
      case 'night':
        return '0:00 - 6:00'
      default:
        return ''
    }
  })(props.stats)

  const percent = ((stats: IStats|null) => {
    if (stats === null) {
      return 0
    }
    let commits = []
    switch (stats.type) {
      case 'morning':
        commits = stats.commits.slice(6, 12)
        break
      case 'afternoon':
        commits = stats.commits.slice(12, 18)
        break
      case 'evening':
        commits = stats.commits.slice(18, 24)
        break
      case 'night':
        commits = stats.commits.slice(0, 6)
        break
    }
    return commits.reduce((a, b) => a + b) / total
  })(props.stats)

  const info = <div className="stats-info-container">
    <img src={props.stats?.userProfile?.avatarUrl} alt={props.stats?.userProfile?.username} className="stats-avatar" />
    <span>{props.stats?.userProfile?.name} ( </span>
    <a href={props.stats?.userProfile?.url} target="_blank" rel="noreferrer">@{props.stats?.userProfile?.username}</a>
    <span> ) makes most commits {props.stats?.type === 'night' ? 'at' : 'in the'}</span>
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

  const chart = <div className="stats-chart-container">
    {data?.map((n, i) => column(max / total, n / total, (i + 6) % 24))}
  </div>

  const footer = <div className="stats-footer">
    <span className="stats-footer-highlight">{percent*100}%</span>
    <span className="stats-footer-info"> of the latest {total} commits were made between </span>
    <span className="stats-footer-highlight">{period}</span>.
  </div>

  return <div className={containerClassName}>
    { info }
    { chart }
    { footer }
  </div>
}