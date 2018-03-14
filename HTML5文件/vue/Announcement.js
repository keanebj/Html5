export default {
    data() {
        return {
            searchValue: '',
            searchType: '',
            searchTypeList: [{
                value: 'createUser',
                label: '按发布人'
            }, {
                value: 'title',
                label: '按标题'
            }],
            createTimeStart: '',
            createTimeEnd: '',
            snnouncementList: [],
            currentPage: 1,
            total: 0,
            pageSize: 20
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            let params = {
                createTimeEnd: this.createTimeEnd,
                createTimeStart: this.createTimeStart,
                pageNo: this.currentPage - 1,
                [this.searchType]: this.searchValue
            }
            this.$http.post('/announcement/getList', params).then(data => {
                if (data.data.state == 0) {
                    this.snnouncementList = data.data.data.snnouncementList;
                    this.total = data.data.data.count;
                } else {
                    this.$message({
                        type: 'error',
                        message: data.data.msg
                    })
                }
            }).catch(err => {
                console.error(err)
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.loadData();
        },
        change(id) {
            this.$router.push({ name: 'ChangeAnnouncement', params: { id: id } });
        },
        remove(id, index) {
            this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post('/announcement/deleteOrUpperFrame', {
                    id: id,
                    isDelete: 1
                }).then(data => {
                    if (data.data.state == 0) {
                        this.snnouncementList.splice(index, 1);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: data.data.message
                        })
                    }
                }).catch(err => {
                    console.error(err)
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        downShelf(id, index) {
            this.snnouncementList[index].upperFrame == 1 ? this.snnouncementList[index].upperFrame = 0 : this.snnouncementList[index].upperFrame = 1;
            this.$http.post('/announcement/deleteOrUpperFrame', {
                id: id,
                upperFrame: this.snnouncementList[index].upperFrame
            }).then(data => {
                if (!data.data.state == 0) {
                    this.$message({
                        type: 'error',
                        message: data.data.message
                    })
                }
            }).catch(err => {
                console.error(err)
            })
        },
        goCheck(val) {
        	console.log(val)
            this.$router.push({ name: 'CheckAnnouncement', params: { id: id, type: 'list' } });
        },
        add() {
            this.$router.push({ name: 'AddAnnouncement' })
        }
    },


}