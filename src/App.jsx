import './App.css'

import { useEffect, useState } from 'react'

import { DisplayContainer } from './components/displayContainer/DisplayContainer'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState()

  useEffect(() => {
    loadData()
  }, [data])

  
  async function loadData() {
    const fetchData = await getData(
      "http://localhost:4000",
      "GET"
    );
    setData(fetchData);
  }

  async function getData(url, method) {
    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (res.ok) {
        console.log("res.ok", res.ok);
        return res.json();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      {/* <h1>Data: {data}</h1> */}
      <DisplayContainer 
        title={"Open On Every Shift"}
        title_1={'Support Portal'}
        link_1={'Support Portal'}
      />

    </>
  )
}

export default App