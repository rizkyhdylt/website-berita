'use client'
import React from 'react'
import SimpleNewsCard from './items/SimpleNewsCard';
import Title from '../Title';

const LatesNews = ({news}) => {
  return (
    <div>
      <Title title="Latest News"/>
      <div>
        {
          news.map((item,i)=> <SimpleNewsCard item={item} key={i} width="w-full" height="h-80" /> )
        }
      </div>
    </div>
  )
}

export default LatesNews
