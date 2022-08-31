import { 
  createSignal
, onMount
, useContext
} from 'solid-js';

import { GunContext } from "./GunProvider";

const PageChangePassphrase = () =>{

  const [rootGun] = useContext(GunContext)
  //console.log(rootGun())
  const gun = rootGun();

  const [oldPassphrase, setOldPassphrase] = createSignal("12345678")
  const [newPassphrase, setNewPassphrase] = createSignal("12345678")
  const [status, setSatus] = createSignal("Idle")

  function inputOldPassphrase(e){setOldPassphrase(e.target.value)}
  function inputNewPassphrase(e){setNewPassphrase(e.target.value)}

  function btnChange(event){
    setSatus("Check...");
    let user = gun.user();
    user.auth(user.is.alias, oldPassphrase(), (ack) => {//user auth call
      //console.log(ack);
      const check = ack.err || "Saved!";//check if there error else saved message.
      //console.log(check);
      //setSatus(_status);
      setSatus(check);
      //modalmessage(status);
    },{change: newPassphrase()});//set config to change password
  }

  function btnCancel(event){
    dispose();
    dispose = render(PageAccount, document.getElementById('app'));
  }

  return (<div>
  <div>
    <label> Change Passphrase </label>
    <table>
      <tbody>
        <tr>
          <td>
            <label>Old Passphrase:</label>
          </td>
          <td>
            <input value={oldPassphrase()} onInput={inputOldPassphrase}/>
          </td>
        </tr>
        <tr>
          <td>
            <label>New Passphrase:</label>
          </td>
          <td>
            <input value={newPassphrase()} onInput={inputNewPassphrase}/>
          </td>
        </tr>
        <tr>
          <td colspan="2">
          <label>Status: {status()}</label>
            <span style="float:right;">
              <button onClick={btnChange}>Apply</button>
              <button onClick={btnCancel}>Cancel</button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
  </div>);
}

export default PageChangePassphrase;