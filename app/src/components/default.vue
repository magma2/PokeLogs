<style lang="scss" rel="stylesheet/scss" scoped>

    nav {
        border-bottom : 1px solid #f1f1f1;
        }

    nav ul {
        display         : flex;
        list-style      : none;
        justify-content : center;
        padding         : 10px 0;
        li {
            margin-left : 20px;
            &:first-child {
                margin-left : 0;
                }
            }
        }

    .own-modal {
        background      : white;
        display         : flex;
        justify-content : center;
        // position:fixed;

        padding         : 50px;
        }

    .backdrop {
        justify-content : center;
        display         : flex;
        align-items     : center;
        position        : fixed;
        top             : 0;
        right           : 0;
        height          : 100vh;
        width           : 100%;
        z-index         : 999;
        background      : rgba(0, 0, 0, 0.6);
        }

    .form-group {
        label {
            text-transform : uppercase;
            }
        display     : flex;
        align-items : flex-end;
        button {
            margin-left : 10px;
            }
        }
</style>

<template>
    <nav>
        <ul>
            <li>
                <button class="btn btn-success" @click="openDialog">Open Log Folder</button>
            </li>
            <li>
                <button :disabled="!path" class="btn btn-info" @click="reload">Reload</button>
            </li>
            <li>
                <div class="checkbox">
                    <label><input type="checkbox" v-model="autoReload" @click="autoReloadChange">Autoreload</label>
                </div>
            </li>
        </ul>


    </nav>

    <div class="container">
        <div v-show="showModal" class="backdrop">
            <div class="own-modal" v-show="showModal">
                <div class="form-group">
                    <div class="input">
                        <label for="time">Set Reload time in Minutes</label>
                        <input type="text" v-model="autoReloadTime" class="form-control">
                    </div>
                    <button @click="setAutoReloadTime" class="btn btn-success"> Set Time</button>
                </div>
            </div>
        </div>


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
                interValId    : '',
                autoReloadTime: 0,
                showModal     : false,
                autoReload    : false,
                columns       : ['time', 'name', 'cp','iv'],
                path          : false,
                options       : {
                    sortable   : ['time', 'cp','iv'],
                    sortBy     : ['time'],

                }
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
        ready() {

            var autoReload = localStorage.getItem('autoReloadTime');

            if (autoReload) {
                this.autoReloadTime = autoReload;
                this.autoReload = true;

                this.startReload();

            }

            var currentPath = localStorage.getItem("logPath");

            if (currentPath) {
                this.path = currentPath;
                this.parseLogFiles(currentPath)
            }

        },

        methods: {
            openDialog(reload = false) {
                var logFiles = this.$electron.remote.dialog.showOpenDialog({properties: ['openFile', 'openDirectory']})

                if (logFiles) {

                    if (localStorage.getItem("logPath") === null) {

                        localStorage.setItem('logPath', logFiles);
                    }

                    this.path = logFiles[0];
                    this.parseLogFiles(logFiles[0]);
                }
            },
            reload()
            {
                this.parseLogFiles(this.path);
            },

            autoReloadChange() {

                if (!this.autoReload) {

                    if (localStorage.getItem('reloadTime') === null) {
                        this.showModal = true;
                    }

                } else {
                    //  this.autoReload = false
                    clearInterval(this.interValId);
                    localStorage.removeItem('autoReloadTime');
                }

            },
            setAutoReloadTime() {

                localStorage.setItem('autoReloadTime', this.autoReloadTime)
                this.startReload();
                this.showModal = false;
            },
            startReload() {

                this.interValId = setInterval(() => {
                    console.log('Reload');
                    this.parseLogFiles(this.path);
                }, parseInt(this.autoReloadTime) * 60000)

            },
        },

    }
</script>
