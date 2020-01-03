<template>
    <div class="layoutR-main">
        <!--右边iframe-->
        <!--<publicIframe/>-->

        <iframe :src="localSrc" frameborder="0" id="iframe" style=""></iframe>

    </div>
</template>

<script>
    export default {
        name: "Courseindex", //团课
        data() {
            return {
                localUrl:this.GLOBAL.localUrl,
                localSrc:"",
            }
        },
        methods: {},
        created() {
            let nextUrl = this.localUrl + '/Admin' + this.$route.fullPath+'?course_type=1';
            console.log(nextUrl);
            this.localSrc = nextUrl;
        },
    }
</script>

<style lang="scss" scoped>
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