class GunServer {
  // Static properties shared by all instances
  static gun;
  static server;

  static getInstance() {
    return this.gun;
  }

  static getServer() {    
    return this.server;
  }

  static setServer(_server) {
    if(_server){
      console.log("init set server ")
    }
    this.server = _server;
    //console.log(this.server)
  }
}

export default GunServer;