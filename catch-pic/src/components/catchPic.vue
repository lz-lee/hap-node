<template>
  <div class="m-item" 
    v-loading.fullscreen="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-form :model="picInfo" class="pic-form" label-width="120px">
      <el-form-item label="链接地址">
        <el-input v-model="picInfo.url" placeholder="链接"></el-input>
      </el-form-item>
      <el-form-item label="文件夹名字">
        <el-input v-model="picInfo.filesName" placeholder="文件夹名字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      loading: false,
      picInfo: {
        url: '',
        filesName: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      axios.post('/catchPic', this.picInfo).then(({data}) => {
        if (data.code === 0) {
          this.loading = false
          this.$message.success(data.msg)
          this.picInfo.url = ''
          this.picInfo.filesName = ''
        } else {
          this.$message.error(data.msg)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .m-item{
    width: 50%;
    margin: 0 auto;
    text-align: left;
  }
</style>
