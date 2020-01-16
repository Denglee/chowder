<template>
    <div class="layoutR-main">
        <!--右边iframe-->
        <!--<publicIframe/>-->

        <!--<children></children>-->

        <son></son>

        <div class="switch-box">
           <el-table
                   ref="multipleTable"
                   :data="tableData"
                   tooltip-effect="dark"
                   style="width: 100%"
                   height="400px"
                   @selection-change="handleSelectionChange">
               <el-table-column
                       type="selection"
                       width="55">
               </el-table-column>

               <el-table-column
                       prop="name"
                       label="名称">
               </el-table-column>

               <el-table-column
                       prop="idNum"
                       label="编号">
               </el-table-column>

               <el-table-column
                       prop="vNum"
                       label="度数"
                       show-overflow-tooltip>
                   <template slot-scope="scope">{{ scope.row.ANum }} Kw.h</template>
               </el-table-column>

               <el-table-column
                       prop="ANum"
                       label="电流">
                   <template slot-scope="scope">{{ scope.row.ANum }} A</template>
               </el-table-column>

               <el-table-column
                       prop="openTime"
                       label="开关机时间">
                   <template slot-scope="scope">
                       <div class="status-connect">开机：{{scope.row.openTime[0]}}</div>
                       <div class="status-break">关机：{{scope.row.openTime[1]}}</div>
                   </template>
               </el-table-column>

<!--                <el-table-column-->
<!--                        prop="closeTime"-->
<!--                        label="关机时间">-->
<!--                </el-table-column>-->

               <el-table-column
                       prop="status"
                       label="状态">
                   <template slot-scope="scope">
                       <div v-if="scope.row.status == 1 " class="status-connect">通电中</div>
                       <div v-if="scope.row.status == 0 " class="status-break">断电中</div>
                   </template>
               </el-table-column>

               <el-table-column label="操作" width="400">
                   <template slot-scope="scope">
                       <el-switch
                               v-model="scope.row.status"
                               :active-value="1"
                               :inactive-value="0"
                               @change=change(scope.$index,scope.row)
                       >
                       </el-switch>
                       <el-button
                               size="mini"
                               @click="handleEdit(scope.$index, scope.row)">编辑
                       </el-button>
                       <el-button
                               size="mini"
                               type="danger"
                               @click="handleChange(scope.$index,scope.row)">状态
                       </el-button>
                       <el-button
                               size="mini"
                               type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除
                       </el-button>
                   </template>
               </el-table-column>
           </el-table>

           <div class="block">

               <el-pagination
                       @size-change="handleSizeChange()"
                       @current-change="handleCurrentChange"
                       :current-page.sync="currentPage1"
                       :page-size="10"
                       layout="prev, pager, next,total"
                       :total="40">
               </el-pagination>

           </div>
       </div>

       <el-dialog title="收货地址" :visible.sync="dialogEditForm">
           <el-form :model="editForm">
               <el-form-item label="名称" :label-width="formLabelWidth">
                   <el-input v-model="editForm.name" autocomplete="off"></el-input>
               </el-form-item>

               <el-form-item label="编号" :label-width="formLabelWidth">
                   <el-input v-model="editForm.idNum" autocomplete="off"></el-input>
               </el-form-item>

               <el-form-item label="电量" :label-width="formLabelWidth">
                   <el-input v-model="editForm.vNum" autocomplete="off"></el-input>
               </el-form-item>

               <el-form-item label="电流" :label-width="formLabelWidth">
                   <el-input v-model="editForm.ANum" autocomplete="off"></el-input>
               </el-form-item>

               <el-form-item label="开机时间" :label-width="formLabelWidth">
                   <el-time-picker
                           popper-class="timeClose"
                           type="date"
                           is-range
                           v-model="editForm.openTime"
                           range-separator="至"
                           format='HH:mm'
                           start-placeholder="开机时间"
                           end-placeholder="关机时间"
                           placeholder="选择时间范围">
                   </el-time-picker>
               </el-form-item>
           </el-form>
           <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible = false">取 消</el-button>
               <el-button type="primary" @click="sureEdit()">确 定</el-button>
           </div>
       </el-dialog>


       <el-dialog title="收货地址" :visible.sync="dialogAddForm">
           <el-form :model="form">
               <el-form-item label="活动名称" :label-width="formLabelWidth">
                   <el-input v-model="form.name" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="活动区域" :label-width="formLabelWidth">

                   <el-time-picker
                           popper-class="timeClose"
                           type="date"
                           is-range
                           v-model="timeVal"
                           range-separator="至"
                           value-format='HH:mm'
                           start-placeholder="开机时间"
                           end-placeholder="关机时间"
                           placeholder="选择时间范围"
                           @change = 'chooseTime'>
                   </el-time-picker>

               </el-form-item>
           </el-form>
           <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible = false">取 消</el-button>
               <el-button type="primary" @click="sureTIme">确 定</el-button>
           </div>
       </el-dialog>
    </div>
