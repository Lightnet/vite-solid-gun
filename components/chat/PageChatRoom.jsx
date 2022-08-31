/*
  Project Name: vite-solid-gun
  License: MIT
  Created by: Lightnet
*/

import { 
  createSignal
, createMemo
, createEffect 
, onCleanup
, useContext
} from 'solid-js';

import { GunContext } from '../auth/GunProvider';

function PageChatRoom(){
//async
  const [rootGun] = useContext(GunContext);
  let gun = rootGun();

  return(<>
  
  </>)
}

export default PageChatRoom;