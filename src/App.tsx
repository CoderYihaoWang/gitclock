import React, {useState} from 'react';
import {IStats} from './Interfaces';
import Input from './components/Input/Input';
import Stats from './components/Stats/Stats';
import styles from './App.module.css'

export default function App() {
  const [stats, setStats] = useState<IStats|null>(null)

  return <div className={styles.app}>
    { stats === null && <Input setStats={setStats}/> }
    <Stats stats={stats} setStats={setStats}/>
  </div>
}
