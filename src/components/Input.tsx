import React, {useState} from "react";
import {IStats, IUserProfile, type} from "../Interfaces";

interface IProps {
  setStats: (stats: IStats) => void
}

export default function Input(props: IProps) {
  const [username, setUsername] = useState<string>('')

  const handleClick = async () => {
    const userProfile = await getUserProfile(username)
    const commits = await getCommits(username)
    const type = getType(commits)
    props.setStats({userProfile, commits, type})
  }

  return <>
    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
    <button onClick={handleClick}>Morning</button>
  </>
}

async function getUserProfile(username: string): Promise<IUserProfile> {
  return {username: username, avatarUrl:'https://avatars.githubusercontent.com/u/48015192?s=400&v=4'}
}

async function getCommits(username: string): Promise<number[]> {
  return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
}

function getType(commits: number[]): type {
  return 'morning'
}