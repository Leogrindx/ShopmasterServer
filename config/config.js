import {readFileSync} from 'fs'
const read = path => {
    const rawdata = readFileSync(path);
    return JSON.parse(rawdata);
}

export default read


//import read from '../config/config.js'
//const path = read('./config/path.json')