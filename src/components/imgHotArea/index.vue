<template>
    <div class="imgHotArea">
      <el-form ref="form" :model="form" label-width="80px">
        <el-upload
          class="avatar-uploader"
          action="http://maliaos.com/admin/upload/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="editBo.value" :src="editBo.value" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form-item label="展示渠道">
          <el-checkbox-group v-model="editBo.bizType">
            <el-checkbox label="1">卖家版</el-checkbox>
            <el-checkbox label="2">买家版</el-checkbox>
            <el-checkbox label="0">微信H5</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="展示时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="editBo.startTime" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="editBo.endTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
export default {
  name: 'imgHotArea',
  props: {
    editBo: Object
  },
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.editBo.value = `//maliaos.com/uploads/${res.url}`;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
}
</script>
<style lang="less" scoped>
  .imgHotArea { text-align: left; }
  .avatar-uploader {
    border: 1px dashed #ddd;
    min-height: 178px;
    display: inline-block;
    position: relative;
    margin-bottom: 10px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .line { text-align: center; }
  .avatar {
    width: 178px;
    display: block;
  }
</style>


