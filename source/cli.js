#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import parseIFFY from './index.js'

if (process.argv[2]) {
  const filePath = path.join(process.cwd(), process.argv[2])
  let content = fs.readFileSync(filePath, 'utf8')

  console.log(JSON.stringify(parseIFFY(content)))
} else {
  console.error('You did not provide a file')
}
