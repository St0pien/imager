import { convertFileSrc, invoke } from '@tauri-apps/api/core';

import { open } from '@tauri-apps/plugin-dialog';
import { useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke('greet', { name }));
  }

  const [img, setImg] = useState<string>('');

  const selectImage = async () => {
    const selected = await open({
      multiple: false,
      filters: [
        {
          name: 'Images',
          extensions: ['png', 'jpg', 'jpeg', 'webp'],
        },
      ],
    });

    if (selected && typeof selected === 'string') {
      console.log(selected);
      setImg(convertFileSrc(selected));
    }
  };

  return (
    <main className='bg-background h-screen w-screen'>
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <h1> hi mak</h1>

        <input
          type='text'
          value={name}
          onChange={e => {
            setName(e.currentTarget.value);
          }}
        />
        <Button onClick={greet}>Say hi!</Button>
        <div className='mt-10'>{greetMsg}</div>

        <Button onClick={selectImage}>Pick file</Button>

        <img src={img} />
      </div>
    </main>
  );
}

export default App;
