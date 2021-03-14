import React from "react";
import {IStats, IUserProfile, type} from "../Interfaces";

interface IProps {
  setStats: (stats: IStats) => void
}

export default function Input(props: IProps) {
  return <>
    <button onClick={()=>props.setStats({userProfile:null, commits:[], type:'morning'})}>Morning</button>
  </>
}

function getUserProfile(username: string): IUserProfile {
  return {username:'', avatarUrl:''}
}

function getCommits(username: string): number[] {
  return []
}

function getType(commits: number[]): type {
  return 'morning'
}