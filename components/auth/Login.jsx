

import {
  createSignal
, createEffect
, onMount
, onCleanup
, createMemo
, useContext
//, on
} from "solid-js";

import { GunContext } from "./GunProvider";
import { useNavigate } from "@solidjs/router";

const PageLogin = () => {

  const [alias, setAlias] = createSignal("test")
  const [passphrase, setPassphrase] = createSignal("12345678")
  const [pair, setPair] = createSignal(null)
  const [textPair, setTextPair] = createSignal("")
  const [isPair, setIsPair] = createSignal(false)

  function inputAlias(e){setAlias(e.target.value)}
  function inputPassphrase(e){setPassphrase(e.target.value)}

  const navigate = useNavigate()
  const {rootGun, setUserAlias, setUserAliasPub, setIsLogin} = useContext(GunContext)
  //console.log(rootGun())
  const gun = rootGun();

  function btnLogin(){
    //console.log(alias())
    //console.log(passphrase())

    let user = gun.user();
    if(isPair()){
      user.auth(pair(),(ack)=>{//user login pair
        if(ack.err){
          console.log(ack.err)
          return;
        }
        //setUserAliasPub()
        setIsLogin(true)
        navigate("/",{ replace: true })
      });
    }else{
      user.auth(alias(), passphrase(),(ack)=>{//user login username and password
        if(ack.err){
          console.log(ack.err)
          return;
        }
        console.log(ack)
        //ack.root
        setUserAlias(ack.root.user.is.alias)
        setUserAliasPub(ack.sea.pub)
        setIsLogin(true)
        //console.log("PASS")
        navigate("/",{ replace: true })
      });
    }
  }

  function btnSignUp(){
    //dispose()
    //dispose = render(PageSignUp, document.getElementById('app'));
    navigate("/signup",{ replace: true })
  }

  function btnForgot(){
    //dispose()
    //dispose = render(PageForgot, document.getElementById('app'));
    navigate("/forgot",{ replace: true })
  }

  async function btnGeneratePair(){
    let _pair= await Gun.SEA.pair();
    console.log(_pair)
    setPair(_pair)
    setTextPair(JSON.stringify(_pair))
  }

  const displayType = createMemo(() => {
    if(isPair()){
      return <>
        <tr>
          <td>
            <button onClick={btnGeneratePair}>Generate Pair</button>
          </td>
        </tr>
        <tr>
        <td>
          <label>User Key Pair:</label>
        </td>
        <td>
          <textarea value={textPair()} onInput={inputAlias} placeholder="JSON String"/>
        </td>
      </tr>
    </>;
    }else{
      return <><tr>
      <td>
        <label>Alias:</label>
      </td>
      <td>
        <input value={alias()} onInput={inputAlias}/>
      </td>
    </tr>
    <tr>
      <td>
        <label>Passphrase:</label>
      </td><td>
        <input value={passphrase()} onInput={inputPassphrase}/>
      </td>
    </tr>
    </>
    }
    
  });

  const isCheckPair =  createMemo(() => isPair());

  function togglePair(){
    setIsPair(state=>!state)
  }

  return (<div>
    
    
    <table>
      <tbody>
        <tr>
          <td colspan="2" style="background:gray;">
            <center><label>Login</label></center>
          </td>
        </tr>
        <tr>
          <td>
            <label> SEA Pair <input type="checkbox" checked={isCheckPair()} onClick={togglePair} /> </label>
          </td>
        </tr>
        {displayType}
        <tr>
          <td colspan="2">
            <button style="width:100%;" onClick={btnLogin}>Login</button>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button style="width:100%;" onClick={btnSignUp}>Sign Up</button>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button style="width:100%;" onClick={btnForgot}>Forgot</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>);
}

export default PageLogin;