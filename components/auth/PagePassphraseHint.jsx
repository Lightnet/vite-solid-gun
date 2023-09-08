

import { 
  createSignal
, onMount
, useContext
} from 'solid-js';

import { useGun } from "./GunProvider";

const PagePassphraseHint = () =>{

  //console.log(rootGun())
  const gun = useGun();

  const [question1, setQuestion1] = createSignal("")
  const [question2, setQuestion2] = createSignal("")
  const [hint, setHint] = createSignal("")
  const [status, setStatus] = createSignal("Idle")

  function inputQuestion1(e){setQuestion1(e.target.value)}
  function inputQuestion2(e){setQuestion2(e.target.value)}
  function inputHint(e){setHint(e.target.value)}

  async function applyHint(){
    setStatus("Checking...")
    console.log("hint...")
    console.log(question1())
    console.log(question2())
    console.log(hint())
    let user = gun.user();
    let q1 = question1(); //get input id question 1
    let q2 = question2(); //get input id question 2
    let _hint = hint(); //get input id hint

    let sec = await Gun.SEA.secret(user.is.epub, user._.sea);//mix key to decrypt
    let enc_q1 = await Gun.SEA.encrypt(q1, sec);//encrypt q1
    user.get('forgot').get('q1').put(enc_q1);//set hash q1 to user data store
    let enc_q2 = await Gun.SEA.encrypt(q2, sec);//encrypt q1
    user.get('forgot').get('q2').put(enc_q2); //set hash q2 to user data store
    sec = await Gun.SEA.work(q1,q2);//encrypt key
    let enc = await Gun.SEA.encrypt(_hint, sec);//encrypt hint

    user.get('hint').put(enc,ack=>{//set hash hint
      //console.log(ack);
      if(ack.err){
        console.log("Error!");
        //modalmessage(ack.err);
        setStatus("Fail! Error!")
        return;
      }
      if(ack.ok){
        console.log('Hint Apply!');
        setStatus("Hint Apply!")
        //modalmessage('Hint Apply!');
      }
    });
  }

  async function getHint(){
    setStatus("Checking...")
    let user = gun.user();
    let q1,q2,_hint;
    let sec = await Gun.SEA.secret(user.is.epub, user._.sea);// mix key to decrypt
    q1 = await user.get('forgot').get('q1').then();
    q1 = await Gun.SEA.decrypt(q1, sec);//decrypt question1

    q2 = await user.get('forgot').get('q2').then();
    q2 = await Gun.SEA.decrypt(q2, sec);//decrypt question2
    setQuestion1(q1)
    setQuestion2(q2)

    sec = await Gun.SEA.work(q1,q2);//encrypt key
    _hint = await user.get('hint').then();//get encrypt hint 
    _hint = await Gun.SEA.decrypt(_hint, sec);//decrypt hint
    setHint(_hint)
    setStatus("Done!")
  }

  return (<div>
  <div>
    <label> Passphrase Set Hint </label>
    <table>
      <tbody>
        <tr>
          <td>
            <label>Question 1:</label>
          </td>
          <td>
            <input value={question1()} onInput={inputQuestion1}/>
          </td>
        </tr>
        <tr>
          <td>
            <label>Question 2:</label>
          </td>
          <td>
            <input value={question2()} onInput={inputQuestion2}/>
          </td>
        </tr>
        <tr>
          <td>
            <label>Hint:</label>
          </td>
          <td>
            <input value={hint()} onInput={inputHint}/>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <label> Status: {status()} </label>
            <span style="float:right;">
              <button onClick={applyHint}> Apply </button>
              <button onClick={getHint}> Get </button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>);
}

export default PagePassphraseHint;