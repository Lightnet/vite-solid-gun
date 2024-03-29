import {
  createSignal
, createEffect
, onMount
, onCleanup
, createMemo
//, on
} from "solid-js";

//import { GunContext } from "./GunProvider";
import { Link } from "@solidjs/router";

import PageAliasInfo from "./AliasInfo";
import PageProfile from "./PageProfile"
import PageSearchProfile from "./PageSearchProfile";

export default function Account(){

  return (<>
    <Link href="/changepassphrase">Change Passphrase</Link><span> | </span>
    <Link href="/passphrasehint">Passphrase Hint</Link><span> | </span>
    <Link href="/certs">Certificates</Link><span> | </span>
    <Link href="/contacts">Contacts</Link><span> | </span>
    <Link href="/notifications">Notifications</Link><span> | </span>
    <br/>
    <PageAliasInfo /><br/>
    <PageProfile/><br/>
    <PageSearchProfile/>
    </>)
}