/*
  Project Name: vite-solid-gun
  License: MIT
  Created by: Lightnet
*/

// https://github.com/solidjs/solid-router
// https://www.solidjs.com/docs/latest/api#creatememo
//localStorage.clear();

import "./styles.css";

import { MetaProvider } from 'solid-meta';
import { createApp } from 'solid-utils';
import { 
  Router
//, useRoutes
//, Link
//, useParams
//, useLocation
} from '@solidjs/router';
import App from "./components/App.jsx";

const dispose = createApp(App).use(MetaProvider).use(Router).mount('#app');

if (import.meta.hot) { //< module.hot
  //console.log(import.meta.hot)
  import.meta.hot.accept() //< module.hot.accept()
  import.meta.hot.dispose(dispose) //< module.hot.dispose(dispose)
  console.log("Hot Reload...")
}
/*

*/