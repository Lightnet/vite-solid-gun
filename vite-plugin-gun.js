/*
  Project Name: vite-solid-gun
  License: MIT
  Created by: Lightnet
*/

// https://vitejs.dev/guide/api-plugin.html#client-server-communication
// https://vitejs.dev/guide/api-javascript.html
// https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
/*
  plugin for gun set up that is partly working.

  Bug on loop on reload on HMR
gun = Gun({
  web: server.httpServer 
})
needs work...

Had to create another server proxy for fixed.
*/

import Gun from "gun";
import http from "http";

var gun;
//let gunserver;

export default function pluginGun() {
  let gunserver;
  console.log(gunserver)
  return {
    name: 'vite-plugin-gun',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // custom handle request...
        Gun.serve(req, res, next);
        //if (Gun.serve(req, res)) {//get gun.js ex. <script src="/gun.js">
          //return next();
        //}
      })

      //console.log(server)
      console.log("init gun?")

      if(!gunserver){
        const _server = http.createServer(function(request, response) {
          if (Gun.serve(request, response)) {//get gun.js ex. <script src="/gun.js">
            return;
          }
        })

        gunserver=_server;
        process.on('SIGINT', function() {
          console.log('SIGINT')
          //_server.close();
          _server.close(function () { console.log('Server closed!'); });
        });

        process.on('SIGTERM', function() {
          console.log('SIGTERM')
          _server.close();
        });

        process.on('SIGQUIT', function() {
          console.log('SIGQUIT')
          _server.close();
        });
        process.on('exit', function() {
          console.log('exit')
          //console.log(_server)
          _server.close(function () { console.log('Server closed!'); });
          console.log(gun)
          gun.close();
          gun=null;
        });
        process.on('SIGUSR1', function() {
          console.log('SIGUSR1')
          _server.close();
        });

        const PORT = 8000;
        _server.listen(PORT, err => {
          if (err) throw err;
          //console.log(app);
          console.log(`> Running on http://localhost:`+PORT);
        });
        _server.on('close', function() {
          console.log(' Stopping ...');
        });

        gun = Gun({
          //file: "data",
          //web:app.server //server
          //web: server.middlewares
          //web: server.middlewares.listen
          //web: server.middlewares.listeners
          //web: server.middlewares.rawListeners
          //web: server.httpServer //work but reload loops
          //web: server.listen() // fail
          //web: server // fail
          //web: server.ws
          web: _server
        });

        //console.log(gun);

        //gun.get('mark').on((data, key) => {
          //console.log("realtime updates:", data);
        //});

        gun.on("hi", peer => {
          //peer connect
          //console.log('connect peer to',peer);
          console.log("peer connect!");
        });
        gun.on("bye", peer => {
          // peer disconnect
          //console.log('disconnected from', peer);
          console.log("disconnected from peer!");
        });
      }

    }
  }
}