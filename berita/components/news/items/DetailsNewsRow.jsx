import React from 'react'
import NewsCard from './NewsCard'

const DetailsNewsRow = ({ category, type}) => {
  return (
    <div className='w-full flex flex-col gap-[160px] pr-2'>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
        <div className='grid grid-cols-1 gap-y-1'>
            {[1,2,3,4].map((_,i)=>
            <NewsCard/>
            )}
        </div>
      </div>
    </div>
  )
}

export default DetailsNewsRow
