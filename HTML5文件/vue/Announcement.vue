<template>
    <div>
        <el-row style="height:36px;border-bottom:1px solid #ccc; margin-bottom:20px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>运营管理</el-breadcrumb-item>
                <el-breadcrumb-item>通知管理</el-breadcrumb-item>
                <el-breadcrumb-item>公告管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>
        <el-form size="small">
            <div class="from-box">
                <el-form-item>
                    <el-select clearable v-model="searchType" placeholder="请选择" style="width:150px">
                        <el-option v-for="item in searchTypeList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input :disabled="searchType==''" clearable style="width:180px;margin-right:40px;" v-model="searchValue" >
                    </el-input>
                    按创建时间查询：
                    <el-date-picker v-model="createTimeStart" type="date" value-format="yyyy-MM-dd">
                    </el-date-picker> 至
                    <el-date-picker v-model="createTimeEnd" type="date"  value-format="yyyy-MM-dd">
                    </el-date-picker>&nbsp;&nbsp;&nbsp;
                    <el-button type="primary" size="small" @click="add">添加公告</el-button>
                    <el-button type="primary" size="small" @click="loadData">查询</el-button>
                </el-form-item>
                <el-table :data="snnouncementList" border style="width: 100%" size="mini">
                    <el-table-column prop="date" label="ID" width="50px">
                        <template slot-scope="scope">{{(currentPage-1)*pageSize+scope.$index+1}}</template>
                    </el-table-column>
                    <el-table-column label="标题" width="180">
                        <template slot-scope="scope">
                            <el-button type="text" @click="goCheck(scope.row)">{{scope.row.title}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="发布时间">
                    </el-table-column>
                    <el-table-column prop="createUser" label="发布人">
                    </el-table-column>
                    <el-table-column prop="updateUser" label="最后操作人">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="change(scope.row.id)" type="text">修改</el-button>
                            <el-button size="mini" @click="remove(scope.row.id,scope.$index)" type="text">删除</el-button>
                            <el-button size="mini" @click="downShelf(scope.row.id,scope.$index)" type="text">{{scope.row.upperFrame==1?'下架':'上架'}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-form>
    </div>
</template>
<script src="./Announcement.js"></script>
<style lang="scss" scoped="" type="text/css" src="./Announcement.scss"></style>
