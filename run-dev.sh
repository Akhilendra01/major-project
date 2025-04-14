#!/bin/bash
cmd.exe /c 'wt -w 0 nt -d .\ui cmd /k "npm run dev" ; nt -d .\auth cmd /k "npx nodemon" ; nt -d .\content-service cmd /k "npx nodemon"'
