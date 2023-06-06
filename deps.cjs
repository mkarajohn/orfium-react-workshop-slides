const dependencyTree = require('dependency-tree');
const fs = require('fs');

const config = {
  filename: './src/main.tsx',
  directory: './src',
  tsConfig: './tsconfig.json', // optional
  // nodeModulesConfig: {
  //   entry: 'module',
  // }, // optional
  filter: (path) => {
    return (
      path.indexOf('.ts') !== -1 ||
      path.indexOf('.js') !== -1 ||
      path.indexOf('.tsx') !== -1 ||
      path.indexOf('.jsx') !== -1
    );
  }, // optional
  nonExistent: [], // optional
  noTypeDefinitions: false, // optional
};

const tree = dependencyTree(config);

const list = dependencyTree.toList(config);

fs.writeFile('deps.json', Buffer.from(JSON.stringify(list)), () => {});
