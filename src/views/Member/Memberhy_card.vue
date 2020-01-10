<template>
    <div class="layoutR-main">
        <!--右边iframe-->
        <!--<publicIframe/>-->

        <!--<children></children>-->

        <son></son>
    </div>
</template>

<script>
    import son from '@/components/Tinymce/son'
    import children from '@/components/Tinymce/children'
    export default {
        name: "Memberhy_card",
        components:{
            son,
            children
        },

        data() {
            return {}
        },
        methods: {},
        created() {

        },
    }
</script>

<style lang="scss" scoped>

</style>