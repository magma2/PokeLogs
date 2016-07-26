<style scoped>

</style>

<template>




<div class="container">
    <button @click="openDialog">Open File</button>

    <v-client-table :data="getPokemons" :columns="columns" :options="options"></v-client-table>

</div>
</template>

<script>


    import {parseLogFiles} from '../vuex/pokemons/actions'
    import {getPokemons} from '../vuex/pokemons/getters'
    //  import {parseLogFiles} from '../vuex/files/actions'
    export default {
        name: 'default',
        data() {
            return {
                columns: ['time', 'name','cp'],
               sortable: ['cp']
            }
        },

        components: {},

        vuex: {
            actions: {
                parseLogFiles
            },
            getters: {
                getPokemons
            }
        },

        methods: {
            openDialog() {
                const logFiles = this.$electron.remote.dialog.showOpenDialog({properties: ['openFile','openDirectory']})

                console.log(logFiles);

                this.parseLogFiles(logFiles);
            }
        }

    }
</script>
