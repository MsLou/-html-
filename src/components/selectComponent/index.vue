<template>
  <div class="select-component" v-show="selectBo.isShow" :class="[selectBo.isShow ? 'animated' : '', ]">
    <div class="inner">
      <h4>{{currSelectBo.component.type ? '编辑' : '添加'}}组件
        <el-button class="replace-btn" @click="cancelComponent" type="text" v-if="currSelectBo.component.type">更换组件</el-button>
      </h4>
      <div class="component-warp" v-if="currSelectBo.component.type">
        <component
          :is="currSelectBo.component.type"
          :editBo="currSelectBo.component">
        </component>
      </div>
      <div class="preview-wrap" v-else>
        <el-row>
          <el-col :span="8" v-for="(item, index) in [1]" :key="index">
            <div @click="addComponent('imgHotArea')">
              <i class="el-icon-picture-outline"></i>
              <p>图片组件</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import imgHotArea from '@/components/imgHotArea'

export default {
    name: 'selectComponent',
    components: { imgHotArea },
    props: {
      selectBo: Object
    },
    data () {
      return {}
    },
    computed: {
      currSelectBo () {
        let data = this.$store.state.currSelectBo.data
        if (data.type && data.type != 'container') {
          return data
        }
        return {
          component: {}
        }
      },
    },
    methods: {
      /**
       * 添加组件
       */
      addComponent (type) {
        let { children } = this.currSelectBo
        if (!children) {
          this.$message.error('存在行或者列，无法添加组件')
          return
        }
        if (children && children.length > 0) {
          this.$message.error('存在行或者列，无法添加组件')
          return
        }
        let data = this.$getData(type).tempObj
        this.$store.commit('setState', state => {
          state.currSelectBo.data.component = data
        })
      },
      /**
       * 取消组件
       */
      cancelComponent () {
        this.$store.state.currSelectBo.data.component = {}
      },
    },
}
</script>
<style lang="less" scoped>
  .select-component {
    background-color: #fff;position: fixed;top: 50%;left: 100px;padding: 10px;border-radius: 6px;box-shadow: 3px 3px 3px #ddd;
    transform: translate(0, -80px);max-height: 90%;overflow: auto;transition: all .3s;
    .component-warp { width: 480px; }
    .preview-wrap { width: 320px; }
    i { font-size: 34px; }
    p { margin: 0; }
    .replace-btn { position: absolute;right: 20px;top: 4px; }
    .el-col { cursor: pointer; }
    h4 { text-align: left;padding: 4px 10px 10px 4px;color: #999;border-bottom: 1px solid #eee;margin: 0;margin-bottom: 15px;font-size: 14px; }
    &.animated { animation: .3s playUp forwards; }
    @keyframes playUp {
      0% { transform: translate(0, -58%);opacity: 0; }
      100%  { transform: translate(0, -50%);opacity: 1; }
    }
  }
</style>


