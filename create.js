import fs from "fs";
import fse from "fs-extra";
import path from "path";
import * as url from "url";
import _yargs from "yargs";
import { hideBin } from "yargs/helpers";
const yargs = _yargs(hideBin(process.argv));

// Alternative for ES module
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const argv = await yargs
  .option("projectName", { type: "string", require: true })
  .option("template", { type: "string", require: true }).argv;

const DESTINATION_FOLDER = process.cwd(); // Folder from which the script is called - first create destination folder

// Helpers
const getAllFiles = async function (dirPath, arrayOfFiles = []) {
  let files = await fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = await getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  }

  return arrayOfFiles;
};

// Run
const main = async ({ projectName, template }) => {
  // Copy template files to new folder
  var sourceDir = path.join(__dirname, `./templates/${template}`);
  var destinationDir = `${DESTINATION_FOLDER}/${projectName}`;
  // // Check and create folder
  // // If folder already exists abort script not to overwrite files
  if (fs.existsSync(destinationDir)) {
    throw "Error - Project already exists!";
  }
  // If all good proceed with creating folder
  await fse.copy(sourceDir, destinationDir);

  // Rename files
  const allFiles = await getAllFiles(destinationDir);
  allFiles.forEach((file) => {
    const renamedFile = file.replace("PLACEHOLDER_PROJECT_FOLDER", projectName);

    fs.renameSync(file, renamedFile, function (err) {
      if (err) console.log("ERROR: " + err);
    });
  });

  // Go over files and replace placeholders
  const renamedFiles = await getAllFiles(destinationDir);
  renamedFiles.forEach((file, index) => {
    //if (index > 0) return
    fs.readFile(file, "utf8", function (err, data) {
      if (err) {
        return console.log(err);
      }

      // Replace placeholders
      let result = data;

      const toReplace = [
        { slug: "PLACEHOLDER_PROJECT_FOLDER", value: projectName },
      ];

      toReplace.forEach((el) => {
        result = result.split("PLACEHOLDER_PROJECT_FOLDER").join(el.value);
      });

      fs.writeFile(file, result, "utf8", function (err) {
        if (err) return console.log(err);
      });
    });
  });
  console.log("All done");
};

console.log("Provided params");
console.log("---------------");
console.log("Project name - ", argv.projectName);
console.log("Template - ", argv.template);

main(argv).catch((e) => console.log(e));
