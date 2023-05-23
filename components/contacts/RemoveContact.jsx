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

function RemoveContact(){

  return (<>
    <label> Public Key:</label>
    <input />
    <button> Remove </button>
  </>)
}

export default RemoveContact;