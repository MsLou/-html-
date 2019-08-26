<template>
  <div ref="ceil" v-if="data.type == 'Col' || data.type == 'Row'" @mousedown.stop.prevent="clickSelected" :class="ceilClass" :style="ceilStyle">
    <!-- 组件视图 -->
    <Preview v-if="data.component.type" :data="data"></Preview>
    <!-- 添加组件 -->
    <addContent v-if="data.children.length == 0 && !data.component.type"></addContent>
    <!-- 选中状态 -->
    <Selected :isSelect="data.isSelect" :data="data" :refTarget="$refs.ceil"></Selected>
    <!-- 递归模板 -->
    <template v-if="data.type == 'Col'">
      <ceil :data="item" v-for="(item, index) in data.children" :key="index"></ceil>
    </template>
    <template v-else-if="data.type == 'Row'">
      <ceil :data="item" v-for="(item, index) in data.children" :key="index"></ceil>
    </template>
  </div>
</template>
<script>
import Selected from '@/components/selected/selected.vue'
import AddContent from '@/components/addContent/addContent.vue'
import Preview from '@/components/preview/preview.vue'

export default {
  name: 'ceil',
  components: { Selected, AddContent, Preview },
  props: {
      data: Object
  },
  computed: {
    ceilClass () {
      let children = this.data.children,
      type = this.data.type,
      classObj = {}
      if (children.length) {
        let key = children[0].type == 'Row' ? 'direction-row' : 'direction-col'
        classObj[key] = true
      } else {
        // classObj['no-border'] = true
      }

      switch(type) {
        case 'Row':
          classObj['row'] = true;
          break;
        case 'Col':
          classObj['col'] = true;
          break;
      }

      return classObj
    },
    ceilStyle () {
      let css = this.data.css
      if (css.width && this.data.type == 'Col') {
        return {
          width: css.width + 'px',
          flex: 'initial'
        }
      }
      if (css.height && this.data.type == 'Row') {
        return {
          height: css.height + 'px',
          flex: 'initial'
        }
      }
    },
  },
  mounted () {
    this.data.target = this.$refs.ceil
  },
  methods: {
    /**
     * 点击选中单元格
     */
    clickSelected () {
      // if (this.data.isSelect) {
      //   this.$store.commit('setState', state => {
      //     state.selectComponentBo.isShow = false
      //   })
      // }
      this.$store.commit('setSelect', this.data)
      this.$store.commit('setState', state => {
        state.selectComponentBo.isShow = true
      })
      
      this.data.isSelect = true
    },
  },
}
</script>
<style lang="less" scoped>
    .col { position: relative;height: 100%; border-right: 1px solid #ddd;flex: 1;display: flex;height: 100%;
      // flex: 1;
      &.no-border { border: 0; }
    }
    .col-child {  }
    .direction-row { flex-direction: column; }
    .direction-row .row { height: 100%;
      &.no-border { border: 0; }
    }
    // .row:last-child { border-bottom: 0; }
    // .col:last-child { border-right: 0; }

    .row { position: relative;height: 100px;width: 100%;display: flex;border-bottom: 1px solid #ddd; }
    // .row-child { flex: 1; }
</style>


