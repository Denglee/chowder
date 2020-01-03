<template>
    <div>
        
    </div>
</template>

<script>
    export default {
        name: "redirect",
        data() {
            return {}
        },
        methods: {},
        created() {

        },
        beforeCreate() {
            console.log(this.$route);
            const nextPath = this.$route.query.nextPath;
            this.$router.replace({ path: nextPath});
            console.log(nextPath);
        },
        render: function(h) {
            return h() // 避免警告信息
        }
    }
</script>

<style scoped lang="scss">

</style>