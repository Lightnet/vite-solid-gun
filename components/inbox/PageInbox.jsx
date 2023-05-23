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

import { GunContext } from '../auth/GunProvider';

function PageInbox(){
  const [pubKey, setPubKey]= createSignal("")
  const [message, setMessage]= createSignal("")
  const [inbox, setInbox]= createSignal()
  const [status, setStatus]= createSignal("Idle")

  const [messages, setMessages] = createSignal(new Map())
  const [aliasList, setAliasList] = createSignal([])
  const [isExit, setIsExist] = createSignal(false)
  //const []= createSignal("")

  const [rootGun] = useContext(GunContext);
  let gun = rootGun();
  let gunInbox;
  let gunList=[];

  function initInbox(){
    console.log("Init InBox")
    //console.log(inbox())
    gun.user().get('inbox').off();
    gunInbox = gun.user().get('inbox')
    setInbox(gunInbox)
    gunInbox.once( async (data,key)=>{
      console.log(data)
      console.log(key)
      
      //const _name = await getUserName(key);
      //let alist = aliasList();
      /*
      for( let _Key in data ){
        //console.log(_Key)
        const _name = await getUserName(_Key);
        //console.log(_name)
        if(_name !=null){
          console.log(_name)
          const aliasMapMsg = gun.user().get('inbox').get(_Key);

          const d = await gun.user().get('inbox').get(_Key).then();
          console.log(d)

          aliasMapMsg.map().once((data0,key0,_msg, _ev)=>{
            if(isExit()){
              gun.user().get('inbox').off();
            }
            console.log(data0)
            console.log(key0)
            addMessage({message:data0.message,alias: _name},key0)
          })

          let DMap = aliasList();
          let AliasD = {
            key:_Key,
            gun:aliasMapMsg
          }
          gunList.push(aliasMapMsg)
          DMap.push(AliasD);
          setAliasList(DMap);

        }
      }
      */
    })
  }

  function addMessage(data,key){
    const newList = new Map(messages());
    newList.set(key, {message:data.message,alias:data.alias});
    setMessages(newList)
  }

  onMount(()=>{
    initInbox();
  })
  

  onCleanup(()=>{
    console.log("CLEAN UP")
    setIsExist(true)
    if(inbox()){
      inbox().off();
      setInbox(null)
    }
    if(gunInbox){
      gunInbox.off();
      gunInbox=null;
    }
    gun.user().get('inbox').off();
    let alist = aliasList()
    for(let index in alist){
      console.log(alist[index])
      alist[index].gun.off();
    }

    for(let index in gunList){
      console.log(gunList[index])
      gunList[index].off();
    }
    setAliasList([])
  })

  async function getUserName(_id){
    let to = await gun.user(_id)
    //console.log(to?.alias);
    if(typeof to?.alias === 'string'){
      return to.alias;
    }else{
      return null;
    }
  }

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
      //console.log(item)
      return <div id={item[0]}>
        <label> [Alias: {item[1].alias}] </label>
        <label> [Msg:]{item[1].message}</label><br/>
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

      const data = {
        message:message(),
        date: Date.now()
      }
      var hash = await SEA.work(data, null, null, {name: "SHA-256"});
      console.log(hash)

      to.get('inbox').get(user.is.pub).get(hash).put(data,null,{opt: { cert: cert }})

      //to.get('inbox').get(user.is.pub).put(null,null,{opt: { cert: cert }})

      //to.get('inbox')
    }
  }

  async function onPubKey(e){
    if(!e.target.value){
      return;
    }
    getUserName(e.target.value);
    let to = await gun.user(e.target.value)
    console.log(to?.alias)
    if(to?.alias){
      console.log("FOUND FOUND")
      setStatus(to.alias)
    }else{
      console.log("NOT FOUND FOUND")
      setStatus("None")
    }
    setPubKey(e.target.value)
  }
  function onMessage(e){setMessage(e.target.value)}

  createEffect(()=>{
    //console.log(messages())
    //let d = messages();
    //console.log(d)
    //console.log(messageList())
  })

  function getMap(){
    let user = gun.user();
    console.log(user);
    user.get('inbox').map().once(data=>{
      console.log(data)
    })

    user.get('inbox').map().off();
  }

  return(<>
    <label> Public Key </label>
    <input value={pubKey()} onInput={onPubKey} />
    <label>Status: {status()} </label>
    <br/>

    <label> Message </label>
    <input value={message()} onInput={onMessage} />

    <button onClick={sentMessage}> Sent </button>
    <button onClick={getMap}> Map </button>
    <div>
      {messageList()}
    </div>
  </>)
}

export default PageInbox;