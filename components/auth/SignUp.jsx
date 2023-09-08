
import {
  createSignal
, createEffect
, onMount
, onCleanup
, createMemo
//, on
} from "solid-js";

import { useGun } from "./GunProvider";
import { useNavigate } from "@solidjs/router";

const PageSignUp = () => {
  const [alias, setAlias] = createSignal("test")
  const [passphrase, setPassphrase] = createSignal("12345678")
  const navigate = useNavigate()

  console.log(rootGun())
  let gun = useGun();

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
    
    <table>
      <tbody>
        <tr>
          <td colspan="2" style="background:gray;">
            <center>
            <label>Register</label>
            </center>
          </td>
        </tr>
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
            <button style="width:100%;" onClick={btnRegister}>Register</button>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button style="width:100%;" onClick={btnCancel}>Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>;
}

export default PageSignUp;