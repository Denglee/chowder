<template>
    <div class="echarts-box"  ref="echartsBox" :style="style"></div>
</template>

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

<script>
    export default {
        data() {
            return{
                eCharts: {},
            }
        },
        props: {
            width: {
                type: String,
                // default: "200px"
            },
            height: {
                type: String,
                // default: "400px"
            },
            eChartObj: {
                type: Object,
                default: {}
            }
        },
        created() {

        },
        mounted(){
            let _this = this;

            /*大小*/
            window.onresize = function() {
                _this.eCharts.resize()
            };

            /*渲染    // 注意，必须mounted后绘制*/
            this.$nextTick(()=> {
                this.loadEchart()
            });

        },
        computed: {
            style() {
                return {
                    height: this.height,
                    width: this.width
                };
            }
        },

        watch: {
            eChartObj: {
                handler(newValue, oldValue) {
                    this.eChartObj = newValue;  //把新值赋值给我们的属性数据
                    this.loadEchart();  //刷新echarts图表
                },
                deep: true
            }
        },
        methods: {
            /*初始化echarts*/
            loadEchart() {
                /*获取echars 容器*/
                this.eCharts = this.$echarts.init(this.$refs.echartsBox);
                /*参数*/
                this.eCharts.setOption(this.eChartObj);

                   /* {
                    color:[ //自定义的颜色
                        '#FF8A7E',
                        '#4CCBEB',
                        '#005AD4',
                   ],

                    /!*标题*!/
                    title: {
                        text: this.eChartObj.title.text || '',
                        show:this.eChartObj.title.show ||false,
                    },

                    /!*提示框鼠标悬浮时的信息提示*!/
                    tooltip: {},

                    /!*x轴*!/
                    xAxis: {
                        // data: this.eChartObj.xAxis.data || {},
                        show:this.eChartObj.xAxis.show || false,
                    } ,
                    // yAxis:this.eChartObj.yAxis,

                    /!*y轴*!/
                    yAxis:{
                        show:this.eChartObj.yAxis.show  || false,
                        // data:this.eChartObj.yAxis.data || {},
                    },

                    /!*类型 和 数据*!/
                    // series:{
                    //     type:this.eChartObj.series[0].type,
                    //     data:this.eChartObj.series[0].data,
                    // }
                    series: this.eChartObj.series,
                    // legend:this.eChartObj.legend || [],
                })*/
            },
        }
    }
</script>

<!--https://blog.csdn.net/joyvonlee/article/details/92020547-->
<!--1、npm 下载 echatrs
npm install echarts -S

2、main.js 引用
/ 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

3、页面准备一个具有宽高的DOM容器
div id="myChart" :style="{width: '300px', height: '300px'}"></div>

4、methods中可以通过 echarts.init 方法初始化一个 echarts 实例并通过 setOption 方法生成一个简单的柱状图
methods:{
    let myChart = this.$echarts.init(document.getElementById('myChart'))
    // 绘制图表
    myChart.setOption({  参数 })
}
5、 mounted绘制
mounted(){
    this.drawLine();
},-->
