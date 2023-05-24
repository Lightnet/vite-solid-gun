# vite-solid-gun

# Packages:
 - vite
 - gun
 - solid-js
 - express

# Information (Work in progress):
  Http Gun.js and SEA.js for peer to peer message test.

  By using the encrypt and decrypt from gun.js and sea.js in text, json and API.
  
  Create server script that support gun peer to peer connect test.

## Notes:
 * Default to vite server dev have conflict reload and ws network error loop. Due to the websocket or incorrect coding still can't find way to set up simple vite server with gun socket.

# graph, node, tree, sea:
  Tree node graph on Gun.js and Sea.js design and idea.

  When working with SEA auth account they have their own tree node or island that they own by SEA pair key. The owner has right to make changes but other users have no right make changes. Two party must have right permissions to edit and write data to other island or nodes. Example inbox messages for public to user pairs. Or view user profile data that can be empty or not. But required standard informtion or correct format to visiable. There is site or open src gernanal format for public message for board cast information.

  Note there are different way to handle. It like create user, room, board and other things but required generate SEA pairs to develop the node graph.

# Certificate (work in progress):
  Certificate is simalar to https for check for valid signature handshake, url address and base on expire date. But instead same but use graph path node and expire date. As for the blacklist or ban user does not work due to graph database works. Simple reason they can edit and other reason deep tree can break branches. Since it peer to peer database. Anyone can change the data. But in SEA API there are strict in node graph tree.
  
  Root node pub and pair auth user is hard to loop tree from branches changes. One reason is handshake checks for main user who auth their node tree branch has the write ane edit data. So Certificate was create to handle other user permission to write on the auth branch example message node. To authrize is to create cert and expire day to grant all permission for message node branch. It can be filter by certificate options. They can send simple message as long they add their own pub key to valid register SEA pair.

  Note Certificate can't last forever in case of abuse or imposter hijacking Certificate.

  It simalar to block chain links that required checks verify the current users own that node to wrtie and edit permissions.

  Gun js has certificate access on node SEA API certificate graph. That is under testing.

## Notes:
 * Due to clean up there may be leak or incorrect coding.

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
