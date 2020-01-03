<template>
    <div class="layoutR-main index-container">
        <!--<iframe src="http://swim.zmtek.net/admin/index/home.html" frameborder="0"></iframe>-->
        <!-- <iframe src="http://192.168.0.133:20000" frameborder="0"></iframe>-->

        <!--现有会员  新增会员 在场人数 -->
        <el-row :gutter="20" class="index-row">
            <!--现有会员-->
            <el-col :md="12" :lg="8" >
                <div class="index-item">
                    <header class="index-item-title" @click="changeData($event)">
                        <div class="title">现有会员</div>
                    </header>
                    <ul class="index-item-tipUl">
                        <li><img src="~@/assets/icon/icon_indexVipG.png" alt="">潜在会员</li>
                        <li><img src="~@/assets/icon/icon_indexVipB.png" alt="">正式会员</li>
                        <li><img src="~@/assets/icon/icon_indexVipY.png" alt="">私教会员</li>
                    </ul>
                    <div class="flex-between">
                        <eCharts :eChartObj="chartVip" :style="styleVip"></eCharts>
                        <ul class="vipNum">
                            <li>潜在会员： <span class="vipTipG">{{chartVip.series[0].data[0].value}}</span></li>
                            <li>正式会员： <span class="vipTipB">{{chartVip.series[0].data[1].value}}</span></li>
                            <li>私教会员： <span class="vipTipY">{{chartVip.series[0].data[2].value}}</span></li>
                        </ul>
                    </div>
                </div>
            </el-col>

            <!--今日新增会员-->
            <el-col :md="12" :lg="8" >
                <div class="index-item">
                    <header class="index-item-title">
                        <div class="title">今日新增会员</div>
                    </header>
                    <ul class="index-item-tipUl">
                        <li><span class="addVip-tagG"></span>潜在会员</li>
                        <li><span class="addVip-tagB"></span>正式会员</li>
                        <li><span class="addVip-tagY"></span>私教会员</li>
                    </ul>
                    <div class="flex-between">
                        <eCharts :eChartObj="addVip" :style="styleAddVip"></eCharts>
                        <ul class="vipNum">
                            <li>潜在会员： <span class="vipTipG">{{addVip.series[0].data[0].value}}</span></li>
                            <li>正式会员： <span class="vipTipB">{{addVip.series[0].data[1].value}}</span></li>
                            <li>私教会员： <span class="vipTipY">{{addVip.series[0].data[2].value}}</span></li>
                        </ul>
                    </div>
                </div>
            </el-col>

            <!--在场人数-->
            <el-col :md="12" :lg="8" >
                <div class="index-item">
                    <div class="flex-between present-box">
                        <div class="present-top present-TopL">
                            <p class="title">在场人数</p>
                            <p class="num">58</p>
                        </div>
                        <div class="present-top present-TopR">
                            <p class="title">客流人数</p>
                            <p class="num">129</p>
                        </div>
                    </div>
                    <div class="present-time">
                        <el-date-picker
                                @change="truePresent"
                                v-model="datePresent"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>

                    <div class="flex-between">
                        <eCharts :eChartObj="presentNum" :style="stylePresent"></eCharts>
                    </div>
                </div>
            </el-col>

            <!--更衣室使用情况-->
            <el-col :md="12" :lg="8">
                <div class="index-item">
                    <header class="index-item-title">
                        <div class="title">更衣室使用情况</div>
                    </header>
                    <div class="lockerRoom-box flex-between">
                        <ul class="index-item-tipUl">
                            <li><span class="addVip-tagB"></span>男更</li>
                            <li><span class="addVip-tagY"></span>女更</li>
                        </ul>
                        <ul class="lockerRoom-main">
                            <li class="lockerRoom-item">
                                <el-progress :percentage="50" :text-inside="true" :stroke-width="16" :color="progressColorMan"></el-progress>
                                <div class="flex-between">
                                    <div class="used-room">占用45</div>
                                    <div class="surplus-roomM">剩余5</div>
                                </div>
                            </li>
                            <li class="lockerRoom-item">
                                <el-progress :percentage="50" :text-inside="true" :stroke-width="16" :color="progressColorFeman"></el-progress>
                                <div class="flex-between">
                                    <div class="used-room">占用20</div>
                                    <div class="surplus-roomF">剩余15</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>

            <!--课程分析-->
            <el-col :md="24" :lg="16">
                <div class="index-item">
                    <header class="index-item-title flex-between">
                        <div class="title">课程分析</div>
                        <el-date-picker
                                @change="trueLesson"
                                v-model="dateLesson"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                format="yyyy 年 MM 月 dd 日">
                        </el-date-picker>
                    </header>
                    <div class="lesson-main lesson-borR">
                        <h4 class="lesson-main-title">团课</h4>
                        <div class="lesson-item">
                            <eCharts :eChartObj="lessonGroup" :style="styleLesson"></eCharts>
                            <ul class="vipNum">
                                <li>上课人数： <span class="vipTipG">{{addVip.series[0].data[0].value}}</span></li>
                                <li>预约人数： <span class="vipTipB">{{addVip.series[0].data[1].value}}</span></li>
                             </ul>
                        </div>
                    </div>
                    <div class="lesson-main">
                        <h4 class="lesson-main-title">私教课</h4>
                        <div class="lesson-item">
                            <eCharts :eChartObj="lessonTrainer" :style="styleLesson"></eCharts>
                            <ul class="vipNum">
                                <li>上课人数： <span class="vipTipG">{{addVip.series[0].data[0].value}}</span></li>
                                <li>预约人数： <span class="vipTipB">{{addVip.series[0].data[1].value}}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>

        <!--收支统计-->
        <div class="index-item income-container clearfix">
            <header class="index-item-title flex-between">
                <div class="title">收支统计</div>
                <div>
                    <el-date-picker
                            @change="trueComeinTotal"
                            v-model="dateComeinTotal"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            format="yyyy 年 MM 月 dd 日">
                    </el-date-picker>
                </div>
            </header>
            <div class="income-total">
                <div class="income-borR">
                    <div class='price'>￥140000</div>
                    <div>总收入</div>
                </div>
            </div>
            <div class="income-box">
                <ul class="flex-between">
                    <li class="income-item" v-for="(item,index) in incomeArr" :key="index">
                        <el-progress type="circle" :percentage="item.percentage" :stroke-width="16" :color="item.color"></el-progress>
                        <div :class="item.class">￥{{item.price}}</div>
                        <div class="income-type">{{item.name}}</div>
                    </li>
                </ul>
            </div>
        </div>

        <!--收入趋势-->
        <div class="index-item comein-main">
            <header class="index-item-title flex-between">
                <div class="title">收入趋势</div>
                <div>
                    <span class="comeIn-title">日期筛选</span>
                    <el-date-picker
                            @change="trueComein"
                            v-model="dateComein"
                            type="daterange"
                            align="right"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00', '08:00:00']">
                    </el-date-picker>
                </div>
            </header>
            <ul class="index-item-tipUl">
                <li><img src="~@/assets/icon/icon_comeinTK.png" alt="">团课营收</li>
                <li><img src="~@/assets/icon/icon_comeinSJ.png" alt="">私教营收</li>
                <li><img src="~@/assets/icon/icon_comeinHJ.png" alt="">会籍营收</li>
            </ul>
            <eCharts :eChartObj="comeIn" :style="styleComeIN"></eCharts>
        </div>

    </div>
