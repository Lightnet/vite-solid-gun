https://stackoverflow.com/questions/14952052/convert-blob-url-to-normal-url

https://javascript.info/blob

https://www.geeksforgeeks.org/html-dom-createobjecturl-method/
```js
var blob = new Blob(["Hello, world!"], { type: 'text/plain' });
var blobUrl = URL.createObjectURL(blob);
```

https://stackoverflow.com/questions/939326/execute-javascript-code-stored-as-a-string

```js
var theInstructions = "alert('Hello World'); var x = 100";

var F=new Function (theInstructions);

//return (F());
//return F();
F();
```