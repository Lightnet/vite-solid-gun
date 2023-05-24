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

import { useGun } from '../auth/GunProvider';

function AddContact(){

  const [aliasPub,setAliasPub] = createSignal("");
  //const [aliasContacts,setAliasContacts] = createSignal([]);

  const rootGun = useGun();

  function checkAliasExist(_public_key){
    return new Promise((res)=>{
      let gun = rootGun();
      let user = gun.user();
      //console.log("_public_key: ",_public_key)
      user.get('contact').map().once(async function(data, id){
        //console.log("user:",data);
        if(!data){return;}
        if(data=="null"){return;}
        let msg = await SEA.verify(data, user._.sea);
        if (!msg){return;}
        let dec = await SEA.decrypt(msg, user._.sea);
        //console.log("dec: ", dec)
        if (dec){
          //setAliasContacts(state=>[...state,dec])
          if(dec.pub == _public_key){
            res(true)
          }
        }
      });
      setTimeout(() => res(null), 500)
    });
  }

  async function addAliasPublicKey(e){
    e.preventDefault();
    //console.log("KEY:",e)
    //console.log("VALUE:",aliasPub())
    //console.log(rootGun())
    
    let gun = rootGun();
    let user = gun.user();

    let addWho = gun.user(aliasPub())
    let who = await addWho.then();
    //console.log("addWho: ", addWho)
    //console.log("alias: ", addWho.alias)//nope
    //console.log("who: ", who)
    //console.log("alias: ", who.alias)
    //console.log(isUser)

    //console.log(user)
    if (who && who?.alias){
      let isAdded = await checkAliasExist(aliasPub());
      //user.get('contact').
      //console.log(GUN)
      //console.log(String.random(16))
      //console.log("isAdded: ", isAdded)
      if(isAdded==null){
        //add here
        let RandId = String.random(16);
        let data = {
          alias:who.alias,
          pub:who.pub
        }
        let enc = await SEA.encrypt(data, user._.sea);
        data = await SEA.sign(enc, user._.sea);
        user.get('contact').get(RandId).put(data)
      }
    }
  }

  async function removeAliasPublicKey(e){
    e.preventDefault();
    //console.log("KEY:",e)
    //console.log("VALUE:",aliasPub())

    let gun = rootGun();
    let user = gun.user();

    let addWho = gun.user(aliasPub())
    let who = await addWho.then();
    if (who && who?.alias){
      user.get('contact').map().once(async function(data, id){
        let msg = await SEA.verify(data, user._.sea);
        if(!msg){
          return;
        }
        let dec = await SEA.decrypt(msg, user._.sea);
        //console.log("dec: ", dec)
        if(dec.pub == aliasPub()){
          user.get('contact').get(id).put("null")
        }
      });
    }
  }

  return (<>
    <label> Public Key:</label>
    <input value={aliasPub()} onInput={e=>setAliasPub(e.target.value)} />
    <button onClick={addAliasPublicKey}> Add </button>
    <button onClick={removeAliasPublicKey}> Remove </button>
  </>)
}

export default AddContact;