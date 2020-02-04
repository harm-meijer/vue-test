/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-spread */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
const fs = require("fs").promises;

const newPath = (tag, line) =>
  tag !== "i18n"
    ? line
        .replace('"../', '"../../')
        .replace('"./', '"../')
        .replace("'../", "'../../")
        .replace("'./", "'../")
        .replace(".vue'", "/index.vue'")
    : line;
const tagAsFileName = (tag, line) => {
  const names = {
    template: "template.html",
    style: "style.css",
    i18n: "i18n.txt",
    script: "script.js"
  };
  if (tag === "style") {
    if (line.includes('lang="scss"')) {
      return "style.scss";
    }
    return "style.css";
  }
  return names[tag];
};
const withSrc = (tag, line) =>
  line.replace(
    `<${tag}`,
    `<${tag} src="./${tagAsFileName(tag, line)}"`
  );
const recurSet = lines => (result, tag) => {
  const recur = (result, lines, tag, index) => {
    const line = lines[index];
    if (index >= lines.length) {
      return result;
    }
    if (line.includes(`</${tag}`)) {
      return result;
    }
    if (line.includes(`<${tag}`)) {
      result[tag] = {
        tag: withSrc(tag, line),
        content: ""
      };
      return recur(result, lines, tag, index + 1);
    }
    if (result[tag]) {
      result[tag].content += `${newPath(tag, line)}\n`;
    }
    return recur(result, lines, tag, index + 1);
  };
  return recur(result, lines, tag, 0);
};
const files = [
  "./src/App.vue",
  "./src/components/HelloWorld.vue"
];
const tags = ["template", "style", "i18n", "script"];
const makeIndex = files =>
  Object.entries(files)
    .map(([key, value]) => `${value.tag}</${key}>`)
    .join("\n");
const createFiles = (path, files) =>
  Object.entries(files)
    .map(([key, value]) => [key, value.content, value.tag])
    .map(([key, content, tag]) =>
      fs.writeFile(
        `${path}/${tagAsFileName(key, tag)}`,
        content
      )
    );
Promise.all(
  files
    // .slice(0, 10)
    .map(f => fs.readFile(f, "utf8").then(c => [f, c]))
)
  .then(files =>
    files.map(([path, content]) => {
      const lines = content
        .split("\n")
        .filter(l => l.trim().length);
      const newContent = tags.reduce(recurSet(lines), {});
      return [path.replace(/\.vue$/, ""), newContent];
    })
  )
  .then(result =>
    Promise.all(
      result.map(([path, files]) =>
        fs
          .stat(path)
          .catch(() => fs.mkdir(path))
          .then(() =>
            Promise.all(
              createFiles(path, files).concat([
                fs.writeFile(
                  `${path}/index.vue`,
                  makeIndex(files)
                ),
                fs.unlink(`${path}.vue`)
              ])
            )
          )
      )
    )
  );
