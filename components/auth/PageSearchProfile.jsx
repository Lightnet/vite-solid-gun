
import { 
  createSignal
, onMount
, useContext
} from 'solid-js';

import { GunContext } from "./GunProvider";


const PageSearchProfile = () =>{

  const [rootGun] = useContext(GunContext)
  //console.log(rootGun())
  const gun = rootGun();
  
  const [publicKey, setPublicKey] = createSignal("")
  const [status, setStatus] = createSignal("Idle")

  const [name, setName] = createSignal("")
  const [alias, setAlias] = createSignal("")
  const [born, setBorn] = createSignal("")
  const [education , setEducation ] = createSignal("")
  const [skills, setSkills] = createSignal("")

  async function searchPublicKey(event){
    setPublicKey(event.target.value)
    setStatus("checking...")
    let pub = (publicKey() || "").trim()
    if(!pub){
      console.log("EMPTY!")
      setStatus("EMPTY!")
			return;
		}
    var find = gun.user(pub);
    //console.log(find);
    let who = await find.then() || {};//get alias information
    //console.log(who);
    if(!who.alias){//check for alias from gun user
      setStatus('No Alias!')
			return;
		}else{
      //console.log(who)
      setName(who.alias)
      setStatus('Found! ' + who.alias)
		}
    find.get('profile').map().once((data, key)=>{
      //console.log(data)
      //console.log(key)
      if(key=="alias"){
        setAlias(String(data))
      }
      if(key=="born"){
        setBorn(String(data))
      }
      if(key=="education"){
        setEducation(String(data))
      }
      if(key=="skills"){
        setSkills(String(data))
      }
    });

  }
  
  //${PageNavMenu()}
  return (<div>
    <label>Search Public Key:</label> <input value={publicKey()} onInput={searchPublicKey}/> <label>Status: {status()}</label> <br/>
    <label>Name: </label> <input value={name()} /><br/>
    <label>Alias: </label> <input value={alias()} /><br/>
    <label>Born:</label> <input value={born()} /><br/>
    <label>Education</label> <input value={education()} />  <br/>
    <label>Skills</label> <input value={skills()} />  <br/>
  </div>);
}

export default PageSearchProfile;