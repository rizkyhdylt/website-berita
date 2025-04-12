import Breadcrumb from '@/components/Breadcrumb'
import SimpleDetailsNewsCard from '@/components/news/items/SimpleDetailsNewsCard'
import React from 'react'
import { base_api_url } from '@/config/config'
import Footer from '@/components/Footer'

const Categorypage = async ({ params }) => {
    const resolvedParams = await params;
    const category = decodeURIComponent(resolvedParams.category).replace(/-/g, ' '); // Ubah "-" ke spasi

    
    const res = await fetch(`${base_api_url}/api/category/news/${category}`,{
        next:{
            revalidate: 1
        }
    })
    const { news } = await res.json()
    
    return (
        <div>
            <div  id="top" className='bg-white shadow-sm py-4'>
                <div className='px-4 md:px-8 w-full'>
                    <Breadcrumb one='category' two={category}/>
                </div>
            </div>
            <div className='bg-slate-200 w-full'>
                <div className='px-4 md:px-8 w-full py-8'>
                    <div className='flex flex-wrap justify-center'>
                        <div className='w-full xl:w-8/12 flex justify-center'>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl'>
                                {
                                    news && news.length > 0 && news.map((item, i)=>(
                                        <SimpleDetailsNewsCard news={item}  key={i} type='details-news' height={200}/>
                                    ))
                                }
                                
                                    
                            </div>
                        </div>
                    </div>
                    <div className='pt-8 text-center'>
                        Test
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Categorypage;
