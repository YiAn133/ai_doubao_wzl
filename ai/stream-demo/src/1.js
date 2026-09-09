const encoder = new TextEncoder();
const decoder = new TextDecoder();
const name = [ 229, 141, 160, 229, 177, 177 ]

const byte = decoder.decode(new Uint8Array(name))
console.log(byte);
