# sqlbackup
A super simple and lightweight SQL Database Backup System.  
This auto backsup your database every 24 Hours or more. Can't go less.

## Requirements
- NodeJS v12+  
- Understanding

## Installation
- Download the Code. (can use git)  
- Go to the main directory of the code using your terminal/cmd. (Where index.js is)  
- Run `node .` or `node index`

## How to run this 24-7?
This will close when you close your terminal. I good way to keep this up without closing is using `pm2`.  
To install `pm2`, simply do the following.  

- `npm install pm2 -g` or `yarn add pm2 -g`  

**How would i run it?**  
- `pm2 run index.js`  
(Make sure you're in the main directory of the code. Where index.js is)  

That would make it run 24/7 even when closing the terminal/cmd.

## Config
Defaults:  
```json
{
  "mysql": {
    "username": "username",
    "password": "password",
    "host": "localhost",
    "port": 3306,
    "databases": [
      "rathena4444_rag",
      "rathena4444_log"
    ]
  },

  "backupInterval": 86400
}
```

`config.mysql` is where all your mysql data would be.  
`*.username` is what your mysql username is.  
`*.password` is the password for your mysql username.  
`*.host` is where the mysql server is hosted. `127.0.0.1` or `localhost` for the same host or vps.  
`*.databases[]` an array of the name of the databases to backup.  

`config.backupInterval` is the amount of seconds to wait before creating a new backup. Default is `86400` (1 day).  
Take note that you can't go less than `86400`.

## How does this work?
I simply used `child_process` to create a new process and would run `mysqldump` to export Mysql databases.  
After exporting, the code closes the process of the ran command and then would wait for the interval to be finished, then repeat the process.
