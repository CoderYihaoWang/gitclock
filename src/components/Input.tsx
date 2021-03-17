import React, {useState} from "react";
import {IStats, IUserProfile, IType} from "../Interfaces";
import {request} from "@octokit/request";

interface IProps {
  setStats: (stats: IStats|null) => void
}

export default function Input(props: IProps) {
  const [username, setUsername] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true)
  const [isStatsAvailable, setIsStatsAvailable] = useState<boolean>(true)

  const handleClick = async () => {
    setIsAnalyzing(true)
    setIsUsernameValid(true)
    setIsStatsAvailable(true)

    const userProfile: IUserProfile|null = await getUserProfile(username)
    if (userProfile === null) {
      setIsUsernameValid(false)
      setIsAnalyzing(false)
      props.setStats(null)
      return
    }
    setIsUsernameValid(true)

    const commits: number[] = await getCommits(userProfile.username)
    if (commits.length === 0 || commits.reduce((a, b) => a + b) === 0) {
      setIsStatsAvailable(false)
      setIsAnalyzing(false)
      props.setStats(null)
      return
    }
    setIsStatsAvailable(true)

    setIsAnalyzing(false)
    const type: IType = getType(commits)
    props.setStats({userProfile, commits, type})
  }

  return <>
    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
    <button onClick={handleClick}>Search</button>
  </>
}

async function getUserProfile(username: string): Promise<IUserProfile|null> {
  // return {username: username, avatarUrl:'https://avatars.githubusercontent.com/u/48015192?s=400&v=4'}
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
    name: response.data.name
  }
}

async function getCommitsOnPage(username: string, page: number): Promise<number[]|null> {
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
      result[hour]++
    }
    return result
  } catch (error) {
    return null
  }
}

async function getCommits(username: string): Promise<number[]> {
  // return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
  const limit = 20
  const result = new Array(24).fill(0)
  let page = 1
  while (page < limit) {
    const commits = await getCommitsOnPage(encodeURI(username), page++)
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