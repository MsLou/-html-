<template>
  <div class="prevew-img">
    <div class="preview-center">
      <img v-if="data.component.value" :src="data.component.value" alt="" ref="imgHotArea">
      <p v-else>请上传图片</p>
      
    </div>
  </div>
</template>
<script>
export default {
    name: 'prevewImg',
    props: {
      data: Object,
    },
    watch: {
      'data.component.value' (val) {
        this.$nextTick(() => {
          // console.log(this.$refs.imgHotArea)
          this.$refs.imgHotArea.onload = () => {
            console.log(this.$refs.imgHotArea.offsetHeight)
            this.data.css.height = this.$refs.imgHotArea.offsetHeight
          }
        })
      }
    },
}
</script>
<style lang="less" scoped>
  .prevew-img {
    overflow: hidden;width: 100%;height: 100%;position: relative;display: flex;
    .preview-center {
      width: 100%;
      img { width: 100%;display: block; }
      p { text-align: center;height: 100%;display: flex;align-items: center;justify-content: center;margin: 0; }
    }
  }
</style>


