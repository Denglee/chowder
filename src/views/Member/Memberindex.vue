<template>
    <div class="layoutR-main">
        <!--右边iframe-->
        <!--<publicIframe/>-->

        <!--<div>潜在会员</div>-->
        <!--<iframe :src="localSrc" frameborder="0" id="iframe"></iframe>-->
        <el-form ref="form" :model="addNew" label-width="120px" class="addNew">

            <el-form-item label="会员人脸ID：">
                <img src="@/assets/images/userHeader.png" alt="" class="addheader">
            </el-form-item>
            <el-form-item label="姓名：">
                <el-input v-model="addNew.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="性别：">
                <template>
                    <el-radio v-model="addNew.sex" label="man">男</el-radio>
                    <el-radio v-model="addNew.sex" label="feman">女</el-radio>
                </template>
            </el-form-item>
            <el-form-item label="手机号：">
                <el-input v-model="addNew.tel"></el-input>
            </el-form-item>
            <el-form-item label="生日：">
                <el-date-picker
                        v-model="addNew.birthday"
                        type="date"
                        placeholder="选择日期时间"
                        align="right"
                        class="dateIcon-right"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="体重：">
                <el-input v-model="addNew.weight">
                    <template>
                        <slot slot="suffix">kg</slot>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="地址：">
                <el-input v-model="addNew.address"></el-input>
            </el-form-item>

            <el-form-item label="会籍顾问：">
                <el-select v-model="addNew.selVal" placeholder="请选择">
                    <el-option
                            v-for="item in addNew.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value+item.id">
                    </el-option>
                </el-select>
            </el-form-item>


            <el-cascader
                    v-model="addNew.dataModel"
                    placeholder="请选择地区"
                    :props="{ expandTrigger: 'hover' }"
                    :options="areaData"
            >
            </el-cascader>


            <el-button type="submit" @click="btnAddform">提交</el-button>

        </el-form>

    </div>
</template>

<script>
    import provincecity from '@/components/provinceCity/provinceCity'
    import provinceJson from '@/assets/js/area.json'
    export default {
        components: {
            provincecity,
        },
        props: {

            provinceCode: {
                type: String,
                default: ''
            },

            cityCode: {
                type: String,
                default: ''
            }
        },
        name: "Memberindex",
        data() {
            return {
                areaData: [],

                localUrl: this.GLOBAL.localUrl,
                localSrc: "",

                addNew: {
                    id: '',
                    name: '',
                    sex: '',
                    tel: '',
                    birthday: '',
                    address: '',
                    options: [
                        {
                            value: 'guwen1',
                            id: '1',
                            label: '黄金糕'
                        }, {
                            value: 'guwen2',
                            id: '2',
                            label: '双皮奶'
                        }, {
                            value: 'guwen3',
                            id: '3',
                            label: '蚵仔煎'
                        }],
                    selVal: "",

                    province:'',
                    city:'',
                    dataModel:'',
                },


            }
        },
        methods: {
            btnAddform() {

                console.log(this.addNew)

            },

            selectChange(){
                this.$emit('provinceChanged');
                console.log(this.provinceCode);
                // this.$refs.addFormProvince.resetProviceCity()
            },
        },


        created() {
            this.areaData = provinceJson;
            for (var i = 0; i < this.areaData.length; i++) {
                if (this.areaData[i].children.length == 0) {
                    delete this.areaData[i].children //解决因为省级区域没有下级市的BUG
                }
            }



            /*console.log(this.$route);
            console.log(this.localUrl);
            console.log(this.$route.fullPath);*/

            let userId = this.$route.params.user_id;
            console.log(userId);
            if (!userId) {
                userId = '';
            }
            let iframeUrl = this.localUrl + '/Admin' + this.$route.fullPath + '/user_id/' + userId + '.html';
            console.log(iframeUrl);

            this.localSrc = iframeUrl;

        },

    }
</script>

<style lang="scss">
    #iframe {
        width: 100%;
        /*height: 100%;*/
        display: block;
        height: calc(100vh - 106px);
        padding-right: 10px;
        box-sizing: border-box;
        /*margin-top: 108px;*/
    }

    .addNew {
        background-color: #fff;
        padding: 20px;

        .el-input {
            width: 288px;
        }
    }

    .addheader {
        width: 140px;
        height: 140px;
        background-color: blue;
    }

    .dateIcon-right {
        .el-input__inner {
            padding-left: 10px;
        }

        .el-input__prefix {
            /*position: absolute!important;*/
            right: 0;
            left: auto;
        }
    }
</style>