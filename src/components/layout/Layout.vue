<template>
    <el-row type="flex" class="layout-box row-bg" justify="space-between">
        <!--左侧侧边导航-->
        <el-col :span="2" class="layout-left">
            <LeftNav></LeftNav>
        </el-col>

        <!--右侧主体内容-->
        <el-col :span="22" class="layout-right">
            <header class="layoutR-header">
                <!-- 头部 -->
                <header-top/>

                <!--左侧点击路由添加显示在头部导航-->
                <tag-nav></tag-nav>
            </header>

            <!--右边主体内容-->
            <router-view></router-view>

        </el-col>
    </el-row>
</template>

<script>
    // import HeaderBar from './HeaderBar'
    import HeaderTop from './HeaderTop'
    import LeftNav from './LeftNav'
    import TagNav from './TagNav'

    import {mapActions, mapGetters} from 'vuex'

    export default {
        data(){
            return{
                localUrl:this.GLOBAL.localUrl,
                dialogFormVisible:'false',
                activeIndex: '1',
                activeIndex2: '1',

            }
        },
        computed: {

        },
        methods:{
            getGlobal(){
                // console.log(this.localUrl);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            changePass(){

            }
        },
        created() {
          this.getGlobal();
        },
        components:{
            // HeaderBar,
            HeaderTop,
            LeftNav,
            TagNav
        },

    }
</script>
<style lang="scss">
    @import "~@/assets/css/LayoutNav.scss";
</style>
