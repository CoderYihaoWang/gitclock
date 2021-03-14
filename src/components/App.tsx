import React, {useEffect, useState} from 'react';
import CSS from 'csstype'
import {IStats} from '../Interfaces';
import Input from './Input';
import Stats from './Stats';

function App() {
  const [stats, setStats] = useState<IStats|null>(null)

  const gradient = {
    'default': '#eee',
    'morning': 'green',
    'afternoon': 'orange',
    'evening': 'darkblue',
    'night': 'black'
  }
  const [background, setBackground] = useState<string>(gradient.default)

  const style: CSS.Properties = {
    height: '100vh',
    background: background
  }

  useEffect(() => {
      if (stats === null) {
        setBackground(gradient.default);
      } else {
        switch (stats.type) {
          case "morning":
            setBackground(gradient.morning);
            break;
          case "afternoon":
            setBackground(gradient.afternoon);
            break;
          case "evening":
            setBackground(gradient.evening);
            break;
          case "night":
            setBackground(gradient.night);
            break;
        }
      }
  }, [stats])

  return <div style={style}>{
    stats === null
    ? <Input setStats={setStats}/>
    : <Stats stats={stats} setStats={setStats}/>
  }</div>
}

export default App;
