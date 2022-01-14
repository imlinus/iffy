import parseIFFY from './../source/index.js'

console.log(parseIFFY(`
# This is a IFFY file

[owner]
name: ImLinus
mail: mail@imlinus.com

[database]
server: 192.168.1.1
ports: [2000, 3000, 4000]
connections: 5000
enabled: true
`.trim()))
