const exec = require("child_process").exec;
const npmStart = exec("npm start");

npmStart.stdout.on("data", (data) => {
  console.log(data);
});

npmStart.stderr.on("data", (data) => {
  console.error(data);
});

npmStart.on("error", (err) => {
  console.error(err)
});

npmStart.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
