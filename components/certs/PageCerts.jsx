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

import { GunContext } from '../auth/GunProvider';
import CertInbox from './CertInbox';
import CertMessages from './CertMessages';
import CertNotifications from './CertNotifications';

const PageCerts = () => {
  return (<>
  <div>
    <p>
      Welcome to certificates for user who own their node graph can set up basic or strict permission for other users for access this node graph.
    </p>
    <p>
      Please note it required user to set up permissions. One reason is denied spams and bots.
    </p>
  </div>
  <div>
    <CertInbox/>
    <CertMessages/>
    <CertNotifications/>
  </div>
  </>)
}

export default PageCerts;