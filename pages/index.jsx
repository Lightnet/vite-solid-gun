/*
  Project Name: vite-solid-gun
  License: MIT
  Created by: Lightnet
*/

import { 
  createSignal
, onCleanup
} from 'solid-js';

import { useGun } from '../components/auth/GunProvider';

export default function Home() {
  const [name, setName] = createSignal('Guest');
  const gun = useGun();
  const user = gun.user();

  if(user.is){
    setName(user.is.alias)
  }
  
  onCleanup(()=>{ })

  return (
    <>
      <label>Alias: {name()}</label>
    </>
  );
}