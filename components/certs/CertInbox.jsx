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

function CertInbox(){
  const [days, setDays] = createSignal(1);
  const gun = useGun();

  async function setInboxCert(){
    let user = gun.user();
    //console.log(user)

    const cert = await SEA.certify( 
      '*',  // everybody is allowed to write
      {'#':{ '*':'inbox' }}, // to the path that starts with 'profile' and along with the key has the user's pub in it
      //room, //authority
      user._.sea, //authority
      null, //no need for callback here
      { expiry: Date.now() + (60*60*24*1000) } // Let's set a one day expiration period
    ) 

    gun.user()
    .get('certs')
    .get('inbox')
    .put(cert)
  }

  async function getInboxCert(){
    const cert = await gun.user().get('certs').get('inbox').then()
    console.log(cert)
  }

  return (<div>
    <label> Inbox: </label>
    <label>Expire Days:<input type="number" value={days()}/> </label>
    <button onClick={setInboxCert}> Apply Cert </button>
    <button onClick={getInboxCert}> Get Cert </button>
  </div>)
}
export default CertInbox;