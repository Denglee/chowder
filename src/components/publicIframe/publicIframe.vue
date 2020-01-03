<template>
    <div class="animated fadeIn">
        <iframe :src="localSrc" frameborder="0" id="iframe"></iframe>
    </div>
</template>

<script>
    export default {
        name: "publicIframe",
        data() {
            return{
                localUrl:this.GLOBAL.localUrl,
                localSrc:"",
            }
        },
        methods: {},
        created() {
            /*console.log(this.$route);
            console.log(this.localUrl);
            console.log(this.$route.fullPath);*/
            let nextUrl = this.localUrl + '/Admin' + this.$route.fullPath;
            console.log(nextUrl);
            this.localSrc = nextUrl;
        },
    }
</script>

<style scoped lang="scss">
    #iframe{
        width: 100%;
        /*height: 100%;*/
        display: block;
        height: calc( 100vh - 106px );
        padding-right: 10px;
        box-sizing: border-box;
        /*margin-top: 108px;*/
    }
</style>