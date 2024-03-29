

import {
  createSignal
, onMount
, onCleanup
, createEffect
, createMemo
, createContext
, useContext
} from 'solid-js';

import GUN from "gun/gun";
import "gun/lib/open";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/rindexed";
import "gun/sea";

export const GunContext = createContext([{ 
  gun:null
}]);

function GunProvider(props){
  //console.log("init Gun Provider")
  const [rootGun, setRootGun] = createSignal(null);
  const [userAliasPub, setUserAliasPub] = createSignal("");
  const [userAlias, setUserAlias] = createSignal("");
  const [isLogin, setIsLogin] = createSignal(false);

  function initGun(){
    //setGun(Gun());
    //console.log(gun())
    if(rootGun()==null){
      //console.log(location.origin)
      //const _gun = GUN() //note if use it will not connect since es module
      //const _gun = GUN("http://localhost:3000/gun")
      const _gun = GUN(location.origin+"/gun")
      _gun.on("hi", peer => {
        //peer connect
        //console.log('connect peer to',peer);
        console.log("peer connect!");
      });
      _gun.on("bye", peer => {
        // peer disconnect
        //console.log('disconnected from', peer);
        console.log("disconnected from peer!");
      });
      //_gun.get('mark').on((data, key) => {
        //console.log("realtime updates:", data);
      //});
      setRootGun(_gun)
      //console.log("SETUP FINISH")
    }
  }

  //onMount(()=>{
    //initGun()
  //})

  initGun()

  const value = {
    rootGun, setRootGun,
    userAlias, setUserAlias,
    userAliasPub, setUserAliasPub,
    isLogin, setIsLogin
  };

  return (
    <GunContext.Provider value={value}>
      {props.children}
    </GunContext.Provider>
  );
}

export default GunProvider;

export function useGun(){
  const {rootGun} = useContext(GunContext)
  //const myGun = rootGun;
  return rootGun();
}

export function useGunContext(){
  return useContext(GunContext)
}