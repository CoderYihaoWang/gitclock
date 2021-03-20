import React from 'react'
import {render} from '@testing-library/react'
import Stats from './Stats'
import {IStats, IUserProfile} from "../../Interfaces";

const user: IUserProfile = {
  name: 'name',
  username: 'username',
  avatarUrl: 'avatarUrl',
  url: 'url'
}

describe('Stats', () => {
  it('does not render when the stats is null', () => {
    const {queryAllByAltText} = render(<Stats stats={null}/>)
    expect(queryAllByAltText(/morning|afternoon|evening|night|commits/i)).toHaveLength(0)
  })

  it('renders child components when the stats is not null', () => {
    const stats: IStats = {
      userProfile: user,
      commits: new Array(24).fill(1),
      type: 'morning'
    }
    const {getByTestId} = render(<Stats stats={stats}/>)
    expect(getByTestId('stats-info')).toBeInTheDocument()
    expect(getByTestId('stats-chart')).toBeInTheDocument()
    expect(getByTestId('stats-footer')).toBeInTheDocument()
  })

  describe('renders correct type when the stats is not null', () => {
    test('morning', () => {
      const stats: IStats = {
        userProfile: user,
        type: 'morning',
        commits: [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      }
      const morning = render(<Stats stats={stats}/>)
      expect(morning.getByTestId('stats-type')).toHaveTextContent(/Morning/i)
    })

    test('afternoon', () => {
      const stats: IStats = {
        userProfile: user,
        type: 'afternoon',
        commits: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1]
      }
      const afternoon = render(<Stats stats={stats}/>)
      expect(afternoon.getByTestId('stats-type')).toHaveTextContent(/Afternoon/i)
    })

    test('evening', () => {
      const stats: IStats = {
        userProfile: user,
        type: 'evening',
        commits: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1]
      }
      const evening = render(<Stats stats={stats}/>)
      expect(evening.getByTestId('stats-type')).toHaveTextContent(/Evening/i)
    })

    test('night', () => {
      const stats: IStats = {
        userProfile: user,
        type: 'night',
        commits: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,2, 2, 2, 2, 2, 2]
      }
      const night = render(<Stats stats={stats}/>)
      expect(night.getByTestId('stats-type')).toHaveTextContent(/Night/i)
    })
  })

  it('renders accurate statistics when the stats is not null', () => {
    const commits = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    const total = commits.reduce((a, b) => a + b)
    const periodTotal = commits.slice(18).reduce((a, b) => a + b)
    const stats: IStats = {
      userProfile: user,
      type: 'evening',
      commits: commits
    }
    const component = render(<Stats stats={stats} />)
    expect(component.container).toHaveTextContent(/Evening/i)
    expect(component.container).toHaveTextContent(`${total}`)
    expect(component.container).toHaveTextContent(`${(periodTotal/total*100).toFixed(0)}%`)
  })
})
