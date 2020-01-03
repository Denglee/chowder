<template>
  <div id="app">
    <!--<router-view v-if="isRouterAlive" :key="key"/>-->

      <router-view v-if="isRouterAlive"></router-view>

  </div>
</template>
<script>
  export default {
    name:"App",
    /*声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载*/
    provide(){
      return{
        reLoad:this.reLoad,
      }
    },
    data(){
      return {
        isRouterAlive:true,
      }
    },
    methods:{
      reLoad(){
        this.isRouterAlive = false;
        this.$nextTick(()=>{
          this.isRouterAlive = true;
        })
      },
    },

    computed: {
      /*key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
      }*/
    },

    /*activated: function() {
      this.getCase();
    }*/
  }

  /*
  * App 页面申明
  * 其他页面使用：
  *inject:['reLoad'], //注入依赖 App 中的reLoad方法
  * methods:{
  * shuain:{
  * this.reLoad();  //直接调用就好
  * }
  * }
  * */
</script>
<style lang="scss">

</style>
