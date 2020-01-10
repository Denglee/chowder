<template>
    <div class="layoutR-main">
        <!--<publicIframe/>-->

        parent：下面是我的子组件:
        <!--我们在 Parent.vue 组件里面引用子组件 Childs.vue 然后传入 userName 参数给子组件,Childs 在props里面接收父组件传传来的数据。-->
        <children :userName='ParentName'  :content='content' @getNum='getMsg'></children>

        <div style="padding: 20px;margin-top:40px;">
            parent：这是我的子组件传给我的值：{{num}}
        </div>

    </div>
</template>

<script>
    import children from '@/components/Tinymce/children'

    export default {
        name: "Receptionentrance",

        components: {
            children,
        },
        data() {
            return {
                ParentName:"iam dad",  //传给儿子的

                content:'er',
                num:''
            };
        },
        methods:  {
            getMsg(num){
                this.num = num;
            }
        },
        created() {

        },


    }
</script>

<style scoped>

</style>