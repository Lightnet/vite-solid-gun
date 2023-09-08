/*
  Project Name: vite-solid-gun
  License: MIT
  Created by: Lightnet
*/

import { Link } from "@solidjs/router";

export default function About() {
  return (<>
  <Link class="btnLink" href="/"> Home </Link><span> | </span>
  <h1>Hello About! Solid! Gun!</h1>;
  </>) 
}