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
                        //\[(.+)\].+\)(.+) Lvl: (\d+) CP: \((\d+)\/(\d+)\) IV: (\d+,\d+%)
                        const pattern = /\[(.+)\] \(.+\) ?(?: |\| +)(\w+) \w+ ?(?:: |\s+)(\d+)\s?(?:CP: \(|\()(\d+)\/(\d+)(?:\)| CP\)) (?:IV: |\()(\d+(?:.|,)\d+)% ?(?:\| |perfect\) \| )\w+: ?(\d+(?:.|,)\d+)% \| (\d+)\w \w*\w \| \w* \w (\w+). \| ?(?:Candies: |Family Candies: )(\d+)/gmi;
                        var match = pattern.exec(lines[line]);
                        const timePattern = /NecroBot-(\d+\-\d+\-\d+)/gmi;

                        const pathTime = timePattern.exec(path)[1];
                        if (match) {
                            var cp = parseInt(match[5])
                            var level = parseInt(match[3])
                            var name = match[2].trim()
                            var time = `${pathTime} - ${match[1]}`;
                            pokemons.push({time, name, level, cp, iv: match[6]})
                        } else {
                            console.log(match);
                        }
                    }
                }
                resolve(pokemons);

            })
        })
    }

    fs.readdir(path, function (err, files) {
        if (err) return;

        Promise.all(files.map((o) => readSingleFile(path + '\\' + o))).then((o) => {
            dispatch(types.PARSE_LOG_FILE, o)
        }).catch((err) => {
        })
    });
}




