import { 
  createSignal
, onMount
, useContext
} from 'solid-js';

import { GunContext } from "./GunProvider";

const PageProfile = () =>{

  const {rootGun} = useContext(GunContext)
  //console.log(rootGun())
  const gun = rootGun();
  
  const [alias, setAlias] = createSignal("")
  const [born, setBorn] = createSignal("")
  const [education, setEducation] = createSignal("")
  const [skills, setSkills] = createSignal("")

  function getProfileParam(_name){
    return new Promise((resolve,reject)=>{
      let user = gun.user();
      if(!user.is){ return reject(String(null))} //check for user auth
      user.get('profile').get(_name).once((data)=>{
        //console.log(data);
        resolve(String(data))
      })
    })
  }
  
  function inputProfileParam(event){
    //console.log("typing...")
    //console.log(event.target.name)
    if(event.target.name){
      if (event.keyCode == 13) {//enter key
        //console.log("Enter...")
        let user = gun.user();
        user.get('profile').get(event.target.name).put(String(event.target.value),ack=>{
          if(ack.err){
            console.log(`Profile save ${event.target.name} error!`)
            return;
          }
					console.log(ack);
          console.log(`Profile save ${event.target.name}!`)
				});
        return false;
      }
    }
  }

  onMount(async ()=>{
    setAlias(await getProfileParam('alias'))
    setBorn(await getProfileParam('born'))
    setEducation(await getProfileParam('education'))
    setSkills(await getProfileParam('skills'))
  })

  return (<table>
    <tbody>
      <tr>
        <td>
          <label>Alias:</label>      
        </td>
        <td>
          <input name="alias" value={alias()} onKeyUp={inputProfileParam} /><br/>     
        </td>
      </tr>
      <tr>
        <td>
        <label>Born:</label> 
        </td>
        <td>
        <input name="born" value={born()} onKeyUp={inputProfileParam} /><br/>        
        </td>
      </tr>
      <tr>
        <td>
        <label>Education:</label> 
        </td>
        <td>
        <input name="education" value={education()} onKeyUp={inputProfileParam} /><br/>
        </td>
      </tr>
      <tr>
        <td>
          <label>Skills:</label>
        </td>
        <td>
          <input name="skills" value={skills()} onKeyUp={inputProfileParam} /><br/>
        </td>
      </tr>
    </tbody>
  </table>);
}

export default PageProfile;