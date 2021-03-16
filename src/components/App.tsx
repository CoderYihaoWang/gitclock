import React, {useEffect, useState} from 'react';
import CSS from 'csstype'
import {IStats} from '../Interfaces';
import Input from './Input';
import Stats from './Stats';

function App() {
  const [stats, setStats] = useState<IStats|null>(null)

  const gradient = {
    'default': 'linear-gradient(#c828ac, #00074a)',
    'morning': 'linear-gradient(#4effe2, #193c00)',
    'afternoon': 'linear-gradient(#ffbb67, #810000)',
    'evening': 'linear-gradient(#4dcca9, #00054e)',
    'night': 'linear-gradient(#000f26, #5321b4)'
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
