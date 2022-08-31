/*
  Project Name: vite-solid-gun
  License: MIT
  Created by: Lightnet
*/

import { 
  createSignal
, onCleanup
, useContext
} from 'solid-js';

import { GunContext } from '../components/auth/GunProvider';

export default function Home() {
  const [name, setName] = createSignal('Guest');

  const [rootGun] = useContext(GunContext)

  const gun = rootGun();

  const user = gun.user();
  if(user.is){
    setName(user.is.alias)
  }
  

  onCleanup(()=>{

  })

  return (
    <>
      <label>Alias: {name()}</label>
    </>
  );
}