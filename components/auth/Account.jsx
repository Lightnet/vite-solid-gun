import {
  createSignal
, createEffect
, onMount
, onCleanup
, createMemo
, useContext
//, on
} from "solid-js";

//import { GunContext } from "./GunProvider";
import { Link, useNavigate } from "@solidjs/router";

import PageAliasInfo from "./AliasInfo";
import PageProfile from "./PageProfile"
import PageSearchProfile from "./PageSearchProfile";

export default function Account(){

  return (<>
    <Link href="/changepassphrase">Change Passphrase</Link><span> | </span>
    <Link href="/passphrasehint">Passphrase Hint</Link>
    <br/>
    <PageAliasInfo /><br/>
    <PageProfile/><br/>
    <PageSearchProfile/>
    </>)
}