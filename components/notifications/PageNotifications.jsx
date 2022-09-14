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
, onMount
} from 'solid-js';

import { GunContext } from '../auth/GunProvider';
import SendOnline from './SendOnline';

function PageNotifications(){

  return (<>
    <SendOnline/>
  </>)
}

export default PageNotifications;