import React, {useState} from "react";
import {IStats, IUserProfile, IType} from "../../Interfaces";
import {request} from "@octokit/request";
import styles from './Input.module.css';

interface IProps {
  setStats: (stats: IStats|null) => void
}

function Progress(props: { progress:number }) {
  return <div className={styles.analyzing}>Fetching data - {Math.round(props.progress * 100)}%</div>
}

export default function Input(props: IProps) {
  const [username, setUsername] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true)
  const [isStatsAvailable, setIsStatsAvailable] = useState<boolean>(true)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  async function getUserProfile(username: string): Promise<IUserProfile|null> {
    let response
    try {
      response = await request(`GET /users/${encodeURI(username)}`)
    } catch (error) {
      return null
    }
    if (response.status !== 200) {
      return null
    }
    return {
      username: response.data.login,
      avatarUrl: response.data.avatar_url,
      name: response.data.name,
      url: response.data.html_url
    }
  }
  async function getCommitsOnePage(username: string, page: number): Promise<number[]|null> {
    try {
      const response = await request('GET /search/commits', {
        q: `author:${encodeURI(username)}+sort:author-date-desc`,
        per_page: 100,
        page: page,
        mediaType: {
          previews: [
            'cloak'
          ]
        }
      })
      if (response.status !== 200) {
        return null
      }
      const items = response.data.items
      const result = new Array(24).fill(0)
      for (const item of items) {
        const hour = new Date(item.commit.author.date).getHours()
        setProgress((n) => n + 1)
        result[hour]++
      }
      return result
    } catch (error) {
      return null
    }
  }

  async function getCommits(username: string): Promise<number[]> {
    const limit = 10
    const result = new Array(24).fill(0)
    let page = 1
    while (page <= limit) {
      const commits = await getCommitsOnePage(encodeURI(username), page++)
      if (!commits) {
        break
      }
      for (let i = 0; i < commits.length; i++) {
        result[i] += commits[i]
      }
    }
    return result
  }

  function getType(commits: number[]): IType {
    const morningCommits = commits.slice(6, 12).reduce((a, b) => a + b)
    const afternoonCommits = commits.slice(12, 18).reduce((a, b) => a + b)
    const eveningCommits = commits.slice(18, 24).reduce((a, b) => a + b)
    const nightCommits = commits.slice(0, 6).reduce((a, b) => a + b)
    const max = [morningCommits, afternoonCommits, eveningCommits, nightCommits].reduce((a, b) => a > b ? a : b)

    switch (max) {
      case morningCommits:
        return 'morning'
      case afternoonCommits:
        return 'afternoon'
      case eveningCommits:
        return 'evening'
      case nightCommits:
        return 'night'
    }
    return 'night'
  }

  const handleClick = async () => {
    setIsDisabled(true)
    setIsAnalyzing(true)
    setIsUsernameValid(true)
    setIsStatsAvailable(true)

    const userProfile: IUserProfile|null = await getUserProfile(username.trim())
    if (userProfile === null) {
      setIsUsernameValid(false)
      setIsAnalyzing(false)
      setIsDisabled(false)
      props.setStats(null)
      return
    }
    setIsUsernameValid(true)

    const commits = await getCommits(userProfile.username)
    if (commits.length === 0 || commits.reduce((a, b) => a + b) === 0) {
      setIsStatsAvailable(false)
      setIsAnalyzing(false)
      setIsDisabled(false)
      props.setStats(null)
      return
    }
    setIsStatsAvailable(true)

    setIsAnalyzing(false)
    setIsDisabled(false)
    const type: IType = getType(commits)
    props.setStats({userProfile, commits, type})
  }

  const header = <div className={styles.header} data-testid="input-header">When Do You Make Most Commits?</div>

  const input = <div className={styles.inputContainer} data-testid="input-input">
    <input
      className={styles.input}
      type="text"
      placeholder="Your GitHub ID"
      value={username}
      disabled={isDisabled}
      onChange={(e)=>setUsername(e.target.value)}
    />
    <button
      className={styles.button}
      onClick={handleClick}
      disabled={isDisabled}
    >&#x1F50D;</button>
  </div>

  const footer = <div className={styles.footer} data-testid="input-footer">
    {isAnalyzing && <Progress progress={progress / 1000} />}
    {!isUsernameValid && <div>This user does not seem to exist...</div>}
    {!isStatsAvailable && <div>
        <div>No data available...</div>
        <div className={styles.footerNote}>This may be caused by GitHub's
            <a href="https://docs.github.com/en/rest/reference/search#rate-limit" target="_blank" rel="noreferrer">rate limiting policy</a>
            , please try again at least one minute later.</div>
    </div> }
  </div>

  return <div className={styles.container} data-testid="input">
    { header }
    { input }
    { footer }
  </div>
}