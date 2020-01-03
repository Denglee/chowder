<template>
    <div class="login-main">

        <div class="login-box">

            <img src="http://swim.zmtek.net/assets/images/logo-daka.png" alt="" class="login-logo">
<!--            <img src="http://192.168.0.133:20000/assets/images/logo-daka.png" alt="" class="login-logo">-->
            <b class="login-title">SAAS管理系统</b>
            <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="100px" class="login-ruleForm" v-show="!LoginWechat">
                <el-form-item prop="username">
                    <el-input
                            v-model="loginForm.username"
                            placeholder="账号"
                            clearable>
                        <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input v-model="loginForm.password"
                              placeholder="账号"
                              type="password"
                              clearable
                              :show-password = true>
                        <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
                    </el-input>
                </el-form-item>

                <el-button class="btnLogin" type="primary" @click="submitForm('loginForm')">登录</el-button>
                <!--<el-button class="btnLogin" type="primary"   @click="visible = !visible">立即登录</el-button>-->

                <!--口碑不需要第三方登录-->
               <!-- <el-divider>第三方登录</el-divider>
                <img src="~@/assets/img/logo-wechat.png" alt="" class="logo-wechat" @click="goCodeLogin()">-->

            </el-form>

            <!--微信扫码登录-->
            <div class="login-wechat" v-if="LoginWechat">
                <img src="" alt="">
                <div class="LoginWechat-tip">
                    请使用微信扫描二维码登录
                    <br>
                    “健身房管理系统”
                </div>
                <el-button class="btnLogin" type="primary" @click="goCodeLogin()">返回账号密码登录</el-button>
            </div>

        </div>

        <!--验证码弹窗-->
        <el-popover
                popper-class="slidingPictures"
                ref="popover"
                trigger="manual"
                v-model="visible"
        >
            <div class="sliding-pictures">
                <div class="vimg">
                    <canvas id="sliderBlock"></canvas>
                    <canvas id="codeImg"></canvas>
                </div>
                <div class="slider">
                    <div class="track" :class="{ pintuTrue: puzzle }">
                        {{ tips }}
                    </div>
                    <div class="button el-icon-s-grid" @mousedown.prevent="drag"></div>
                </div>
                <div class="operation">
                   <span
                           title="关闭验证码"
                           @click="visible = false"
                           class="el-icon-circle-close"
                   ></span>
                    <span
                            title="刷新验证码"
                            @click="canvasInit"
                            class="el-icon-refresh-left"
                    ></span>
                </div>
            </div>
        </el-popover>

    </div>
</template>

