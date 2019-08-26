<template>
  <div class="direction-dialog">
    <el-dialog title="选择你的布局方式" :visible.sync="addFormBo.isShow" width="380px">
      <el-form :model="form">
        <el-form-item label="排列方式" :label-width="formLabelWidth">
          <el-radio-group v-model="form.direction">
            <el-radio :label="1">横向</el-radio>
            <el-radio :label="2">纵向</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="添加数量" :label-width="formLabelWidth">
          <el-input-number v-model="form.addNumber" :min="1" :max="5"></el-input-number>
        </el-form-item>
        <el-form-item label="每个宽度" :label-width="formLabelWidth">
          <el-checkbox v-model="form.isAutoWid">自动</el-checkbox>
          <el-input-number v-model="form.width" :max="375" :controls="false" @change="widthChange"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormBo.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'directionDialog',
  props: {
    directionBo: Object,
  },
}
</script>
<style lang="less" scoped>

</style>


