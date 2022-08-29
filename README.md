# vite-solid-gun

# Packages:
 - vite
 - gun
 - solid-js
 - express

# Information:
  This is to test out the websocket gun. Create server script than the default to vite server. Due to the websocket or in correct coding still can't find way to set up simple vite server with gun socket.

  So creeate the server script to work with the gun websocket. But it still used the default vite.config.js file for middleware access for hot reload.

# server:

```
npm install 
```
Install packages.

```
npm run server
```
This works.

```
npm run dev
```
Will not work correctly there conflict reload and websocket. Remove the custom gun plugin.

# Demo Link:
 - https://codedamn.com/playground/mZ9rSGrcmKHeKu3iqersk

# Note:
 - config is not stable but workable as gun own server due to vite js server reload and ws error.
 - re-edit plugin may break reloading and bugs. Not code correctly.
 - plugin reload still have process running bug.
