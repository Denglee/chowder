<template>
    <div class="layoutR-main">
        <iframe src="http://swim.zmtek.net/admin/index/home.html" frameborder="0"></iframe>
       <!-- <iframe src="http://192.168.0.133:20000" frameborder="0"></iframe>-->
    </div>
</template>

<script>
    import eCharts from '@/components/Echarts/Echarts'

    export default {
        name: "index",
        data() {
            return {
                styleVip: {
                    height: '300px',
                    width: '300px',
                },
                stylePresent:{
                    height: '300px',
                    width: '400px',
                },

                /*现有会员*/
                chartVip: {
                    title: {},
                    xAxis: {},
                    yAxis: {},
                    series: [{
                        // name: '现有会员',
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
                    title: {},
                    xAxis: {},
                    yAxis: {},
                    series: [{
                        // name: '新增会员',
                        type: 'funnel',
                        data: [],
                        label: {
                            normal: {
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

                /*在场与客流人数*/
                presentNum:{
                    title: {
                        text: '未来一周气温变化',
                        subtext: '纯属虚构'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['最高气温','最低气温']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一','周二','周三','周四','周五','周六','周日'],
                        show:true,
                    },
                    yAxis: {
                        type: 'value',
                        show:true,
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    },
                    series: [
                        {
                            name:'最高气温',
                            type:'line',
                            data:[11, 11, 15, 13, 12, 13, 10],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'最低气温',
                            type:'line',
                            data:[1, -2, 2, 5, 3, 2, 0],
                            markPoint: {
                                data: [
                                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'},
                                    [{
                                        symbol: 'none',
                                        x: '90%',
                                        yAxis: 'max'
                                    }, {
                                        symbol: 'circle',
                                        label: {
                                            normal: {
                                                position: 'start',
                                                formatter: '最大值'
                                            }
                                        },
                                        type: 'max',
                                        name: '最高点'
                                    }]
                                ]
                            }
                        }
                    ]
                },


              /*  presentNum: {
                    title: {},
                    xAxis: {
                        show: true,
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        show: true,
                        type: 'value'
                    },
                    series: [


                        {
                        name: '在场人数',
                        type: 'line',
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                    },
                    // {
                    //     name: '客流人数',
                    //     type: 'line',
                    //     data:[101, 11, 105, 13, 120, 13, 97],
                    // }
                    ],
                },*/

                echartObj: {
                    title: {
                        text: '新增会员'
                    },
                    tooltip: {},
                    xAxis: {},
                    yAxis: {
                        show: false,
                        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                    },
                    series: [{
                        name: '销量',
                        type: 'pie',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                },
                echartObj2: {
                    title: {
                        text: 'ECharts 示例'
                    },
                    tooltip: {},
                    xAxis: {
                        show: true,
                        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                    },
                    yAxis: {
                        show: true,
                        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                    },
                    series : [
                        {
                            name:'直接访问',
                            type:'bar',
                            barWidth: '50%',
                            data:[100, 1052, 2000, 1034, 2390, 1030, 2220],    //每个日期对应的数据
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: 'top', //在上方显示
                                        textStyle: { //数值样式
                                            color: 'black',
                                            fontSize: 16
                                        }
                                    }
                                }
                            }
                        }
                    ]
                },
                echartObj3: {

                    title: {
                        text: '漏斗图',
                        subtext: '纯属虚构'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}%"
                    },
                    // toolbox: {
                    //     feature: {
                    //         dataView: {readOnly: false},
                    //         restore: {},
                    //         saveAsImage: {}
                    //     }
                    // },
                    yAxis: {
                        show: false,
                        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                    },
                    xAxis: {},
                    legend: {
                        data: ['展现', '点击', '访问', '咨询', '订单']
                    },
                    series: [
                        {
                            name: '漏斗图',
                            type: 'funnel',
                            left: '10%',
                            top: 60,
                            //x2: 80,
                            bottom: 60,
                            width: '80%',
                            // height: {totalHeight} - y - y2,
                            min: 0,
                            max: 100,
                            minSize: '0%',
                            maxSize: '100%',
                            sort: 'descending',
                            gap: 2,
                            label: {
                                show: true,
                                position: 'inside'
                            },
                            labelLine: {
                                length: 10,
                                lineStyle: {
                                    width: 1,
                                    type: 'solid'
                                }
                            },
                            itemStyle: {
                                borderColor: '#fff',
                                borderWidth: 1
                            },
                            emphasis: {
                                label: {
                                    fontSize: 20
                                }
                            },
                            data: [
                                {value: 60, name: '访问'},
                                {value: 40, name: '咨询'},
                                {value: 20, name: '订单'},
                                {value: 80, name: '点击'},
                                {value: 100, name: '展现'}
                            ]
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
            }
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
                {value: 310, name: '潜在会员'},
                {value: 234, name: '正式会员'},
                {value: 135, name: '私教会员'},
            ];

            /*新增会员数据*/
            // this.presentNum.series[0].data = [820, 932, 901, 934, 1190, 1230, 1320],
            //     [
            //     {value: 210, name: '潜在会员'},
            //     {value: 134, name: '正式会员'},
            //     {value: 335, name: '私教会员'},
            // ];
            // this.presentNum.series[1].data = [620, 732, 1101, 834, 1290, 1330, 1120]
            //     [
            //     {value: 310, name: '潜在会员'},
            //     {value: 234, name: '正式会员'},
            //     {value: 135, name: '私教会员'},
            // ];
        },
        components: {
            eCharts
        }
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

