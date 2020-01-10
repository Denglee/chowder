<template>
    <div>
        {{name}}
        <div @click="changes">改变22</div>
    </div>
</template>

<script>

    import {mapState,mapActions, mapGetters} from 'vuex'
    export default {
        name: "son",
        data() {
            return {

            }
        },

        computed:{
            /*获取值*/
            ...mapGetters({
                name:'StoreB/getsName'
            }),
        },
        methods:{
            /*改变值*/
            ...mapActions({
                changeName: "StoreB/actName",
            }),

            changes(){
                this.changeName('liden222222222222g');
            }
        },

        created() {

        },
    }
</script>

<style scoped lang="scss">

</style>