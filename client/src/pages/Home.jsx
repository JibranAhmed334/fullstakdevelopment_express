import React from 'react'
import Navbar from '../components/navbar'

function Home() {
//   const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      {/* <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button> */}
    </div>
  )
}

export default Home