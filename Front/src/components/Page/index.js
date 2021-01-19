import React from 'react';

import './styles.scss'

import trips from 'src/data/trips'

import Banner from 'src/components/Banner'
import Description from 'src/components/Description'
import Steps from 'src/components/Steps'



const Page = ()=>{
  
const trip = trips[0]
{console.log(trip)}
 
 return <div>
  <Banner />
  <Description />
  <Steps />
  </div>
}


export default Page
