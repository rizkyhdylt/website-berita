import Footer from "@/components/Footer";
import HeadLines from "@/components/HeadLines"; 
import City from "@/components/news/City";
import HotNews from "@/components/news/HotNews";
import Advertisement from "@/components/news/items/Advertisement";
import LatesNews from "@/components/news/LatesNews";
import Sorotan from "@/components/news/Sorotan";
import Terkini from "@/components/news/Terkini";
import { base_api_url } from "@/config/config";
import TokenListener from "@/components/TokenListener";
import Recommendation from "@/components/news/Recommendation";

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
            <div className="w-full lg:w-11/12 ">
              <LatesNews news={sortedNews.slice(0, 1)}/>
            </div>

            {/* Terkini di kanan */}
            <div className="w-full lg:w-5/12">
              <Terkini news={sortedNews.slice(0, 5)} />
            </div>
          </div>
          {/* <div className="flex flex-col lg:flex-row gap-4 mt-8">
            <div className="flex w-full flex-col gap-y-[14px] pl-0 lg:pl-2">
              <Title title="Hukum & Kriminal"/>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                {
                  news["HukumKriminal"].slice(0, 2).map((item, i) => (
                    <SimpleNewsCard item={item} key={i} />
                  ))
                }
              </div>
            </div>
          </div> */}
          <div className="flex flex-col lg:flex-row gap-4 mt-8">
            <div className="w-full lg:w-8/12">
              <HotNews/>
            </div>
            
            {/* <div className="w-full lg:w-4/12">
              <Advertisement/>
            </div> */}
          </div>
          {/* <div className="w-full lg:w-8/12">
          <Sorotan news={sortedNews} />
          </div> */}
          <div className="w-full lg:w-8/12 mt-2">
            <Recommendation/>
          </div>
          <div className="w-full lg:w-8/12 mt-2">
            <City news={news}/>
          </div>
        </div>
      </div>
      <Footer/>
    </main>
  );
  
}

export default Home