<template>
  <div class="preview">
    <component
      :is="data.component.type"
      :data="data">
    </component>
  </div>    
</template>
<script>
import imgHotArea from '@/components/imgHotArea/previewBoImgHotArea.vue'

export default {
  name: 'preview',  
  components: { imgHotArea },
  props: {
    data: Object,
  },
}
</script>
<style lang="less" scoped>
  .preview { width: 100%;height: 100%; }
</style>

