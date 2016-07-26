import * as types from '../mutation-types';

/*[19:42:04] (INFO) Voliere Zürisee in (109m)
 [19:42:13] (PKMN) (CatchSuccess) | Pidgey Lvl 15 (234/291 CP) (27,00% perfect) | Chance: 38,66% | 96m dist | with a PokeBall.
 */
var fs = require('fs');
export const parseLogFiles = ({dispatch}, path) => {

    /* fs.readFile(logFiles[0], 'utf8', function (err, data) {
     console.log(data);

     })*/
    var pokemons = [];
    var logFiles = []
    const readSingleFile = (path) => {


        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', function (err, data) {
                if (err) return reject(err);
                let lines = data.toString().split('\n')
                for (let line in lines) {
                    if (typeof lines[line] === 'string' && lines[line].includes('CatchSuccess')) {
                        //let name = lines[line].split('|');
                        let pattern = /\[(.+)\].+\)(.+) Lvl: (\d+) CP: \((\d+)\/(\d+)\) IV: (\d+,\d+%)/gmi;
                        var match = pattern.exec(lines[line]);
                        pokemons.push({time: match[1], name: match[2], level: match[3], cp: `${parseInt(match[5])}`, iv: match[6]})
                    }
                }
                console.log('resolved');
                resolve(pokemons);

            })
        })
    }

    /*Promise.all((logFiles.map => readSingleFile ())).then*/

    fs.readdir(path, function(err, files) {
        if (err) return;

        Promise.all(files.map((o) => readSingleFile(path + '\\' + o))).then((o) => {
            console.log(o);
            dispatch(types.PARSE_LOG_FILE, o)

        }).catch((err) => {

        })



    });

/*
function readFiles(logFiles) {
    Promise.all(logFiles.map((o) => readSingleFile(o))).then((o) => {
        console.log(o);
        dispatch(types.PARSE_LOG_FILE, o)

    }).catch((err) => {

    })
}*/
}




