# vite-solid-gun

# Packages:
 - vite
 - gun
 - solid-js
 - express

# Information:
  Work in progress testing for gun peer to app test. Create server script that support gun peer to peer connect test. Default to vite server dev have conflict reload and ws network error loop. Due to the websocket or incorrect coding still can't find way to set up simple vite server with gun socket.

  But it still used the default vite.config.js file for middleware access for hot reload.

# Certs:
  Gun has build in test for certs access on node sea graph. That is under testing. Note due to clean up there may be leak or incorrect coding.

# server:

```
npm install 
```
Install packages.

```
npm run server
```

# Demo Link:
 - https://codedamn.com/playground/mZ9rSGrcmKHeKu3iqersk

# Note:
 - config is not stable but workable as gun own server due to vite js server reload and ws error.
 - re-edit plugin may break reloading and bugs. Not code correctly.
 - plugin reload still have process running bug.
 - clean up or unload ui for chat message tend to leak unfinish unloading when change the ui.
