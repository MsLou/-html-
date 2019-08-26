<template>
    <div class="floor">
        <FloorItem :data="data"></FloorItem>
    </div>
</template>
<script>
import FloorItem from './floor-item'

export default {
    components: {
        FloorItem
    },
    props: {
        data: Object
    },
}
</script>
<style lang="less" scoped>
    .floor { background-color: #fff;min-width: 120px;padding: 10px 10px 10px 0;max-height: 500px;overflow: auto }
</style>


