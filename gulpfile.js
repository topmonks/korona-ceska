const fs = require("fs");
const { src, dest, lastRun } = require("gulp");
const cloudinaryUpload = require("gulp-cloudinary-upload");
const changed = require("gulp-changed");
const posthtml = require("gulp-posthtml");
const inject = require("posthtml-inject");
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

const screenSizes = [
  ["only screen and (max-height: 667px)", 162],
  ["only screen and (min-height: 668px) and (max-height: 735px)", 222],
  ["only screen and (min-height: 736px) and (max-height: 811px)", 262],
  ["only screen and (min-height: 812px) and (max-height: 1023px)", 280],
  ["only screen and (min-height: 1024px)", 420]
];
const dprs = [1, 1.5, 2];
const linkElement = ({ href, media }) => ({
  tag: "link",
  attrs: {
    rel: "prefetch",
    as: "image",
    href,
    media
  }
})

function* linksGenerator(images) {
  for (let href of images) {
    for (let dpr of dprs) {
      for (let [size, height] of screenSizes) {
        yield linkElement({
          href: href.replace("upload", `upload/f_auto,dpr_${dpr},h_${height},q_auto`),
          media: `${size} and (min-resolution: ${dpr}dppx)`
        });
      }
    }
  }
}

function* imagesGenerator(manifest) {
  for (let key in manifest) {
    yield manifest[key]["secure_url"];
  }
}

function generatePreloads() {
  const manifest = require(paths.manifest);
  const cloudinaryImages = Array.from(linksGenerator(imagesGenerator(manifest)));
  return src("./build/index.html")
    .pipe(posthtml([
      inject({
        EOL: "",
        INTENT: "",
        elements: {
          prefetch: cloudinaryImages
        }
      })
    ]))
    .pipe(dest("./build"));
}

module.exports.default = cloudinaryTask;
module.exports.html = generatePreloads;
