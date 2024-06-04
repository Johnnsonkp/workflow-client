import { FaqWithHeader } from '../components/aboutComponents/FaqWithHeader'
import Nav from '../components/TopNav/Nav'
import React from 'react'

function About() {
  return (
    <div>
      {/* <a href="/personal">Back</a> */}
      <Nav />
      <FaqWithHeader />
    </div>
  )
}

export default About