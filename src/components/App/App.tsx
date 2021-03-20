import React, {useState} from 'react';
import {IStats} from '../../Interfaces';
import Input from '../Input/Input';
import Stats from '../Stats/Stats';
import styles from './App.module.css'

export default function App() {
  const [stats, setStats] = useState<IStats|null>(null)

  return <div className={styles.app}>
    { stats === null && <Input setStats={setStats}/> }
    <Stats stats={stats} />
  </div>
}
