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
        <!-- banner列表 -->
        <el-table
        :data="list"
        stripe
            style="width: 100%">

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
            total:0
        }
    },
    created() {
        this.getList()
    },
    methods:{
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
        }
    }
}
</script>
