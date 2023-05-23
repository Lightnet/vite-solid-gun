/*
  Project Name: vite-solid-gun
  License: MIT
  Created by: Lightnet
*/

// https://gun.eco/docs/SEA.certify
/*
// Generate a new key pair
const room = await SEA.pair() 

// Issue the wildcard certificate for all to write personal items to the 'profile'
const cert = await SEA.certify( 
  '*',  // everybody is allowed to write
  { '*':'profile', '+': '*' }, // to the path that starts with 'profile' and along with the key has the user's pub in it
  room, //authority
  null, //no need for callback here
  { expiry: Date.now() + (60*60*24*1000) } // Let's set a one day expiration period
) 

// Authenticate with the room pair
gun.user().auth(room, () => { 
  // Put the certificate into the room graph for ease of later use
  gun.user()
    .get('certs')
    .get('profile')
    .put(cert) 
})
*/

import { 
  createSignal
, createMemo
, createEffect 
, onCleanup
, useContext
} from 'solid-js';

import { GunContext } from '../auth/GunProvider';
import Modal from '../modal/Modal';
import SeaEncode from '../sea/SeaEncode';

function PageChatRoom(){
  
  const [roomID, setRoomID] = createSignal("");
  const [rooms, setRooms] = createSignal([]);

  const [showEncode, setShowEncode] = createSignal(false);

  const isShowEncode = createMemo(()=>{
    //console.log(showEncode())
    return showEncode();
  })

  function onCloseEncode(){
    setShowEncode(false)
  }

  const [rootGun] = useContext(GunContext);
  let gun = rootGun();

  async function createRoom(){
    console.log(SEA)
    let pair = await SEA.pair()
    console.log(pair)
    let user = gun.user();
    //console.log(user)
    console.log(user._.sea)
    let userpair = user._.sea;

    let sec = await SEA.secret(userpair.pub,userpair)//default?
    console.log(sec)
    let encode = await SEA.encrypt(pair,sec);
    console.log(encode)

    //let decode = await SEA.decrypt(encode,sec);
    //console.log(decode)

    let uuid = String.random(16);
    //user.get("groupmessage").get(uuid).put(encode)
  }

  onCleanup(()=>{

  })

  async function clickRefresh(){
    console.log(GUN)
    console.log(String.random(16))
  }

  async function clickOptions(){
    console.log(GUN)
    console.log(String.random(16))
  }

  return(<>
    <label>Room ID:</label>
    <input value={roomID()} onInput={(e)=>setRoomID(e.target.value)}  />
    <button onClick={clickRefresh}> refresh </button>
    <button onClick={createRoom}> Create </button>
    <button onClick={clickOptions}> Options </button>
    <button onClick={()=>setShowEncode(true)}> Encode </button>
    <button onClick={()=>setShowEncode(true)}> Decode </button>
    <div>

    </div>
    <Modal isopen={isShowEncode()} onClose={onCloseEncode} height={300} enabledrag>
      <label> Hello </label>
      <SeaEncode></SeaEncode>
    </Modal>
  </>)
}

export default PageChatRoom;