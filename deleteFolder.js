const fs = require('fs-extra');

async function deleteFilesInFolder(folderPath) {
  try {
    await fs.emptyDir(folderPath);
    console.log(`Deleted all files in ${folderPath}`);
  } catch (err) {
    console.error(`Error deleting files: ${err}`);
  }
}

module.exports={deleteFilesInFolder};
