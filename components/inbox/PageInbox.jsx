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

function PageInbox(){
  const [pubKey, setPubKey]= createSignal("")
  const [message, setMessage]= createSignal("")
  const [inbox, setInbox]= createSignal()

  const [messages, setMessages] = createSignal(new Map())
  //const []= createSignal("")

  const [rootGun] = useContext(GunContext);
  let gun = rootGun();
  let gunInbox;

  function initInbox(){
    gunInbox = gun.user().get('inbox')
    setInbox(gunInbox)
    gunInbox.map((data,key)=>{
      //console.log("/// INBOX ///")
      //console.log(key)
      //console.log(data)
      addMessage(data,key)
    })
  }

  function addMessage(data,key){
    const newList = new Map(messages());
    newList.set(key, {message:data.message});
    setMessages(newList)
  }

  initInbox();

  onCleanup(()=>{
    if(inbox()){
      inbox().off();
    }
    if(gunInbox){
      gunInbox.off();
    }
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
    return [...dmsgs].map(item=>{
      console.log(item)
      return <div id={item[0]}>
        <label> Pub:{item[0]} </label><br/>
        <label> Message:{item[1].message}</label><br/>
        </div>
    })
  })

  async function sentMessage(){
    let user = gun.user();
    //console.log(user.is)
    //user.is.pub
    let to = gun.user(pubKey())

    if(to){
      const cert = await to.get('certs').get('inbox').then()
      console.log(cert)
      to.get('inbox').get(user.is.pub)
        .get('message')
        .put(message(),null,{opt: { cert: cert }})

      //to.get('inbox')
    }
  }

  function onPubKey(e){setPubKey(e.target.value)}
  function onMessage(e){setMessage(e.target.value)}

  createEffect(()=>{
    //console.log(messages())
    //let d = messages();
    //console.log(d)
    //console.log(messageList())
  })

  return(<>
    <label> Public Key </label>
    <input value={pubKey()} onInput={onPubKey} />

    <label> Message </label>
    <input value={message()} onInput={onMessage} />

    <button onClick={sentMessage}> Sent </button>
    <div>
      {messageList()}
    </div>
  </>)
}

export default PageInbox;