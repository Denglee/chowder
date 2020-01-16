<template>
    <div class="province-city">

        <el-form-item class="page-form-item" label="所属省：" prop="status" style="width: calc(50% - 20px)">
            <el-select v-model="province" placeholder="请选择" @change="provinceChanged">
                <el-option
                        :key="''"
                        :label="'全部'"
                        :value="''">
                </el-option>
                <el-option
                        v-for="item in provinces"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item class="page-form-item" label="市：" prop="status" style="width: calc(50% - 20px);margin-right: 0px">
            <el-select v-model="city"
                       :loading="loadingCity"
                       @change="cityChanged"
                       placeholder="请选择">
                <el-option
                        :key="''"
                        :label="'全部'"
                        :value="''">
                </el-option>
                <el-option
                        v-for="item in cities"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
    </div>
</template>

<script type="text/javascript">
    import provinceCity from '@/assets/js/province.json'
    export default {
        name: 'provinceCity',
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
        created() {
            this.provinces = provinceCity.provinces
        },
        computed: {

        },
        mounted() {
            this.province = this.provinceCode;
            this.provinceChanged(this.provinceCode);

            this.city = this.cityCode;
        },
        data() {
            return {
                loadingCity: false,
                province: '',
                city: '',
                provinces: [],
                cities: []
            }
        },
        methods: {

            /*省份选择*/
            provinceChanged(value) {
                if (value !== '') {
                    this.loadingCity = true;
                    for (var item of this.provinces) {
                        if (item.code === value) {
                            this.cities = item.cities;
                            this.city = '';
                            this.loadingCity = false;
                            break
                        } else {
                            continue
                        }
                    }
                } else {
                    this.cities = [];
                    this.city = ''
                }
                console.log(this.province);
                console.log(this.city);
                this.$emit('selectChange', this.province, this.city);
            },

            /*城市选择*/
            cityChanged(value) {
                console.log(this.province);
                console.log(this.city);
                this.$emit('selectChange', this.province, this.city);
            },

            /*重置 */
            resetProviceCity(province, city) {
                this.cities = []
                if (province && city) {
                    this.province = province;
                    this.provinceChanged(this.province)
                    this.city = city
                } else {
                    this.province = '';
                    this.city = '';
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>

</style>