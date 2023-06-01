

import {
  createSignal
, createEffect
, onMount
, onCleanup
, createMemo
, useContext
} from "solid-js";

import { GunContext } from "./GunProvider";

export default function DisplayAliasPub(){

  const {rootGun, userAlias, userAliasPub} = useContext(GunContext)
  //console.log(rootGun())
  const gun = rootGun();
  let user = gun.user();

  const [alias, setAlias] = createSignal(user?.is?.alias || "Guest")
  const [publicKey, setPublicKey] = createSignal(user?.is?.pub || "")
  const [toggleKey, setToggleKey] = createSignal(false)

  createEffect(()=>{
    let pub = userAliasPub()
    if(pub){
      setPublicKey(pub);
    }
  })

  createEffect(()=>{
    let _alias = userAlias()
    if(_alias){
      setAlias(_alias)
    }
  })

  function copyPubKey(){
    console.log("KEY:",publicKey())
    navigator.clipboard.writeText(publicKey());
  }

  function togglePubKey(){
    console.log("toggle")
    setToggleKey(state=>!state)
  }

  const isExpand = createMemo(() =>{//watch variable change
    if(toggleKey()==true){
      return "-"
    }else{
      return "+"
    }
  });

  const ShowPubKey = createMemo(() =>{//watch variable change
    if(toggleKey()==true){
      return String(publicKey())
    }else{
      return "Hidden"
    }
  });

  return (<>
  <label>Alias: {alias()} </label>
  {toggleKey()?<input value={ShowPubKey()} readonly />:<></>}
  
  <label onClick={togglePubKey}>[{isExpand()}]</label>
  <label onClick={copyPubKey}>[copy]</label> 
  </>)
}