<script>
    import {ApiloginIn,ApiloginOut} from '@/assets/js/api'
    import {mapState,mapActions, mapGetters} from 'vuex'
    let btnStatusLogin = true;   //按钮是否可点击状态

    export default {
        inject:['reLoad'],
        data() {
            return {
                LoginWechat:false, //登录方式切换 显隐状态
                loginForm: {
                    username: '',
                    password: '',
                },
                loginRules: {  //验证规则
                    username: [
                        {required: true, message: '姓名不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ],
                },

                tips: "拖动左边滑块完成上方拼图",

                visible: false,  //登录验证滑动框 显隐状态
                //滑块x轴数据
                slider: {
                    mx: 0,
                    bx: 0
                },
                //拼图是否正确
                puzzle: false,

            }
        },
        computed: {
            /*       ...mapState({
                       lang: state => state.lang,
                       theme: state => state.theme
                   })*/
        },
        watch: {
            visible(e) {
                if (e === true) {
                    this.canvasInit();
                    this.puzzle = false;
                }
            },


        },

        created() {

        },

        methods: {
            ...mapActions({
                ACTLogin:'StoreTagNav/ACTLogin',   //store里 login登录方法 并 保存用户信息
            }),

            getStatus (urlStr) {
                var urlStrArr = urlStr.split('/');
                return urlStrArr[urlStrArr.length - 1]
            },

            /*二维码登录*/
            goCodeLogin(){
                this.LoginWechat = !this.LoginWechat;
                this.visible = false;
            },

            /*提交*/
            submitForm(loginForm) {
                this.$refs[loginForm].validate((valid) => {
                    if (valid && btnStatusLogin) {
                        this.tips = "拖动左边滑块完成上方拼图";
                        console.log(`${btnStatusLogin}`);
                        /*弹出验证框*/
                        this.visible =!this.visible;
                        btnStatusLogin = false;
                        setTimeout(()=>{
                            btnStatusLogin =true;
                        },500);
                    } else {
                        console.error('登录提交失败!!');
                        return false;
                    }
                });
            },

            //拼图验证码初始化
            canvasInit() {
                //生成指定区间的随机数
                const random = (min, max) => {
                    return Math.floor(Math.random() * (max - min + 1) + min);
                };
                //x: 254, y: 109
                let mx = random(127, 244),
                    bx = random(10, 128),
                    y = random(10, 99);
                this.slider = { mx, bx };
                this.draw(mx, bx, y);
            },
            //鼠标按下
            drag(e) {
                console.log("鼠标按下", e);
                let dom = e.target; //dom元素
                let slider = document.querySelector("#sliderBlock"); //滑块dom
                const downCoordinate = { x: e.x, y: e.y };
                //正确的滑块数据
                let checkx = Number(this.slider.mx) - Number(this.slider.bx);
                //x轴数据
                let x = 0;
                const move = moveEV => {
                    x = moveEV.x - downCoordinate.x;
                    //y = moveEV.y - downCoordinate.y;
                    if (x >= 251 || x <= 0) return false;
                    dom.style.left = x + "px";
                    //dom.style.top = y + "px";
                    slider.style.left = x + "px";
                };
                const up = () => {
                    document.removeEventListener("mousemove", move);
                    document.removeEventListener("mouseup", up);
                    dom.style.left = "";
                    let max = checkx + 40;
                    let min = checkx - 40;
                    console.log('x:'+x, 'checkx:'+checkx, 'max:'+max, 'min:'+min);
                    //允许正负误差1
                    if ((max >= x && x >= min) || x === checkx) {
                        console.log("滑动解锁成功");
                        this.puzzle = true;
                        this.tips = "验证成功";

                         let that=this;
                          let username = that.loginForm.username;
                          let password = that.loginForm.password;
                          ApiloginIn({
                              username:username,
                              password:password,
                          }).then(res=>{
                              console.log(res);
                              if(res.status == 1){
                                  let loginData = res.data;
                                  console.log(loginData);
                                  that.ACTLogin(loginData);
                                  this.$message({
                                      message: res.info,
                                      type: 'success',
                                      duration:1500,
                                      offset:100,
                                  });


                                  setTimeout(()=>{
                                     /* this.$router.replace({
                                          path: "/redirect",
                                          query: {
                                              nextPath: '/index'
                                          }
                                      });*/
                                      that.$router.push({path:'/index'});
                                  },1500);

                              }
                              if(res.status == 0){
                                  this.$message({
                                      message: res.info,
                                      type: 'error',
                                      duration:3000,
                                      offset:40,
                                  });
                              }
                          });

                        setTimeout(() => {
                            this.visible = false;
                        }, 500);
                    } else {
                        console.log("拼图位置不正确");
                        this.tips = "验证失败，请重试";
                        this.puzzle = false;
                        this.canvasInit();
                    }
                };
                document.addEventListener("mousemove", move);
                document.addEventListener("mouseup", up);
            },
            draw(mx = 200, bx = 20, y = 50) {
                let mainDom = document.querySelector("#codeImg");
                let bg = mainDom.getContext("2d");
                let width = mainDom.width;
                let height = mainDom.height;
                let blockDom = document.querySelector("#sliderBlock");
                let block = blockDom.getContext("2d");
                //重新赋值，让canvas进行重新绘制
                blockDom.height = height;
                mainDom.height = height;

                /*绘图背景*/
                /*弹出 登录 cancas图片*/
                let imgBg1 = 'http://swim.zmtek.net/assets/images/loginImgBg1.jpg';
                let imgBg2 = 'http://swim.zmtek.net/assets/images/loginImgBg2.jpg';
                let imgBg3 = 'http://swim.zmtek.net/assets/images/loginImgBg3.jpg';
                let imgArr=[imgBg1, imgBg2, imgBg3,];
                var imgsrc = imgArr[Math.round(Math.random()*(imgArr.length-1))];  //随机抽取一个值
                console.log(imgsrc);

                let img = document.createElement("img");
                img.style.objectFit = "scale-down";
                img.src = imgsrc;
                img.onload = function() {
                    bg.drawImage(img, 0, 0, width, height);
                    block.drawImage(img, 0, 0, width, height);
                };
                let mainxy = { x: mx, y: y, r: 9 };
                let blockxy = { x: bx, y: y, r: 9 };
                this.drawBlock(bg, mainxy, "fill");
                this.drawBlock(block, blockxy, "clip");
            },
            //绘制拼图
            drawBlock(ctx, xy = { x: 254, y: 109, r: 9 }, type) {
                let x = xy.x,
                    y = xy.y,
                    r = xy.r,
                    w = 44;
                let PI = Math.PI;
                //绘制
                ctx.beginPath();
                //left
                ctx.moveTo(x, y);
                //top
                ctx.arc(x + (w + 5) / 2, y, r, -PI, 0, true);
                ctx.lineTo(x + w + 5, y);
                //right
                ctx.arc(x + w + 5, y + w / 2, r, 1.5 * PI, 0.5 * PI, false);
                ctx.lineTo(x + w + 5, y + w);
                //bottom
                ctx.arc(x + (w + 5) / 2, y + w, r, 0, PI, false);
                ctx.lineTo(x, y + w);
                ctx.arc(x, y + w / 2, r, 0.5 * PI, 1.5 * PI, true);
                ctx.lineTo(x, y);
                //修饰，没有会看不出效果
                ctx.lineWidth = 2;
                ctx.fillStyle = "rgba(255, 255, 255, 1)";
                ctx.strokeStyle = "rgba(255, 255, 255, 1)";
                ctx.stroke();
                ctx[type]();
                ctx.globalCompositeOperation = "xor";
            }

        },

    }
</script>
<style lang="scss">
    .login-main{
        background: url('http://swim.zmtek.net/assets/images/bg-login.png') no-repeat  50% 50%;
        background-size: cover;
        width: 100%;
        height: 100vh;
        position: relative;
        .login-box{
            position: absolute;
            right: 158px;
            /*top: 100px;*/
            top: calc(50vh - 196px);
            width:320px;
            min-height:392px;
            background:rgba(39,61,89,.9);
            box-shadow:-1px 2px 8px 0px rgba(12,22,36,0.79);
            border-radius:10px;
            text-align: center;
            padding: 20px 30px;
            .login-logo{
                display: block;
                margin: 6px auto 6px;
                width: 60%;
            }
            .login-title{
                display: block;
                margin: 0 auto;
                color: #fff;
                font-size: 16px;
            }
            .el-input{
                margin-top: 15px;
                font-size: 16px;
            }
            .el-input--small .el-input__icon{
                color: #fff;
            }
            .el-input__inner{
                /*height: 40px;*/
                /*line-height: 40px;*/
                background:rgba(255,255,255,.4);
                font-size: 16px;
                font-weight: 400;
                color:rgba(255,255,255,1);
                /*color:#333;*/
            }
            .btnLogin{
                width: 100%;
                margin-top: 15px;
                background-color: #fff;
                color: #273D59;
            }
            .btnLogin:hover{
                background-color: #273D59;
                color: #fff;
            }
            .el-divider__text{
                background:rgba(39, 61, 89, 1);
                color: #fff;
                font-size: 16px;
            }
            .logo-wechat{
                width: 35px;
                margin: 0 auto;
                display: block;
                cursor: pointer;
            }
            .LoginWechat-tip{
                text-align: center;
                color: #fff;
            }
        }

        .el-form-item__content{
            margin-left: 0!important;
        }
        .el-form-item{
            margin-bottom: 0;
        }
        .slidingPictures{
            position: fixed;
            right: 177px;
            top: 257px;
            width: 280px;
        }
    }
    .login {
        text-align: center;
    }

    .login input {
        display: block;
        border: solid 1px #ddd;
        border-radius: 4px;
        padding: 10px;
        width: 200px;
        margin: 20px auto 0;
    }

    .login button {
        display: block;
        border: solid 1px #ddd;
        border-radius: 4px;
        padding: 10px;
        width: 200px;
        margin: 20px auto 0;
    }

    /*该样式最终是以弹窗插入*/
    .sliding-pictures {
        width: 100%;
        position: relative;
        .vimg {
            width: 100%;
            height: 170px;
            #codeImg,
            #sliderBlock {
                /*padding: 7px 7px 0 7px;*/
                width: inherit;
                height: inherit;
            }
            #codeImg {
                //display: none;
            }
            #sliderBlock {
                position: absolute;
                z-index: 4000;
            }
        }
        .slider {
            width: 100%;
            height: 65px;
            border-bottom: #c7c9d0 1px solid;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .track {
                margin-left: 7px;
                width: 286px;
                height: 38px;
                background: rgba(28, 136, 188, 0.5);
                border-radius: 25px;
                font-size: 14px;
                line-height: 38px;
                padding-right: 15px;
                padding-left: 62px;
            }
            .pintuTrue {
                background: #67c23a;
                color: #ffffff;
            }
            .button {
                position: absolute;
                width: 50px;
                height: 50px;
                line-height: 48px;
                background: #ffffff;
                box-shadow: #b9bdc8 0 0 3px;
                border-radius: 50%;
                left: 7px;
                text-align: center;
                font-size: 28px;
                color: #3e5d8b;
                &:hover {
                    color: #2181bd;
                    cursor: pointer;
                }
            }
        }
        .operation {
            width: 100%;
            height: 40px;
            > span {
                color: #9fa3ac;
                display: inline-block;
                width: 40px;
                font-size: 25px;
                line-height: 40px;
                text-align: center;
                &:hover {
                    background: #e2e8f5;
                }
            }
        }
    }


    /*口碑*/
    .login-main .login-ruleForm{
        margin-top: 20px;
        .btnLogin{
            margin-top: 30px;
        }
        .el-input{
            margin-top: 20px;
        }
    }
</style>
