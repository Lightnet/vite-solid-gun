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
, useContext
} from 'solid-js';

import { Link, useLocation } from '@solidjs/router';
import ToggleTheme from './theme/ToggleTheme';
import { GunContext } from './auth/GunProvider';

const IndexMenus = () => {

  const location = useLocation();
  const pathname = createMemo(() => location.pathname);

  const [rootGun] = useContext(GunContext);
  let gun = rootGun();

  //for menu display
  let whitelist = [
    "/",
    "/about",
    "/login",
    "/signup",
    "/signout",
    "/websocketgun"
  ];

  const displayMenu = createMemo(()=>{
    //console.log("FIND:",whitelist.find((item)=>{
      //return item === pathname()      
    //}))
    if(
      whitelist.find((item)=>{return item === pathname()})
    ){
      //console.log("FOUND")
      let user = gun.user();
      if(user?.is){
        return ( <div>
          <Link class="btnLink" href="/">Home</Link><span> | </span>
          <Link class="btnLink" href="/about">About</Link><span> | </span>
          <Link class="btnLink" href="/signout">Signout</Link><span> | </span>
          <ToggleTheme />
          </div>)
      }else{
        return ( <div>
          <Link class="btnLink" href="/">Home</Link><span> | </span>
          <Link class="btnLink" href="/about">About</Link><span> | </span>
          <Link class="btnLink" href="/login">Login</Link><span> | </span>
          <Link class="btnLink" href="/signup">Sign Up</Link><span> | </span>
          <ToggleTheme />
          </div>)
      }
      
    }else{
      //console.log("NOT FOUND")
      return (<>
      </>)
    }
  })

  return (<>
  {displayMenu}
  </>)

}

export default IndexMenus;