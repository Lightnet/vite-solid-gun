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
, For
} from 'solid-js';

import { useGun } from '../auth/GunProvider';

function PagePrivateMessages(){
//async
  const [message, setMessage] = createSignal("");
  const [messages, setMessages] = createSignal(new Map());
  const [pub, setPub] = createSignal("");
  const [pubKeys, setPubKeys] = createSignal([]);

  const gun = useGun();

  function inputChatMessage(e){
    //console.log(e)
    setMessage(e.target.value)
  }

  function inputKeyChatMessage(e){
    //console.log(e)
    if(e.keyCode==13){
      console.log("MESSAGE: ", message());
      sendMessage()
    }
  }

  async function sendMessage(){
    if(pub() != ""){
      let user = gun.user();
      let to = gun.user(pub())
      if(to){
        const cert = await to.get('certs').get('privatemessage').then()
        console.log("certs:", cert)

        const data = {
          message:message(),
          date: Date.now()
        }
        //check for data hash match later
        var hash = await SEA.work(data, null, null, {name: "SHA-256"});
        console.log(hash)
        to.get('privatemessage').get(user.is.pub).get(hash).put(data,(ack)=>{
          console.log(ack)
        },{opt: { cert: cert }})
      }
    }
  }

  function initMessages(){
    gun.user().get('privatemessage').off();
  }

  function initAliasPubs(){
    gun.user().get('privatemessage').off();

    let gunPrivateMessage = gun.user().get('privatemessage');

    gunPrivateMessage.once( async (data,key)=>{
      for( let _Key in data ){
        const _name = await getUserName(_Key);
        if(_name !=null){
          console.log("NAME: ",_name)
          let userData = {
            alias:_name,
            pub:_Key
          }
          setPubKeys(state=>[...state,userData]);
        }
      }
    })
  }

  //check user exist
  async function getUserName(_id){
    let to = await gun.user(_id)
    //console.log(to?.alias);
    if(typeof to?.alias === 'string'){
      return to.alias;
    }else{
      return null;
    }
  }

  function viewMessage(){
    loadAliasPubMessages()
  }

  function addContact(){

  }

  function removeContact(){

  }

  function clearMessages(){
    const newList = new Map();
    setMessages(newList)
  }

  function addMessage(data,key){
    //console.log(data)
    const newList = new Map(messages());
    newList.set(key, {message:data.message, alias:data.alias});
    setMessages(newList)
  }

  async function loadAliasPubMessages(){
    gun.user().get('privatemessage').off()
    let aliasMapMsg = gun.user().get('privatemessage').get(pub());
    const _name = await getUserName(pub());
    if(_name){//check if name exist
      aliasMapMsg.map().once((data0,key0,_msg, _ev)=>{
        addMessage({message:data0.message, alias: _name}, key0)
      });
    }
  }

  function selectAlias(e){
    //console.log(e.target.value);
    setPub(e.target.value);
    clearMessages()
    loadAliasPubMessages()
  }

  onMount(()=>{
    initAliasPubs()
  })

  onCleanup(()=>{

  })

  const messageList = createMemo(()=>{
    let dmsgs = messages();
    //console.log(dmsgs);
    //return dmsgs.forEach((value, key) => {
      //console.log("key>>>",key)
      //return <div id={key}>{value.message}</div>
    //})
    let arr = [...dmsgs];
    //console.log(arr)
    //scroll_bottom()
    return [...dmsgs].map(item=>{
      //console.log(item)
      return <div id={item[0]}>
        <label> [Alias: {item[1].alias}] </label>
        <label> [Msg:]{item[1].message}</label><br/>
        </div>
    })
  })

  return(<>
    <div>
      <label>Private Message Pub:</label>
      <input value={pub()} onInput={e=>setPub(e.target.value)} placeholder='Alias public key'> </input>
      <select onChange={selectAlias}>
        <option value="">  Public key </option>
        <For each={pubKeys()}>{(member)=>
        <option value={member.pub}> {member.alias}  </option>
        }</For>
      </select>
      <button onClick={viewMessage}> View </button>
      <button onClick={addContact}> Add </button>
      <button onClick={removeContact}> Remove </button>
    </div>
    <div>
      <input value={message()} onKeyUp={inputKeyChatMessage} onInput={inputChatMessage} placeholder='chat message'></input>
      <button onClick={sendMessage}> Send </button>
    </div>
    <div id="messages" style="height:calc(100vh - 80px)">
      {messageList()}
    </div>
  </>)
}

export default PagePrivateMessages;