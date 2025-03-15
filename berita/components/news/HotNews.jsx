import React from 'react'
import Title from '../Title'
import SimpleNewsCard from './items/SimpleNewsCard'

const HotNews = () => {
  return (
    <div className='w-full pb-8 mt-5'>
      <div className='flex flex-col w-full gap-y-[14px]'>
        {/* Judul Hot News */}
        <Title title="Hot News"/>

        <div className='overflow-x-auto'>
          <div className='flex space-x-4 items-start'> {/* Gunakan `items-start` agar kotak sejajar di atas */}
            {/* {
              [1, 2, 3].map((item, i) => 
                <SimpleNewsCard 
                  width="w-60" 
                  height="h-40" 
                  item={item} 
                  key={i}
                />
              )
            } */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotNews;
