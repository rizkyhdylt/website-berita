import Footer from "@/components/Footer";
import HeadLines from "@/components/HeadLines"; 
import City from "@/components/news/City";
import Advertisement from "@/components/news/items/Advertisement";
import LatesNews from "@/components/news/LatesNews";
import Sorotan from "@/components/news/Sorotan";
import Terkini from "@/components/news/Terkini";
import { base_api_url } from "@/config/config";
import TokenListener from "@/components/TokenListener";
import Recommendation from "@/components/news/Recommendation";
import IklanFixed from "@/components/news/items/IklanFixed";
import TrendingNews from "@/components/news/TrendingNews";

const Home = async() => {

  const news_data = await fetch(`${base_api_url}/api/all/news`,{
    next:{
      revalidate: 5,
    },
  });


  // console.log(localStorage.getItem('newsToken'))  
  let news = await news_data?.json();

  news = news.news

  const allNews = Object.values(news || {}).flat(); // Menggabungkan semua kategori berita jadi satu array

  const sortedNews = allNews.sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  ); //mengurutkan sesuai tanggal

  
  return (
    <main>
      <TokenListener/>
      <HeadLines news={news}/>
      <div className="bg-[#dfd3c3]">
        
        <div className="px-4 md:px-8 py-8 max-w-screen-lg mx-auto">  
          <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-4">
            {/* Latest News di kiri */}
            <div className="w-full lg:w-10/12">
              <LatesNews news={sortedNews.slice(0, 1)}/>
            </div>

            {/* Terkini di kanan */}
            <div className="w-full lg:w-5/12">
              <Terkini news={sortedNews.slice(1, 6)} />
            </div>
          </div>
          
          {/* Hot News */}  
          <div className="flex flex-col lg:flex-row gap-4 mt-4 mb-4">
            <div className="w-full lg:w-8/12">
              <TrendingNews/>
            </div>
            <div className="w-full lg:w-4/12">
                <Advertisement slot={1}/>
            </div>
          </div>
      
          {/* Sorotan dan Advertisement */}
          <div className="flex flex-col lg:flex-row gap-4 mt-4 mb-4">
            <div className="w-full lg:w-8/12">
              <Sorotan news={sortedNews} />
            </div>
            <div className="w-full lg:w-4/12 flex flex-col gap-4">
              <Advertisement slot={2} />
              <Advertisement slot={3} />
            </div>
          </div>

          {/* City dan Recommendation */}
          <div className="flex flex-col lg:flex-row gap-4 mt-4 mb-4">
            <div className=" w-full lg:w-8/12 flex flex-col gap-4">
              <div className="bg-gray-600">
                <Recommendation/>
              </div>
              <City news={news}/>  
            </div>
            <div className="w-full lg:w-4/12 flex flex-col gap-4">
              <Advertisement slot={4}/>
              <Advertisement slot={5}/>
              <Advertisement slot={6}/>
              <Advertisement slot={7}/>
            </div>
          </div>

          {/* <div className="flex flex-col lg:flex-row gap-4 mt-4 mb-4">
            <div className="w-full lg:w-8/12">
              <City news={news}/>
            </div>
            <div className="w-full lg:w-4/12 flex flex-col gap-4">
              <Advertisement slot={5}/>
              <Advertisement slot={6}/>
              <Advertisement slot={7}/>
            </div>
          </div> */}

        </div>
      </div>
      <IklanFixed slot={8} position="bottom-right" width="250px" height="150px"/>
      <IklanFixed slot={9} position="bottom-left" width="250px" height="150px"/>
      <IklanFixed slot={10} position="center" width="900px" height="100px"/>
      <Footer/>
    </main>
  );
  
}

export default Home