const fs = require('fs');
const path = require('path');
const exec = require('exec-then');

const ASSETS_FOLDER = 'ar-files';
const OPTIMIZE_SCRIPT = './ar-scripts/copySceneKitAssets';
const ZIP_SCRIPT = 'zip -r';

const getDestination = (name) => {
    return `./${ASSETS_FOLDER}/${name}.scnassets/${name}.dae`;
};

const createDirectory = (name) => {
    return fs.mkdirSync(path.join(__dirname, '..', '..', `${ASSETS_FOLDER}/${name}.scnassets`));
};

const process = async (name) => {
    console.log('name :', name);
    
    const folder = `${ASSETS_FOLDER}/${name}.scnassets/`;
    const optimized = `${ASSETS_FOLDER}/${name}-optimized.scnassets`;
    const final = `${name}-optimized.scnassets.zip`;
    const optimize = `${OPTIMIZE_SCRIPT} ${folder} -o ${optimized}`;
    const zip = `${ZIP_SCRIPT} ${optimized}.zip ${optimized}`;

    await exec(optimize).then((a, b, c) => console.log(a, b, c));
    await exec(zip);

    return Promise.resolve(final);
};

const upload = async (ctx) => {
    const file = ctx.request.body.files.data;
    const name = Date.now();
    createDirectory(name);

    console.log('file :', file.path);

    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(getDestination(name));
    reader.pipe(stream);
    reader.on('end', () => process(name).then(file => ctx.body = {file}));
};

module.exports = {upload};