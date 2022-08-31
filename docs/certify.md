https://gun.eco/docs/SEA.certify


```js
localStorage.clear();

gun = GUN();

async function getData(){
// Generate a new key pair
const room = await SEA.pair() 

// Issue the wildcard certificate for all to write personal items to the 'profile'
const cert = await SEA.certify( 
  '*',  // everybody is allowed to write
  { '*':'profile', '+': '*' }, // to the path that starts with 'profile' and along with the key has the user's pub in it
  room, //authority
  null, //no need for callback here
  { expiry: Date.now() + (60*60*24*1000) } // Let's set a one day expiration period
) 

console.log(cert)

// Authenticate with the room pair
gun.user().auth(room, () => { 

  // Put the certificate into the room graph for ease of later use
  gun.user()
    .get('certs')
    .get('profile')
    .put(cert) 
})

console.log(gun.user())


// Generate the user pair
const user = await SEA.pair() 

//Log in with the user keypair
gun.user().auth(user, async () => {

  // Load the 'profile' certificate from the room
  const certificate = await gun.user(room.pub).get('certs').get('profile').then() 

  // Use the certificate to write to the personal route at the room profile
  gun
    .user(room.pub)
    .get('profile')
    .get(user.pub)
    .put({name: 'Alice', city: 'New York'}, null, {opt: { cert: certificate }} )
  
  let data = await gun
    .user(room.pub)
    .get('profile')
    .get(user.pub).then()
  console.log(data)

  // This profile may be easily deleted (tombstoned) by the user later
  gun
    .user(room.pub)
    .get('profile')
    .get(user.pub)
    .put(null, null, {opt: {cert: certificate }} )

})
}

getData();
```