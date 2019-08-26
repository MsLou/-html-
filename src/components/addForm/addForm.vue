<template>
    <el-dialog title="添加列" :visible.sync="addFormBo.isShow" width="380px">
        <el-form :model="form">
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
</template>
<script>
export default {
    name: 'addForm',
    props: {
        addFormBo: Object
    },
    data () {
        return {
            form: {
                addNumber: 1,
                width: 0,
                isAutoWid: true, // 宽度自动
            },
            formLabelWidth: '120px'
        }
    },
    methods: {
        widthChange () {
            if (this.form.width > 0) {
                this.form.isAutoWid = false
            } else {
                this.form.isAutoWid = true
            }
        },
        /**
         * 添加保存
         */
        add () {
            this.$emit('addCeil', this.form, this.addFormBo.addType)
            this.addFormBo.isShow = false
        }
    },
}
</script>
<style lang="less" scoped>
    
</style>


