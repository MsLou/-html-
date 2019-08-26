<template>
  <div class="home">
    <div class="controller">
      <el-button @click="checkCeil('row')" size="small">增加行</el-button>
      <el-button type="primary" @click="checkCeil('col')" size="small">增加列</el-button>
    </div>
    <!-- 初始化布局弹框 -->
    <directionDialog :directionBo="directionBo"></directionDialog>
    <Floor :data="layout" class="floor"></Floor>
    <div class="container" :class="ceilClass" ref="container" @mousedown="clickSelected">
      <Selected :isSelect="layout.isSelect" :data="layout" :refTarget="$refs.container"></Selected>
      <Ceil :data="item" v-for="(item, index) in layout.children" :key="index"></Ceil>
    </div>
    <AddForm :addFormBo="addFormBo" @addCeil="addCeil"></AddForm>
    <!-- 组件选择器 -->
    <SelectComponent :selectBo="$store.state.selectComponentBo"></SelectComponent>
    <!-- 遮罩层 -->
    <div class="home-mask" @click.stop.prevent="maskClick"></div>
  </div>
</template>

<script>
import Selected from '@/components/selected/selected.vue'
import Floor from '@/components/floor/floor.vue'
import Ceil from '@/components/ceil/ceil.vue'
import AddForm from '@/components/addForm/addForm.vue'
import SelectComponent from '@/components/selectComponent'
import directionDialog from '@/components/directionDialog'

export default {
  name: 'home',
  components: {
    Selected, Floor, Ceil, AddForm, SelectComponent, directionDialog
  },
  computed: {
    ceilClass () {
      let children = this.layout.children,
      classObj = {}
      if (children.length) {
        let key = children[0].type == 'Row' ? 'direction-row' : 'direction-col'
        classObj[key] = true
      }

      return classObj
    },
  },
  created () {

  },
  data () {
    return {
      addFormBo: { // 添加弹框属性
        isShow: false, // 是否显示
        addType: '', // 添加类型
      },
      layout: {
        type: 'container',
        css: {
        },
        component: {},
        isSelect: false, // 是否选中
        children: []
      },
      directionBo: { // 布局弹框
        isShow: false,
        form: {},
      },
    }
  },
  methods: {
    /**
     * 单机遮罩层
     */
    maskClick () {
      this.$store.commit('setState', state => {
        state.selectComponentBo.isShow = false
        state.currSelectBo.data.isSelect = false
      })
    },
    /**
     * 添加单元格
     */
    addCeil (data, type) {
      for(let i = 0, j = data.addNumber; i < j; i++) {
        type == 'row' ? this.addRow() : this.addCol()
      }
    },
    /**
     * 点击选中单元格
     */
    clickSelected () {
        this.$store.commit('setSelect', this.layout)
        this.layout.isSelect = true
    },
    /**
     * 计算宽高
     */
    countWidHei (style, list, initVal) {
      switch(style) {
        case 'width':
          let onlyWid = initVal / (list.length == 1 ? 2 : list.length)
          list.forEach(item => {
            item.css.width = onlyWid
          })
          break;
        case 'height':
          let onlyHei = initVal / (list.length == 1 ? 2 : list.length)
          list.forEach(item => {
            item.css.height = onlyHei
          })
      }
    },
    /**
     * 显示添加弹框
     * @param type 添加类型，行或者列
     */
    showAddForm (type) {
      this.addFormBo.addType = type
      this.addFormBo.isShow = true
    },
    /**
     * 校验
     */
    checkCeil (type) {
      let { state } = this.$store
      let target = state.currSelectBo.data.type ? state.currSelectBo.data : this.layout
      if (target.component.type) {
        this.$confirm('存在组件，无法添加，是否清空组件', '提示', {
          confirmButtonText: '清空',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          target.component = {}
          this.showAddForm(type)
        })
      } else {
        this.showAddForm(type)
      }
    },
    /**
     * 添加行
     */
    addRow () {
      let { state } = this.$store
      let target = state.currSelectBo.data.type ? state.currSelectBo.data : this.layout,
      data = this.$getData('Row')
      
      if (target.children[0] && target.children[0].type != 'Row') {
        this.$message.error('存在列，无法添加!')
        return;
      }
      target.children.push(data)
      this.$nextTick(() => {
        this.countWidHei('height', target.children, data.target.parentNode.offsetHeight)
      })
        
    },
    /**
     * 添加列
     */
    addCol () {
      let { state } = this.$store
      let target = state.currSelectBo.data.type ? state.currSelectBo.data : this.layout,
      data = this.$getData('Col')

      if (target.children[0] && target.children[0].type != 'Col') {
        this.$message.error('存在行，无法添加!')
        return;
      }
      target.children.push(data)
      this.$nextTick(() => {
        this.countWidHei('width', target.children, data.target.parentNode.offsetWidth)
      })
    },
  },
}
</script>
<style lang="less" scoped>
  .container {
    position: absolute;
    width: 375px;
    height: 375px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // border: 1px solid #ddd;
    text-align: left;
    background-color: #fff;
    display: flex;
    &.direction-row { flex-direction: column; }
    &.direction-row .row { height: 100%; }
    // & > * { flex: 1; }
  }
  .home-mask { position: absolute;left: 0;top: 0;width: 100%;height: 100%;background-color: #eee;z-index: -1; }
  .floor {
    position: absolute;right: 20px;top: 50%;transform: translate(0, -50%);
  }
</style>

