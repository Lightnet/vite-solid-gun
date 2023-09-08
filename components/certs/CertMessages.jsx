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

import { useGun } from '../auth/GunProvider';

function CertMessages(){

  const [days, setDays] = createSignal(1);
  const gun = useGun();

  async function setMessagesCert(){

    let user = gun.user();
    //console.log(user)

    const cert = await SEA.certify( 
      '*',  // everybody is allowed to write
      { '*':'messages', '+': '*' }, // to the path that starts with 'profile' and along with the key has the user's pub in it
      //room, //authority
      user._.sea, //authority
      null, //no need for callback here
      { expiry: Date.now() + (60*60*24*1000) } // Let's set a one day expiration period
    ) 

    gun.user()
    .get('certs')
    .get('messages')
    .put(cert)
  }

  async function getMessagesCert(){
    const cert = await gun.user().get('certs').get('messages').then()
    console.log(cert)
  }

  return (<div>
    <label>Messages: </label>
    <label>Expire Days:<input type="number" value={days()}/> </label>
    <button onClick={setMessagesCert}> Apply Cert </button>
    <button onClick={getMessagesCert}> Get Cert </button>
  </div>)
}
export default CertMessages;