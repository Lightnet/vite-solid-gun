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
import AddContact from './AddContact';
import RemoveContact from './RemoveContact';

function PageContacts(){

  return (<>
    <AddContact />
    
  </>)
  //<RemoveContact />
}

export default PageContacts