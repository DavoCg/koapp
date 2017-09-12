const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const {error} = require('../helpers');

const ASSETS_FOLDER = 'ar-files';
const OPTIMIZE_SCRIPT = './ar-scripts/copySceneKitAssets';
const ZIP_SCRIPT = 'zip -r';

const createDirAndGetDestination = (name) => {
    fs.mkdirSync(`${__dirname}/../../${ASSETS_FOLDER}/${name}.scnassets`);
    return `./${ASSETS_FOLDER}/${name}.scnassets/${name}.dae`;
};

const process = (name, done) => {
    const folder = `${ASSETS_FOLDER}/${name}.scnassets/`;
    const optimized = `${ASSETS_FOLDER}/${name}-optimized.scnassets`;

    const optimize = `${OPTIMIZE_SCRIPT} ${folder} -o ${optimized}`;
    const zip = `${ZIP_SCRIPT} ${optimized}.zip ${optimized}`;

    return exec(optimize, (err) => {
        if(err) return done(err);
        return exec(zip, (err) => {
            if(err) return done(err);
            return done(null, `${name}-optimized.scnassets.zip`)
        });
    });
};

const upload = async (ctx) => {
    const file = ctx.request.body.files.data;
    const name = Date.now();
    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(createDirAndGetDestination(name));
    reader.pipe(stream);
    reader.on('end', () => process(name, (err, file) => {
        if(err) return error(400, 'Probleme');
        return ctx.body = {file};
    }));
};

module.exports = {upload};