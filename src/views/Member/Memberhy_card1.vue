<template>
    <div class="layoutR-main">
        <!--右边iframe-->
        <publicIframe/>
    </div>
</template>

<script>
    export default {
        name: "Memberhy_card1",
        data() {
            return {
                localUrl:this.GLOBAL.localUrl,
                localSrc:"",
            }
        },
        methods: {},
        created() {

        },
        created() {
            let nextUrl = this.localUrl + '/Admin' + this.$route.fullPath+'?course_type=2';
            console.log(nextUrl);
            this.localSrc = nextUrl;
        },
    }
</script>

<style lang="scss" scoped>

</style>