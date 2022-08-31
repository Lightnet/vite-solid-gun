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

function Notifications(){
  const [days, setDays] = createSignal(1);
  const [rootGun] =useContext(GunContext);
  const gun = rootGun();

  async function setNotificationsCert(){
    let user = gun.user();
    //console.log(user)

    const cert = await SEA.certify( 
      '*',  // everybody is allowed to write
      { '*':'notifications', '+': '*' }, // to the path that starts with 'profile' and along with the key has the user's pub in it
      //room, //authority
      user._.sea, //authority
      null, //no need for callback here
      { expiry: Date.now() + (60*60*24*1000) } // Let's set a one day expiration period
    ) 

    gun.user()
    .get('certs')
    .get('notifications')
    .put(cert)

  }

  async function getNotificationsCert(){
    const cert = await gun.user().get('certs').get('notifications').then()
    console.log(cert)
  }

  return (<div>
    <label>Notifications: </label>
    <label>Expire Days:<input type="number" value={days()}/> </label>
    <button onClick={setNotificationsCert}> Apply Cert </button>
    <button onClick={getNotificationsCert}> Get Cert </button>
  </div>)
}
export default Notifications;