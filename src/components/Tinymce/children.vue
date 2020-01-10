<template>
    <div>
        <div>
            <!--https://segmentfault.com/a/1190000018008914-->
            <span style="color: red;">我是子</span>
            child:这是父组件给我传的数据——{{userName}}
        </div>

        <hr>

        <!--子组件向父组件传递数据，不能像上面一样实时的传递数据，必须通过 事件 触发-->
        <div style="padding: 20px;margin-top:40px;">
            child:这是父组件给我传的数据——{{content}} <br />
            <button @click="sendMsgtoParent" style="padding: 10px;">点击我可以向父组件传递参数哦</button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "children",
        props:{
            userName:{  //接受爸爸的
                type: String,
                default: ''
            },

            content:{
                type: String,
                default: ''
            }
        },
        data() {
            return {
                num: 0,
            }
        },
        methods: {
            sendMsgtoParent(){
                console.log(this.num);
                this.$emit('getNum',this.num ++ );
                /*监听父组件的 @getNum*/
            }
        },
        created() {

        },
    }
</script>

<style scoped lang="scss">

</style>