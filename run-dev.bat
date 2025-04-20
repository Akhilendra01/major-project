@echo off
start wt -w 0 new-tab -d "./ui" powershell -NoExit npm run dev ^
    ; new-tab -d "./auth" powershell -NoExit npx nodemon ^
    ; new-tab -d "./content-service" powershell -NoExit npx nodemon