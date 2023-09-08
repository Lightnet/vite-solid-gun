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
, onMount
} from 'solid-js';

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