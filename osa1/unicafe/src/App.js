import { useState } from 'react'

const Header = ({ header }) => {
  return (
    <h1>{header}</h1>
  )
}

const Button = ({ handleClick, text } ) => {
  return(
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const StatisticLine = ({ text, value }) => {
  return(
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}

const calculateAverage = ( good, neutral, bad ) => {
  return ((good - bad) / (good + neutral + bad))
}

const shareOfPositive = ( good, neutral, bad ) => {
  return ((100 * good / (good + neutral + bad)) + " %")
}

const Statistics = ({ good, neutral, bad }) => {
  return(
    <div>
      <Header header="Statistics" />
      {(good + neutral + bad === 0) &&
        "No feedback given"
      }
      {(good + neutral + bad > 0) &&
        <table>
          <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={good + neutral + bad}/>
            <StatisticLine text="average" value={calculateAverage(good, neutral, bad)}/>
            <StatisticLine text="positive" value={shareOfPositive(good, neutral, bad)}/>
          </tbody>
        </table>
      }
      </div>
  )
}

function App() {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveGoodFeedback = () => setGood(good + 1)
  const giveNeutralFeedback = () => setNeutral(neutral + 1)
  const giveBadFeedback = () => setBad(bad + 1)

  return (
    <div>
      <Header header="Give feedback" />
      <Button handleClick={giveGoodFeedback} text="good" />
      <Button handleClick={giveNeutralFeedback} text="neutral" />
      <Button handleClick={giveBadFeedback} text="bad" />
      
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App