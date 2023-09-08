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
, onMount
} from 'solid-js';

import { GunContext, useGun } from '../auth/GunProvider';

function SendOnline(){

  const [pubKey,setPubKey] = createSignal("")
  const gun = useGun();

  async function sendNote(){
    let pub = pubKey();
    if(!pub){
      return
    }
    let user = gun.user();
    let to = gun.user(pub)
    let who = await to.then()
    console.log(to)
    if(!who?.alias){
      console.log("NOT FOUND")
      return;
    }
    console.log("Alias:",who.alias)
    console.log("check... notify...")
    const cert = await to.get('certs').get('notifications').then()
    console.log(cert)
    /*

    
    console.log("OWNER:", user._.pub)
    console.log("TO:", pub)
    //
    to.get('notifications').get(user._.pub).put({
      typ:"STATUS",
      message:"online",
      date: Date.now(),
      isRead:false
    },null,{opt: { cert: cert }})
    */

  }

  function onPub(e){
    setPubKey(e.target.value)
  }

  return (<>
    <label> Public Key:</label>
    <input value={pubKey()} onInput={onPub}/>
    <button onClick={sendNote}> sent Online </button>
  </>)
}

export default SendOnline;