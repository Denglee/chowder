import { Message } from 'element-ui';
import router from '../router'

const state={
    infoArr : [],
    name:'lideng'
};

const getters = {
    getsName(state,name){
        return state.name;
    }
};

const mutations = {
    mutName(state,name){
        state.name = name;
    },
};

const actions = {
    actName({commit},name){
        console.log('act name');
        return commit('mutName',name);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}