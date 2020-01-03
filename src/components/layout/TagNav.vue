<template>
    <div class="tag-nav">

                <scroll-bar ref="scrollBar">
<!--                {{openedPageList}}-->

    <!--    <router-link ref="tag" class="tag-nav-item" :class="isActive(item) ? 'cur' : ''"
                     v-for="(item, index) in openedPageList"
                     :to="item.path" :key="index">
            {{item.title}}
            <i class="el-icon-circle-close"  @click.prevent.stop="closeTheTag(item, index)"></i>
        </router-link>-->

                    <div ref="tag" class="tag-nav-item" :class="isActive(item) ? 'cur' : ''"
                                 v-for="(item, index) in openedPageList" :to="item.path" :key="index"
                            :Path="item.path" @click="reloadRouter($event)">
                        {{item.title}}
                        <i class="el-icon-circle-close"  @click.prevent.stop="closeTheTag(item, index)"></i>
                    </div>

        <!--        <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">-->
        <!--            <router-link :to="item.path" class="tags-li-title">-->
        <!--                {{item.title}}-->
        <!--            </router-link>-->
        <!--            <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>-->
        <!--        </li>-->
                </scroll-bar>
    </div>
</template>

<script>
    import ScrollBar from './ScrollBar'
    import {mapState,mapActions, mapGetters} from 'vuex'
    export default {
        data(){
            return {
                defaultPage: '/index'
            }
        },
        computed: {

            ...mapState('StoreActiveNav',[ //用mapGetters来获取collection.js里面的getters
                'openedPageList',
            ]),

            tagNavList(){
                return this.$store.state.StoreActiveNav.openedPageList
            }
        },
        mounted(){
            // 首次加载时将默认页面加入缓存
            this.addTagNav();


        },
        created() {
            // this.$router.go(0);
        },
        watch: {
            $route(){
                this.addTagNav();
                // this.scrollToCurTag()
            }
        },
        methods: {

            /*路由跳转 刷新*/
            reloadRouter(e) {
                let path = e.target.getAttribute('Path');
                console.log(path);
                this.$router.replace({
                    path: "/redirect",
                    query: {
                        nextPath: path
                    }
                });
            },

            // reloadRouter(e){
            //     let Path = e.target.getAttribute('Path');
            //     console.log(Path);
            //     this.$router.push({path:Path});
            //     this.$forceUpdate();
            // },

            addTagNav(){
                // 如果需要缓存则必须使用组件自身的name，而不是router的name
                this.$store.commit("StoreActiveNav/addTagNav", {
                    name: this.$router.name,
                    path: this.$route.path,
                    title: this.$route.meta.title
                })
            },
            isActive(item){
                return item.path === this.$route.path
            },
            closeTheTag(item, index){
                // 当关闭当前页面的Tag时，则自动加载前一个Tag所属的页面
                // 如果没有前一个Tag，则加载默认页面

                console.log(item);
                console.log(index);
                console.log(this.tagNavList);

                this.$store.commit("StoreActiveNav/removeTagNav", item)
                if(this.$route.path == item.path){
                    if(index){
                        this.$router.push(this.tagNavList[index-1].path)
                    } else {
                        this.$router.push(this.defaultPage);
                        if(this.$route.path == "/index"){
                            this.addTagNav()
                        }
                    }
                }
            },
            scrollToCurTag(){
                this.$nextTick(() =>{
                    for (let item of this.$refs.tag) {
                        if (item.to === this.$route.path) {
                            this.$refs.scrollBar.scrollToCurTag(item.$el)
                            break
                        }
                    }
                })
            }
        },
        components: {ScrollBar}
    }
</script>
