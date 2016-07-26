import Vue from 'vue'
import Vuex from 'vuex'
import pokemon from './pokemons/store'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        pokemon,
    },
    strict : true
})
