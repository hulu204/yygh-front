<template>
    <div class="app-container">
        <!--表单-->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input  v-model="searchObj.hosname" placeholder="医院名称"/>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchObj.hoscode" placeholder="医院编号"/>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
        </el-form>

        <!-- 工具条 -->
        <div>
            <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
        </div>

        <!-- banner列表 -->
        <el-table
        :data="list" stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"/>
            <el-table-column type="index" label="序号" width="50"/>
            <el-table-column prop="hosname" label="医院名称"/>
            <el-table-column prop="hoscode" label="医院编号"/>
            <el-table-column prop="apiUrl" label="api基础路径" width="200"/>
            <el-table-column prop="contactsName" label="联系人姓名"/>
            <el-table-column prop="contactsPhone" label="联系人手机"/>
            <el-table-column label="状态" width="80">
                <template slot-scope="scope">
                        {{ scope.row.status === 1 ? '可用' : '不可用' }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="280" align="center">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)"></el-button>
                    <el-button v-if="scope.row.status==1" type="primary" size="mini"  @click="lockHospSet(scope.row.id,0)">锁定</el-button>
                    <el-button v-if="scope.row.status==0" type="primary" size="mini"  @click="lockHospSet(scope.row.id,1)">解锁</el-button>               
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
        :current-page="page"
        :page-size="limit"
        :total="total"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
        @current-change="getList"
        />
    </div>
</template>
<script>
import hospset from '@/api/hospset.js'

export default{
    data() {
        return{
            current:1,
            limit:3,
            searchObj:{},
            list:[],
            total:0,
            multipleSelection: []
        }
    },
    created() {
        this.getList()
    },
    methods:{
        // 批量复选框选定
        handleSelectionChange(selection) {
            this.multipleSelection = selection
        },
        // 批量删除
        removeRows(multipleSelection) {
            this.$confirm('此操作将永久删除医院是设置信息,是否继续?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => { //确定执行then方法
                //调用接口
                var idList = []
                for (var i = 0; i < this.multipleSelection.length; i++) {
                    var obj = this.multipleSelection[i]
                    idList.push(obj.id)
                }
                hospset.batchDelHospSet(idList)
                .then(response => {
                    //提示
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    //刷新页面
                    this.getList(1)
                })
            })
        },
        // 医院设置列表
        getList(page=1) {
            this.current = page
            hospset.getHospSetList(this.current,this.limit,this.searchObj)
                .then(response => {
                    this.list = response.data.records
                    this.total = response.data.total
                })// 请求成功
                .catch(error => {
                    console.log(error)
            })//请求失败
        },
        // 删除医院设置
        removeDataById(id) {
            this.$confirm('此操作将永久删除医院是设置信息,是否继续?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => { //确定执行then方法
                //调用接口
                hospset.deleteHospSet(id)
                .then(response => {
                    //提示
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    //刷新页面
                    this.getList(1)
                })
            })
        },
        // 更改状态
        lockHospSet(id,status) {
            hospset.lockHospSet(id,status)
                .then(response => {
                   this.getList(this.current)
            })
        }

    }
}
</script>
