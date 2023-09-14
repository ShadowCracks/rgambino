import Head from 'next/head';
import type { NextPage } from 'next';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CrashGame from '../components/CrashGame';


const Home: NextPage = () => {
  return (
    <div className="bg-gray-900 text-white h-screen snap-y snap-mandatory overflow-y-scroll 
    overflow-x-hidden z-0 scrollbar scrollbar-track-gray-400 scrollbar-thumb-yellow-600/80">
      <Head>
        <title>Gambino Crypto Casino</title>
      </Head>
      
      <section>
        <Header />
      </section>
      <section>
       <CrashGame />
      </section>

      




    </div>
    
  );
};

export default Home;

