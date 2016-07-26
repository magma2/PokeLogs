var jsonfile = require('jsonfile');

var file = './pokemons.json'
var pokemons = jsonfile.readFileSync(file)
var fs =  require('fs');


for (pokemon in pokemons) {

    fs.rename('./pokemon/' + pokemons[pokemon].number + '.png', './pokemons/' + pokemons[pokemon].name + '.png',function(err, file) {
        if ( err ) console.log('ERROR: ' + err);

        console.log(file);
    });




}




