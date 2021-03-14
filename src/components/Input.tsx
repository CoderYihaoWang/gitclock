import React from "react";
import {IStats} from "../Interfaces";

interface IProps {
  setStats: (stats: IStats) => void
}

export default function Input(props: IProps) {
  return <>
    <button onClick={()=>props.setStats({userProfile:null, commits:[], type:'morning'})}>Morning</button>
  </>
}

function getUserProfile(username: string): string {
  return ''
}

function getCommits(username: string): number[] {
  return []
}