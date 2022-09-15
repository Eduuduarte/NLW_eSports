import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog'

import axios from 'axios';

import './styles/main.css';

import logoImg from './assets/Logo.svg';
import { GamerBanner } from './components/GamerBanner';
import { CrateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    Ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
        setGames(response.data)
      })
  }, []);


  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>

        {games.map(game => {
          return (
            <GamerBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.Ads}
            />
          )
        })}

      </div>
      <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8'>
        <Dialog.Root>
          <CrateAdBanner />
          
          <CreateAdModal />
        </Dialog.Root>
      </div>
    </div>
  )
}

export default App;