</template>

<script>
    import son from '@/components/Tinymce/son'
    import children from '@/components/Tinymce/children'
    export default {
        name: "Memberhy_card",
        components:{
            son,
            children
        },

        data() {
            return {
                timeVal: '',
                dialogAddForm: false,
                dialogEditForm:false,
                editForm:{
                    name: '',
                    idNum: ' ',
                    vNum: "",
                    ANum: "",
                    status: '',
                    id: '',
                    closeTime:[],
                    openTime:'',
                },

                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',

                currentPage1: 5,

                /*表格数据*/
                tableData: [
                    {
                        name: '男更中继',
                        idNum: 'ZM_D4a28f ',
                        vNum: "10",
                        ANum: "0.12",
                        status: 1,
                        id: '12',
                        closeTime:'',
                        openTime:'',
                    }, {
                        name: '女更中继',
                        idNum: 'ZM_DA448f',
                        vNum: "10",
                        ANum: "0.12",
                        status: 1,
                        id: "13",
                        closeTime:'',
                        openTime:'',
                    }, {
                        name: '男更中继',
                        idNum: 'ZM_DA448f',
                        vNum: "10",
                        ANum: "0.12",
                        status: 0,
                        id: "14",
                        closeTime:'',
                        openTime:'',
                    }, {
                        name: '女更中继',
                        idNum: 'ZM_D8428f',
                        vNum: "10",
                        ANum: "0.18",
                        status: 1,
                        id: "15",
                        closeTime:'',
                        openTime:'',
                    }, {
                        name: '男更中继',
                        idNum: 'ZM_DAC28f',
                        vNum: "10",
                        ANum: "0.12",
                        status: 0,
                        id: "16",
                        closeTime:'',
                        openTime:'',
                    }, {
                        name: '男更中继',
                        idNum: 'ZC_DA828f',
                        vNum: "10",
                        ANum: "0.22",
                        status: 1,
                        id: "17",
                        closeTime:'',
                        openTime:'',
                    }],
                multipleSelection: [],
                value1: '',

                tdTemp:[],
            }

        },

        methods: {
            /*全选*/
            toggleSelection(rows) {
                console.log(rows);
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },

            /*单个选中*/
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = val;
            },

            /*编辑*/
            handleEdit(index, row) {
                console.log(index, row);
                console.log(row);
                this.editForm = row;

                this.dialogEditForm = true;
            },

            /*编辑确定*/
            sureEdit(){
                console.log(this.editForm);

                console.log(this.editForm.openTime[0]);
                let openTime = this.dateConversion(this.editForm.openTime[0]);
                let closeTime = this.dateConversion(this.editForm.openTime[1]);
                console.log(openTime);
                console.log(closeTime);

                let time=[];
                time.push(openTime,closeTime);
                this.editForm.openTime = time;

                // for (const v of this.list) {
                //     if (v.id === this.temp.id) {
                //         const index = this.list.indexOf(v)
                //         this.list.splice(index, 1, this.temp)
                //         break
                //     }
                // }

                this.$message({
                    type:'success',
                    duration:'1500',
                    message:'更新成功'
                });


                this.dialogEditForm = false;
            },


            chooseTime(val){
                console.log('asd');
                console.log(val);
            },

            /*删除*/
            handleDelete(index, row) {
                console.log(index, row);
            },

            /*开关*/
            change(index, row) {
                console.log(index, row);
            },

            /*分页*/
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },


            handleChange(index, row){
                console.log(index, row);
                this.dialogAddForm = true
            },


            /*时间转换*/
            dateConversion(value){
                var d = new Date(value);
                var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                return date;
            },

            /*弹窗确定*/
            sureTIme() {
                console.log(this.timeVal);
                console.log(this.timeVal[0]);
                let openTime = this.dateConversion(this.timeVal[0]);
                let closeTime = this.dateConversion(this.timeVal[1]);
                console.log(openTime);
                console.log(closeTime);
            }
        },


        created() {

        },
    }
</script>

<style lang="scss">
    .switch-box {
        padding: 20px;
    }

    .status-connect {
        color: red;
    }

    .status-break {
        color: blue;
    }

    .timeClose .el-time-spinner__list::after,
    .timeClose .el-time-spinner__list::before {
        content: '';
        display: block;
        width: 100%;
        height: 72px;
    }
</style>