

import {
  createSignal
, createEffect
, onMount
, onCleanup
, createMemo
, useContext
//, on
} from "solid-js";

import { useGun } from "./GunProvider";
import { useNavigate } from "@solidjs/router";

const PageForgot = () => {
  const [alias, setAlias] = createSignal("test")
  const [question1, setQuestion1] = createSignal("")
  const [question2, setQuestion2] = createSignal("")
  const [hint, setHint] = createSignal("")
  const [status, setStatus] = createSignal("Idle")

  function inputAlias(e){setAlias(e.target.value)}
  function inputQuestion1(e){setQuestion1(e.target.value)}
  function inputQuestion2(e){setQuestion2(e.target.value)}
  function inputHint(e){setHint(e.target.value)}

  const navigate = useNavigate()
  const gun = useGun();

  async function btnGetHint(){
    setStatus('Checking...')
    let _alias = alias();
    _alias = await gun.get('~@'+_alias).then(); // reused variable
    if(!_alias){//check user exist if not return false.
      //modalmessage('Not Found Alias!');
      setStatus('Not Found Alias!')
      return;
    }
    let publickey;
    for(let obj in _alias){//object 
      //console.log(obj);
      publickey = obj;//property name for public key
    }
    //console.log(SEA.opt.pub)
    publickey = SEA.opt.pub(publickey);//check and convert to key or null?
    //console.log(publickey);
    let q1 = (question1() || '').trim(); //get id question1 input
    let q2 = (question2() || '').trim(); //get id question2 input

    if((!q1)||(!q2)){
      //console.log('Q Empty!');
      //modalmessage('"Question (1 || 2) Empty!"');
      setStatus("Question 1|2 Empty!")
      return;
    }

    let to = gun.user(publickey);//get user alias graph
    let _hint = await to.get('hint').then();//get encrypt hint key graph
    let dec = await Gun.SEA.work(q1,q2);//get fquestion1 and fquestion2 string to mix key
    _hint = await Gun.SEA.decrypt(_hint,dec);//get hint and key decrypt message
    //console.log("hint:",_hint)
    if(_hint){//check if hint is string or null
      setHint(_hint)
    }else{
      //modalmessage("Fail Decrypt!");
      setStatus("Fail Decrypt!")
    }
  }

  function btnCancel(){
    //dispose();
    //dispose = render(PageLogin, document.getElementById('app'));
    navigate("/",{ replace: true })
  }

  return (<div>
    <label>Forgot</label>
    <table>
      <tbody>
        <tr>
          <td>
            <label>Alias:</label>
          </td>
          <td>
            <input value={alias()} onInput={inputAlias}/>
          </td>
        </tr>
        <tr>
          <td>
            <label>Question #1:</label>
          </td><td>
            <input value={question1()} onInput={inputQuestion1}/>
          </td>
        </tr>
        <tr>
          <td>
            <label>Question #2:</label>
          </td><td>
            <input value={question2()} onInput={inputQuestion2}/>
          </td>
        </tr>
        <tr>
          <td>
            <label>Hint: </label>
          </td><td>
            <input value={hint()} onInput={inputHint}/>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <label> Status: {status()} </label>
            <span style="float:right;">
              <button onClick={btnGetHint}>Hint</button>
              <button onClick={btnCancel}>Cancel</button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>);
}

export default PageForgot;