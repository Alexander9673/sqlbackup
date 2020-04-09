const { existsSync, mkdirSync } = require("fs");
const child_process = require("child_process");

const config = require("./config");

if (config.backupInterval < 86400)
  throw new Error("Backup interval can't be less than 86400 seconds or 1 day.");

checkFolder(`${__dirname}/sql`)

for (let i = 0; i < config.mysql.databases.length; i++) {

  let Time = new Date().toISOString().slice(0, 10);

  checkFolder(`${__dirname}/sql/${Time}`);

  exportDatabase(child_process.execSync,
    config.mysql.databases[i],
    `sql/${Time}/${config.mysql.databases[i]}`)
  
  console.log(`First Backup of database ${config.mysql.databases[i]} now available in the folder
"sql/${Time}/${config.mysql.databases[i]}.sql"
Next backup would be available in 24 hours.
`)
  
  setInterval(() => {
    Time = new Date().toISOString().slice(0, 10);

    checkFolder(`${__dirname}/sql/${Time}`);

    if (!existsSync(`${__dirname}/sql/${Time}`))
      mkdirSync(`${__dirname}/sql/${Time}`);

    exportDatabase(child_process.execSync,
      config.mysql.databases[i],
      `sql/${Time}/${config.mysql.databases[i]}`)
    
    console.log(`Backup for database ${config.mysql.databases[i]} for date ${Time} is now available
in the folder "sql/${Time}/${config.mysql.databases[i]}.sql"`)
  }, config.backupInterval * 1000);
}

function checkFolder(folder) {
  if (!existsSync(folder))
    mkdirSync(folder);
  
  return undefined;
}

function exportDatabase(exec, database, output) {
  return exec(`mysqldump \
  -u root \
  --password=${config.mysql.password} \
  -h ${config.mysql.host} \
  -P ${config.mysql.port} \
  --databases ${database} > ${output}.sql`);
};
