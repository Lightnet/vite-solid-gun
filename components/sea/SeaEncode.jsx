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
} from 'solid-js';

export default function SeaEncode(){

  const [isPair, setIsPair] = createSignal(false);

  const [status, setStatus] = createSignal("Empty");


  const [pairJson, setPairJson] = createSignal(null);//text
  const [pair,setPair] = createSignal(null);//object
  const [worker1, setWorker1] = createSignal("");
  const [worker2, setWorker2] = createSignal("");

  const [data, setData] = createSignal("");
  const [result, setResult] = createSignal("");
  const [key, setKey] = createSignal("");

  function onTypeChange(e){
    console.log(e.target.checked)
    setIsPair(e.target.checked)
  }

  createEffect(async ()=>{
    if(pair()){

    }else{
      if(worker1() && worker2() && data()){
        console.log(worker1())
        console.log(worker2())
        let sec = await SEA.work(worker1(), worker2())
        let encode = await SEA.encrypt(data() , sec)
        setResult(encode)
      }
    }
  })

  return (<>
  <div>
  <div>
    <label>Type: Is Pair?</label>
    <input type="checkbox" checked={isPair()} onChange={onTypeChange}></input>
  </div>
    {isPair()?(<>
      <div>
        <div>
          <label> Sea Pair:</label>
        </div>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <label> Key (pub / epub) :</label>
        </div>
        <div>
          <input />
        </div>
      </div>
    </>):(<>
      <div>
        <div>
          <label> Worker #1:</label>
        </div>
        <div>
          <textarea value={worker1()} onInput={(e)=>setWorker1(e.target.value)}></textarea>
        </div>
        <div>
          <label> Worker #2:</label>
        </div>
        <div>
          <textarea value={worker2()} onInput={(e)=>setWorker2(e.target.value)}></textarea>
        </div>
      </div>
    </>)}
    <div>
      <label>Status: {status()}</label> 
    </div>
    <div>
      <label>Data:</label> 
    </div>
    <div>
      <textarea value={data()} onInput={(e)=>setData(e.target.value)} />
    </div>
    <div>
      <label>Result:</label> 
    </div>
    <div>
      <textarea value={result()} />
    </div>
  </div>
  </>)
}