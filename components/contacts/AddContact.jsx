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

function AddContact(){

  const [aliasPub,setAliasPub] = createSignal("");

  function addPublicKey(e){
    console.log("KEY:",e)
    console.log("VALUE:",aliasPub())
  }

  return (<>
    <label> Public Key:</label>
    <input value={aliasPub()} onInput={e=>setAliasPub(e.target.value)} />
    <button onClick={addPublicKey}> Add </button>
    <button> Remove </button>
  </>)
}

export default AddContact;