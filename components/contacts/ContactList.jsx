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
, onMount,
For
} from 'solid-js';

import { useGun } from '../auth/GunProvider';

function ContactList(){

  const [aliasContacts, setAliasContacts] = createSignal([]);
  const [aliasPub, setAliasPub] = createSignal("");
  const rootGun = useGun();

  onMount(()=>{
    loadAliaList()
  })

  function loadAliaList(){
    return new Promise((res)=>{
      let gun = rootGun();
      let user = gun.user();
      user.get('contact').map().once(async function(data, id){
        //console.log("user:",data);
        if(!data){return;}
        if(data=="null"){return;}
        let msg = await SEA.verify(data, user._.sea);
        if (!msg){return;}
        let dec = await SEA.decrypt(msg, user._.sea);
        //console.log("dec: ", dec)
        if (dec){
          setAliasContacts(state=>[...state,dec])
        }
      });
      setTimeout(() => res(null), 500)
    });
  }

  function onSelectAlias(e){
    setAliasPub(e.target.value)
    //console.log("SELECT: ", e.target.value)
  }

  return (<div>
    <select value={aliasPub()} onChange={onSelectAlias}>
      <option value="">Alias Public Key</option>
      <For each={aliasContacts()}>{(contact, i) =>
        <option value={contact.pub}>{contact.alias}</option>
      }</For>
    </select>
  </div>)
}

export default ContactList;