<template>
    <div class="layoutR-main">
        <!--右边iframe-->
        <!--<publicIframe/>-->

        <!--<div>潜在会员</div>-->
        <iframe :src="localSrc" frameborder="0" id="iframe"></iframe>
    </div>
</template>

<script>
    export default {
        name: "Memberindex",
        data() {
            return {
                localUrl:this.GLOBAL.localUrl,
                localSrc:"",
            }
        },
        methods: {},
        created() {
            /*console.log(this.$route);
            console.log(this.localUrl);
            console.log(this.$route.fullPath);*/

            let userId=this.$route.params.user_id;
            console.log(userId);
            if(!userId){
                userId = '';
            }
            let iframeUrl = this.localUrl + '/Admin' + this.$route.fullPath+'/user_id/'+userId+'.html';
            console.log(iframeUrl);

            this.localSrc = iframeUrl;

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