</template>

<script>
    import eCharts from '@/components/Echarts/Echarts'

    export default {
        name: "index",
        inject:['reLoad'],

        data() {
            return {
                datePresent:'',        /*在场人数 时间选择*/
                dateLesson:'',        /*课程分析 时间选择*/
                dateComeinTotal:'',   /*收入统计 时间选择*/
                dateComein:'',        /*收入趋势 时间选择*/

                /*收入统计 模拟数据*/
                incomeArr:[
                    {
                        percentage:35,
                        name:'团课收入',
                        price:'5200',
                        class:"colorRed",
                        color:'#005AD4',
                    },
                    {
                        percentage:40,
                        name:'私教收入',
                        price:'1680',
                        class:"colorBlueL",
                        color:'#FF8A7E',
                    },
                    {
                        percentage:54,
                        name:'会籍收入',
                        price:'1180',
                        class:"colorYellow",
                        color:'#4CCBEB',
                    },
                    {
                        percentage:35,
                        name:'定金',
                        price:'5200',
                        class:"colorBlue",
                        color:'#FFBE00',
                    },
                    {
                        percentage:70,
                        name:'转让',
                        price:'1680',
                        class:"colorGreen",
                        color:'#1EAAA1',
                    },
                    {
                        percentage:20,
                        name:'退还',
                        price:'1680',
                        class:"colorViolet",
                        color:'#B6A2DE',
                    },
                ],
                progressColorMan:'#005AD4', /*男更进度条 颜色*/
                progressColorFeman:'#FF8A7E', /*女更进度条 颜色*/

                /*eCharts 对应宽高*/
                styleVip: {
                    height: '220px',
                    width: '220px',
                },
                styleAddVip: {
                    height: '220px',
                    width: '70%',
                },
                stylePresent: {
                    height: '180px',
                    width: '100%',
                },
                styleLesson:{
                    height: '180px',
                    width: '220px',
                },
                styleComeIN: {
                    height: '310px',
                    width: '100%',
                },

                /*现有会员*/
                chartVip: {
                    color: ['#FF8A7E', '#4CCBEB', '#005AD4'], //自定义的颜色
                    tooltip: {
                        trigger: 'item',
                    },
                    series: [{
                        // name: '现有会员',
                        height: '90%',
                        width: '90%',
                        left: '10%',
                        top: 0,
                        type: 'pie',

                        data: [],
                        label: {
                            normal: {
                                position: 'inner',
                                show: false,
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        }
                    }],
                },

                /*新增会员*/
                addVip: {
                    color: ['#FF8A7E', '#4CCBEB', '#005AD4'], //自定义的颜色
                    tooltip: {
                        trigger: 'item',
                    },
                    series: [
                        {
                            type:'funnel',
                            left: '10%',
                            width: '60%',
                            height: '60%',
                            top: '20%',

                            label: {
                                show: false,
                                position: 'inside'
                            },

                            data: [
                                {value: 60, name: '访问'},
                                {value: 40, name: '咨询'},
                                {value: 20, name: '订单'},
                            ]
                        }
                    ]
                },

                /*在场与客流人数*/
                presentNum: {
                    color: ['#FF8A7E', '#4CCBEB', '#005AD4'], //自定义的颜色
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: ['8:00', '9:00', '10:00', '11:00'],
                        //设置坐标轴字体颜色和宽度
                        axisLine:{
                            lineStyle:{
                                color:'#8E8E8E',
                            }
                        },
                        splitLine: {
                            lineStyle:{
                                color:'#f4f4f4',
                                width: 1
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name: '客流趋势',   // y轴名称
                        axisLine:{
                            lineStyle:{
                                color:'#8E8E8E',
                            }
                        },
                    },
                    grid:{
                        top:"40px",
                        left:"60px",
                        right:"40px",
                        bottom:"20px",
                        width:"auto", //图例宽度
                        height:"auto", //图例高度

                    },
                    series: [
                        {

                            name: '客流趋势',
                            type: 'line',
                            data: [110, 201, 150, 223],
                        },
                        {
                            name: '在场人数',
                            type: 'line',
                            data: [431, 321, 335, 413],
                        }
                    ]
                },

                /*课程分析 团课*/
                lessonGroup: {
                    tooltip: {
                        trigger: 'item',
                    },
                    color: ['#4CCBEB', '#005AD4'], //自定义的颜色
                    series: [
                        {
                            left: '20%',
                            width: '90%',
                            height: '90%',
                            top: '0%',

                            name: '课程分析',
                            type: 'pie',
                            radius: ['50%', '70%'],

                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '18',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            },
                            data: [
                                {value: 335, name: '上课人数'},
                                {value: 310, name: '预约人数'},
                            ]
                        }
                    ]
                },

                /*课程分析 私教课*/
                lessonTrainer: {
                    tooltip: {
                        trigger: 'item',
                    },
                    color: ['#FF8A7E', '#FFBE00'], //自定义的颜色
                    series: [
                        {
                            left: '20%',
                            width: '90%',
                            height: '90%',
                            top: '0%',

                            name: '课程分析',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '18',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true,
                                }
                            },
                            data: [
                                {value: 335, name: '上课人数'},
                                {value: 310, name: '预约人数'},
                            ]
                        }
                    ]
                },

                /*收支趋势*/
                comeIn:{
                    color: ['#FF8A7E','#005AD4','#4CCBEB'], //自定义的颜色
                    tooltip: {
                        trigger: 'axis',
                    },
                    xAxis: {
                        type: 'category',
                        data: ['09-02', '09-04', '09-06', '09-18'],
                        axisLine:{
                            lineStyle:{
                                color:'#8E8E8E',
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',
                        axisLine:{
                            lineStyle:{
                                color:'#8E8E8E',
                            }
                        },
                    },
                    grid:{
                        top:"30px",
                        left:"60px",
                        right:"40px",
                        bottom:"40px",
                        width:"auto", //图例宽度
                        height:"80%", //图例高度

                    },
                    series: [
                        {
                            name: '团课营收',
                            type: 'line',
                            data: [910, 401, 850, 723],
                            symbolSize: 8,   //设定实心点的大小
                            lineStyle: {
                                normal: {
                                    type: 'dashed',
                                }
                            },
                        },
                        {
                            name: '私教营收',
                            type: 'line',
                            symbolSize: 8,   //设定实心点的大小
                            data: [431, 921, 435, 613],
                        },
                        {
                            name: '会籍营收',
                            symbolSize: 8,   //设定实心点的大小
                            type: 'line',
                            data: [700, 321, 535, 413],
                        }
                    ]
                },

            }
        },

        mounted() {

        },

        methods: {
            changeData(e) {
                console.log('11');
                this.chartVip.series[0].data = [
                    {value: 210, name: '潜在会员'},
                    {value: 134, name: '正式会员'},
                    {value: 235, name: '私教会员'},
                ];
            },

            /*在场人数 时间选中*/
            truePresent(){
                console.log(this.datePresent);
            },

            /*课程分析 时间选中*/
            trueLesson(){
                console.log(this.dateLesson);
            },

            /*收入趋势 时间选中*/
            trueComeinTotal(){
                console.log(this.dateComeinTotal);
            },

            /*收入趋势 时间选中*/
            trueComein(){
                console.log(this.dateComein[0]);
                console.log(this.dateComein[1]);
            },

        },
        created() {

            /*现有会员数据*/
            this.chartVip.series[0].data = [
                {value: 310, name: '潜在会员'},
                {value: 234, name: '正式会员'},
                {value: 135, name: '私教会员'},
            ];

            /*新增会员数据*/
            this.addVip.series[0].data = [
                {value: 50, name: '潜在会员'},
                {value: 34, name: '正式会员'},
                {value: 15, name: '私教会员'},
            ];

        },
        components: {
            eCharts
        },

        /*页面刷新*/
        beforeRouteEnter (to, from, next) {
            console.log(to);
            console.log(from);
            if(from.name == 'login'){
                console.log('我从登陆页过来的 正在刷新……');
                next(vm => {
                    window.location.reload();
                })
            } else {
                next()
            }
        },
    }
</script>

<style scoped lang="scss">
    iframe {
        width: 100%;
        min-height: 100vh;
    }

    .layoutR-main {
        padding: 20px;
    }
</style>

