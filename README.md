# vite-solid-gun

# Packages:
 - vite
 - gun
 - solid-js

# Information:
  This is to test out the websocket gun.

# server:

```
node server.js
```
This works.

```
npm run dev
```
Will not work correctly there conflict reload and websocket. Note there are two server running.



# Note:
 - config is not stable but workable as gun own server due to vite js server reload and ws error.
 - re-edit plugin may break reloading and bugs. Not code correctly.
 - plugin reload still have process running bug.
