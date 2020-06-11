const copydir = require('copy-dir')
const rootPath = __dirname;

const src = {
    views: `${rootPath}/src/services/site/views`,
    public: `${rootPath}/src/services/site/public`,
}

const build = {
    views: `${rootPath}/build/services/site/views`,
    public: `${rootPath}/build/services/site/public`
}

config = {
    utimes: true,  // keep add time and modify time
    mode: true,    // keep file mode
}

const errDealer = (err) => err ? console.log(err) : console.log('done!')

copydir(src.views, build.views, config, errDealer)
copydir(src.public, build.public, config, errDealer)

