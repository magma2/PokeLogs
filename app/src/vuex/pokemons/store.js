import * as types from '../mutation-types'

const state = {
    filePath: '',
    pokemons: [{name: ''}],

}

const mutations = {

    [types.PARSE_LOG_FILE ](state, logFiles) {
        state.pokemons = logFiles[0]
    }

}

export default {
    state,
    mutations
}