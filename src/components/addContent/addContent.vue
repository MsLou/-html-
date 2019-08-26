<template>
    <div class="add-content">
        <el-button icon="el-icon-plus" circle></el-button>
    </div> 
</template>
<script>
import SelectComponent from '@/components/selectComponent'

export default {
    name: 'addContent',
    components: { SelectComponent },
    data () {
        return {
            
        }
    },
}
</script>
<style lang="less" scoped>
    .add-content { position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%); }
</style>


