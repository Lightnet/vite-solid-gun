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
, useContext,
onMount,
For
} from 'solid-js';

import { GunContext } from '../auth/GunProvider';
import Modal from '../modal/Modal';
import SeaEncode from '../sea/SeaEncode';

function PageChatRoom(){
  
  const [roomID, setRoomID] = createSignal("");
  const [rooms, setRooms] = createSignal([]);
  const [isRoom, setIsRoom] = createSignal(false);

  const [MessagesID, setMessagesID] = createSignal(String.random(16));

  const [messages, setMessages] = createSignal([]);

  const [showEncode, setShowEncode] = createSignal(false);

  const [isCreateRoom, setIsCreateRoom] = createSignal(false);
  const [nameRoom, setNameRoom] = createSignal("");
  const [typeRoom, setTypeRoom] = createSignal("public");

  const isShowEncode = createMemo(()=>{
    //console.log(showEncode())
    return showEncode();
  })

  function onCloseEncode(){
    setShowEncode(false)
  }

  function onCloseCreate(){
    setShowEncode(false)
  }

  const {rootGun} = useContext(GunContext);
  let gun = rootGun();

  async function createRoom(){
    console.log(SEA)
    let roomPair = await SEA.pair()
    console.log(roomPair)
    let user = gun.user();
    //console.log(user)
    console.log(user._.sea)
    let userPair = user._.sea;

    let sec = await SEA.secret(userPair.pub,userPair)//default?
    console.log(sec)
    let uuid = String.random(16);
    let roomData ={
      pub:roomPair.pub,
      name:uuid,
      key:roomPair
    }

    //let encode = await SEA.encrypt(roomPair,sec);
    let encode = await SEA.encrypt(roomData,sec);
    console.log(encode)

    //let decode = await SEA.decrypt(encode,sec);
    //console.log(decode)

    //add room pair to owner
    user.get("groupmessage").get(uuid).put(encode)

    // Issue the wildcard certificate for all to write personal items to the 'profile'
    const cert = await SEA.certify( 
      '*',  // everybody is allowed to write
      { '*':'message', '+': '*' }, // to the path that starts with 'profile' and along with the key has the user's pub in it
      roomPair, //authority
      null, //no need for callback here
      { expiry: Date.now() + (60*60*24*1000) } // Let's set a one day expiration period
    );

    const gunInstance = GUN(location.origin+"/gun");
    // https://gun.eco/docs/SEA.certify
    // Authenticate with the room pair
    gunInstance.user().auth(roomPair, () => { 
       // Put the certificate into the room graph for ease of later use
       gunInstance.user()
          .get('certs')
          .get('message')
          .put(cert);
    });

  }

  onMount(()=>{
    updateRoomList()
  })

  onCleanup(()=>{

  })

  //async function clickRefresh(){
    //console.log(GUN)
    //console.log(String.random(16))
  //}

  async function clickOptions(){
    console.log(GUN)
    console.log(String.random(16))
  }

  function updateRoomList(){
    let user = gun.user();
    let userPair = user._.sea;
    setRooms([])
    user.get("groupmessage").map().once(async (data,key)=>{
      console.log("data: ",data)
      if(data){
        let sec = await SEA.secret(userPair.pub,userPair)//default?
        let decode = await SEA.decrypt(data,sec);
        console.log("decode: ", decode)
        setRooms(state=>[...state,decode])
      }
    })
  }

  //
  function joinRoom(){
    if(roomID() && roomID() != ""){
      console.log("READY ROOM")
      setIsRoom(true)
    }else{
      console.log("EMPTY ROOM ID")
    }
  }


  //<button onClick={clickRefresh}> refresh </button>
  //<button onClick={()=>setIsCreateRoom(true)}> Create </button>
  //<button onClick={()=>setShowEncode(true)}> Encode </button>
  //<button onClick={()=>setShowEncode(true)}> Decode </button>

  function scroll_bottom(){
    let element = document.getElementById(MessagesID());
    if(element){
      element.scrollTop = element.scrollHeight;
    }
  }

  createEffect(()=>{
    if(messages()){
      scroll_bottom()
    }
  })

  return(<>
    {!isRoom() ? 
    <table>
      <tbody>
        <tr>
          <td>
          <label>Room ID:</label>
          <input value={roomID()} onInput={(e)=>setRoomID(e.target.value)} />
          <select onChange={e=>setRoomID(e.target.value)}>
            <option value=""> Room key </option>
            <For each={rooms()}>{(room, i)=>
              <option value={room.pub}>{room.name}</option>
            }

            </For>
          </select>

          <button onClick={joinRoom}> Join </button>

          <button onClick={createRoom}> Add </button>
          <button onClick={createRoom}> Remove </button>
          <button onClick={clickOptions}> Options </button>
          </td>
        </tr>
      </tbody>
    </table>
    :
    <table>
      <tbody>
        <tr>
          <td>
          <label>Room ID:</label>
          <input value={roomID()} readOnly/>
          <button onClick={joinRoom}> Leave </button>
          <button onClick={clickOptions}> Options </button>
          </td>
        </tr>
      </tbody>
    </table>
    }
    <div id={MessagesID()} style="height:calc(100vh - 50px);overflow-y: scroll; ">

    </div>
    <Modal isopen={isShowEncode()} onClose={onCloseEncode} height={300} enabledrag>
      <label> Hello </label>
      <SeaEncode></SeaEncode>
    </Modal>

    <Modal isopen={isCreateRoom()} onClose={onCloseCreate} height={128} width={280} enabledrag>
      <table>
        <tbody>
          <tr>
            <td>
              <label> Room: </label>
            </td>
          </tr>

          <tr>
            <td>
              <label> Name: </label>
            </td>
            <td>
              <input value={nameRoom()} onInput={e=>setNameRoom(e.target.value)} />
            </td>
          </tr>

          <tr>
            <td>
              <label> Type: </label>
            </td>
            <td>
              <select value={typeRoom()} onChange={e=>setTypeRoom(e.target.value)}>
                <option value="public"> Public </option>
                <option value="private"> Private </option>
              </select>
            </td>
          </tr>

          <tr>
            <td>
              <button onClick={createRoom}> Create </button>
            </td>
            <td>
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>
  </>)
}

export default PageChatRoom;