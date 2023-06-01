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
import DisplayAliasPub from '../auth/DisplayAliasPub';

export default function BottomBar(){

  return (<>
    <div style="height:20px;width:100%;position:fixed;float:left;bottom:0px;">
      <DisplayAliasPub />
    </div>
  </>)
}
//<label>Hello Bar</label>