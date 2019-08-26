<template>
    <div class="floor-item">
        <div class="floor-content" @click="clickSelect(data)" :class="floorPClass">
            <p>{{floorNumber}}
                {{returnName(data)}}
                {{returnName(data.component)}}
            </p>
        </div>
        <template v-if="data.children && data.children.length">
            <floorItem v-for="(item, index) in data.children" :key="index" :data="item" :floorName="floorNumber" :floorIndex="index" />
        </template>
    </div>
</template>
<script>
export default {
    name: 'floorItem',
    props: {
        data: Object,
        floorName: {
            type: String,
            default: '',
        },
        floorIndex: {
            type: Number,
            default: 0
        },
    },
    computed: {
        floorPClass () {
            let isSelect = this.data.isSelect
            this.$store.commit('setState', state => {
                state.currSelectBo.floorName = this.floorNumber
            })
            return { 'active': isSelect }
        }
    },
    created () {
        if (this.data.type == 'Row' || this.data.type == 'Col') {
            this.floorNumber = (this.floorName ? (this.floorName + '-') : '') + (this.floorIndex + 1)
        }
    },
    data () {
        return {
            floorNumber: '',
        }
    },
    methods: {
        returnName (data) {
            switch(data.type) {
                case 'Row':
                    return '行';
                case 'Col':
                    return '列';
                case 'container':
                    return '容器'
                case 'imgHotArea':
                    return '图片'
            }
        },
        /**
         * 选中单元格
         */
        clickSelect () {
            if (this.data.isSelect) return;
            this.data.isSelect = true
            this.$store.commit('setSelect', this.data)
            this.$store.commit('setState', state => {
                state.selectComponentBo.isShow = true
            })
        },
    },
}
</script>
<style lang="less" scoped>
    .floor-item { margin-left: 10px;
        p { margin: 0; }
        .floor-content { height: 40px;display: flex;align-items: center;cursor: pointer;background-color: #f8f8f8;margin-bottom: 6px;padding-left: 6px;
            &.active { background-color: #0486fe;color: #fff; }
        }
    }
</style>


