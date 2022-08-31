
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

const PageSignUp = () => {
  const [alias, setAlias] = createSignal("test")
  const [passphrase, setPassphrase] = createSignal("12345678")
  const navigate = useNavigate()

  const [rootGun] = useContext(GunContext)
  console.log(rootGun())
  let gun = rootGun();

  function inputAlias(e){setAlias(e.target.value)}
  function inputPassphrase(e){setPassphrase(e.target.value)}

  function btnRegister(){
    let user = gun.user();
    user.create(alias(), passphrase(),(ack)=>{//create user and password
      if(ack.err){
        console.log(ack.err);//if user exist or error
        return;
      }
      console.log(ack);//pass if created
      //modalmessage("Created " + $('#alias').val() + "!");
      navigate("/",{ replace: true })
    });
  }

  function btnCancel(){
    //dispose()
    //dispose = render(PageLogin, document.getElementById('app'));
    navigate("/",{ replace: true })
  }

  return <div>
    <label>Register</label>
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
            <label>Passphrase:</label>
          </td><td>
            <input value={passphrase()} onInput={inputPassphrase}/>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button onClick={btnRegister}>Register</button>
            <button onClick={btnCancel}>Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>;
}

export default PageSignUp;