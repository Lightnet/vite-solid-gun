/*
  Project Name: solid-trois
  License: MIT
  Created by: Lightnet
*/

import { 
  createSignal
, onCleanup
} from 'solid-js';

export default function Home() {
  const [name, setName] = createSignal('Guest');
  const [ran, setRan] = createSignal('');
  let timerID;
  //let gun = GUN("http://127.0.0.1:8000/gun"); //proxy
  let gun = GUN("http://127.0.0.1:3000/gun"); //proxy

  try{
    
    //let gun = GUN();

    gun.get('mark').put({
      name: "Mark",
      email: "mark@gun.eco",
    });
    
    gun.get('mark').on((data, key) => {
      console.log("realtime updates:", data);
      setRan(data.live)
    });

    gun.on("hi", peer => {
      //peer connect
      //console.log('connect peer to',peer);
      console.log("peer connect!");
    });
    gun.on("bye", peer => {
      // peer disconnect
      //console.log('disconnected from', peer);
      console.log("disconnected from peer!");
    });
    
    timerID = setInterval(() => { 
      let randMath = Math.random()
      //setRan(randMath)
      gun.get('mark').get('live').put(randMath) 
    }, 2000);
  }catch(e){
    console.log(e)
  }

  onCleanup(()=>{
    console.log("CLEAN UP")
    gun.get('mark').off();
    clearInterval(timerID)
  })

  return (
    <>
      <h1>Random {ran()}</h1>
    </>
  );
}