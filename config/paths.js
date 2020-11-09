const path = require('path')
const glob = require('glob')
const rootPath = process.cwd()

function getEntries(globPath) {
    const files = glob.sync(globPath),
    entries = {};
    files.forEach(function(filepath) {
        const split = filepath.split('/')
        const name = split[split.length - 2]
        entries[name] = './' + filepath
    })
    return entries
}

const entries = getEntries('src/pages/**/index.tsx')

function getIndexPaths() {
    const indexPaths = [];
    Object.keys(entries).forEach((name) => {
      const indexjsx = path.resolve(rootPath, `src/pages/${name}/index`)
      indexPaths.push({
        name,
        path: indexjsx
      });
    })
    return indexPaths;
}
  
  const indexJsPath = getIndexPaths()

module.exports = {
    publicPath: '',
    htmlPath: path.resolve(rootPath, 'public/index.html'),
    mHtmlPath: path.resolve(rootPath, 'public/m.html'),
    srcPath:  path.resolve(rootPath, 'src'),
    buildPath:  path.resolve(rootPath, 'build'),
    indexJsPath,
    entries,
    mockPath: path.resolve(rootPath, 'src/mock/index.js')
}