const fs = require("fs");
const { src, dest, lastRun } = require("gulp");
const cloudinaryUpload = require("gulp-cloudinary-upload");
const changed = require("gulp-changed");
const path = require("path");

const paths = {
  src: path.resolve(__dirname, "src"),
  dest: path.resolve(__dirname, "src"),
  manifest: path.resolve(__dirname, "src", "cloudinary.json"),
  cloudinaryDest: "korona-ceska.cz"
};

function readManifest(path) {
  return fs.promises
    .readFile(path, "utf-8")
    .then(x => JSON.parse(x))
    .catch(() => null);
}

function getRelativePath(filePath) {
  return path.relative(
    path.resolve("./src"),
    path.resolve(__dirname, path.dirname(filePath))
  );
}

function getRelativeFilePath(filePath) {
  return path.relative(
    path.resolve("./src"),
    path.resolve(__dirname, filePath)
  );
}

const cloudinaryTask = () =>
  src("./src/illustrations/*.png", {
    since: lastRun(cloudinaryTask)
  })
    .pipe(
      changed("./build", {
        async hasChanged(stream, sourceFile) {
          const manifest = await readManifest(paths.manifest);
          const imagePath = getRelativeFilePath(sourceFile.path);
          if (!(manifest && manifest[imagePath])) {
            stream.push(sourceFile);
          }
        }
      })
    )
    .pipe(
      cloudinaryUpload({
        folderResolver(filePath) {
          const relativePath = getRelativePath(filePath);
          return path.join(paths.cloudinaryDest, relativePath);
        },
        keyResolver(filePath) {
          return path.relative(paths.src, path.resolve(__dirname, filePath));
        }
      })
    )
    .pipe(
      cloudinaryUpload.manifest({
        path: paths.manifest,
        merge: true
      })
    )
    .pipe(dest(paths.dest));

module.exports.default = cloudinaryTask;
