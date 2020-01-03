import Vue from 'vue'
import Vuex, {mapActions, mapGetters} from 'vuex'
// import vuexModules from './modules'
//
// import state from './state'
// import mutations from './mutations'
// import actions from './actions'


import StoreTagNav from '@/store/StoreTagNav'
import StoreActiveNav from '@/store/StoreActiveNav'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    StoreTagNav,
    StoreActiveNav,
  }
})

// import Vue from 'vue'
// import Vuex from 'vuex'
//
// Vue.use(Vuex)
//
// export default new Vuex.Store({
//   //声明全局维护的状态
//   state: {
//     stateName:"",  //默认值
//     stateNum:100,
//     userInfo:null,
//   },
//
//   //实时监听state值的变化(最新状态)
//   getters: {
//
//     // 监听 获取state 中的 stateName值
//     gettersName(state){
//       return  state.stateName;
//     },
//
//     gettersNum(state){
//       return  state.stateNum;
//     },
//     // gettersName = state => state.stateName
//
//     userInfo(state){
//       // 如果userInfo为空，则去获取sessionStorage中的userInfo
//       if(!state.userInfo){
//         state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
//       }
//       return state.userInfo
//     },
//   },
//
//   //执行同步操作改变state  提交 mutations是更改Vuex状态的唯一合法方法
//   mutations: {
//
//     // 点击更换 state 中的 stateName值
//     mutationsName(state,name){
//       state.stateName=name;
//     },
//
//     mutationsName2:(state,name)=>{
//       state.stateName=name;
//     },
//     // mutationsName2(state,name){
//     //   state.stateName=name;
//     // },
//     mutationsNum:state => {
//       state.stateNum++;
//     },
//
//     // mutationsNum(state){
//     //   state.stateNum++;
//     // },
//
//     mutationsNum2(state){
//       state.stateNum--;
//     },
//
//     mLogin:(state,data) => {
//       state.userInfo = data;
//       sessionStorage.setItem('userInfo',JSON.stringify(data));
//     },
//     mLogout:(state) => {
//       state.userInfo = null;
//       sessionStorage.removeItem('userInfo');
//     }
//
//   },
//
//   // 进行异步操作 给action注册事件处理函数。当这个函数被触发时候，将状态提交到mutations中处理
     //注册 action 类似于 vue的methods
//   actions: {
//     // dispatch：含有异步操作，
//     // 存储:this.$store.dispatch('setTargetUser',friend);
//     // 取值: this.$store.getters.targetUser;
//     // commit：同步操作，
//     // 存储:this.$store.commit('setTargetUser',friend);
//     // 取值:this.$store.state.setTargetUser
//
//     aLogin({commit},data){
//       return commit ('mLogin',(data));    //mutationsName 是mutations 中的 mutationsName(state)
//     },
//
//     aLogout({commit},data){
//       return commit ('mLogout',data);    //mutationsName 是mutations 中的 mutationsName(state)
//     },
//
//
//     // 提交 更改后的 state 中的 stateName值
//     actionsName({commit},name){
//       return commit ('mutationsName',name);
//     },
//
//     actionsName2({commit},name){
//       return commit ('mutationsName2',name);
//     },
//
//     actionsNum({commit}){
//       return commit('mutationsNum');
//     },
//
//     actionsNum2({commit}){
//       return commit('mutationsNum2');
//     },
//
//     // ES6精简写法
//     //actionsName = ({commit},name) => commit('mutationsName', name)
//
//   }
// })
//
// /*
// 如果我们不喜欢这种在页面上使用
// “this.$store.state.count”
// 和“this.$store.dispatch('funName')”这种很长的写法，
// 那么我们可以使用mapState、mapGetters、mapActions就不会这么麻烦了；

/*store*/
// 1、定义好states
// 2、getters获取state
// 3、muations 改变state
// 4、actions 定义方法 执行muations

/*页面*/
// 1、先引用vuex    import {mapStates,mapActions, mapGetters} from 'vuex'
// computed 监听 getters

/*
{{getName2}}
<div @click="changeName()">改变</div>

computed:{
  ...mapGetters('StoreTagNav',[ //用mapGetters来获取StoreTagNav.js里面的getters 的 gState
    'gState',
  ]),
}
methods:{
...mapActions({
    changeName: "StoreTagNav/actName2",
  }),
}
*/

// */
