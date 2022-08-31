
https://gun.eco/docs/SEA.certify

# Notes:
 Need correct logic format.


# sea docs:

Some examples of policies:
```js
{"*": "notifications", "+": "*"} // Path must start with "notifications", then Path or Key must contain Certificant's Pub (it's just (path||key).indexOf(pub)!=-1)

{"#": {"*": "inbox"}} // Path must start with "inbox". "get('inbox').get('Alice').get('secret').put('abc', null, cert)" and "get('inbox').get('Bob').get('sensitive').put('something', null, cert)" ARE ALL OK.

{"#": {"*": "project"}, ".": {"*": "Bob"}, {"+": "*"}} // Path must start with "project" and Key must start with "Bob", then Path or Key must contain Certificant's Pub.

"inbox/Bob" // Path must equal "inbox/Bob", it is a LEX exact match {"=":"inbox/Bob"}

["inbox", {"*":"projects", "+": "*"}, {"*":"employees"}] // an Array of rules. If any matches, continue.
```

```js
// Issue the wildcard certificate for all to write personal items to the 'profile'
const cert = await SEA.certify( 
  '*',  // everybody is allowed to write
  { '*':'profile', '+': '*' }, // to the path that starts with 'profile' and along with the key has the user's pub in it
  room, //authority
  null, //no need for callback here
  { expiry: Date.now() + (60*60*24*1000) } // Let's set a one day expiration period
) 
```






