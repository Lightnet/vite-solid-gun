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
, onMount
} from 'solid-js';

//import { GunContext } from '../auth/GunProvider';
//import RemoveContact from './RemoveContact';
import AddContact from './AddContact';

import ContactList from './ContactList';

function PageContacts(){

  return (<>
    <AddContact />
    <ContactList />
  </>)
  //<RemoveContact />
}

export default PageContacts