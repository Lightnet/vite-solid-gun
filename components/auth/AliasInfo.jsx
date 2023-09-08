
import {
  createSignal
, createEffect
, onMount
, onCleanup
, createMemo
, useContext
} from "solid-js";

import { useGun } from "./GunProvider";

const PageAliasInfo = () =>{

  //console.log(rootGun())
  const gun = useGun();
  let user = gun.user();

  const [alias, setAlias] = createSignal(user?.is?.alias || "Guest")
  const [publicKey, setPublicKey] = createSignal(user?.is?.pub || "")
  const [toggleKey, setToggleKey] = createSignal(true)

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

  return (<div>
    <label>Alias: {alias()}</label><br/>
    <label onClick={copyPubKey}>Public Key:</label>
    <input value={ShowPubKey()} readonly />
    <label onClick={togglePubKey}>[{isExpand()}]</label>
    <label onClick={copyPubKey}>[copy]</label> 
    <br/>
  </div>);
}

export default PageAliasInfo;