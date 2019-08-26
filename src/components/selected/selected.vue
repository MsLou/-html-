<template>
    <div class="selected" v-if="isSelect">
        <div class="selected-left" @mousedown="drag($event, 'left')"></div>
        <div class="selected-top"></div>
        <div class="selected-bottom">
            <span v-if="data.type == 'Row'" @mousedown="drag($event, 'bottom')"></span>
        </div>
        <div class="selected-right">
            <span v-if="data.type == 'Col'" @mousedown="drag($event, 'right')"></span>
        </div>
    </div>
</template>
<script>
class Drag {
    constructor (target, refTarget, position, data, init) {
        this.data = data
        this.data.css = {
            width: refTarget.offsetWidth,
            height: refTarget.offsetHeight,
        }
        this.moveX = refTarget.offsetWidth
        this.moveY = refTarget.offsetHeight
        this.initX = init.x
        this.initY = init.y
        this.target = target
        this.position = position
        this.refTarget = refTarget
        this.max = this.countMax()
        this.event()
    }
    event () {
        let that = this
        document.addEventListener('mousemove', move, false)
        document.addEventListener('mouseup', up, false)

        function move (eve) {
            eve.preventDefault()
            that.move(eve)
            return false
        }

        function up () {
            document.removeEventListener('mousemove', move)
            document.removeEventListener('mouseup', up)
            that.up()
        }
    }
    move (eve) {
        switch(this.position) {
            case 'right':
                let x = eve.clientX - this.initX + this.moveX
                this.data.css.width = x > this.max ? this.max : x
                break;
            case 'bottom':
                let y = eve.clientY - this.initY + this.moveY
                this.data.css.height = y > this.max ? this.max : y
                break;
        }
        
    }
    up () {
        
    }
    countMax () {
        let count = 0,
            children = [...this.refTarget.parentNode.children]
        children.forEach(item => {
            switch(this.position) {
                case 'right':
                    
                    count += item.offsetWidth
                    break;
                case 'bottom':
                    count += item.offsetHeight
                    break;
            }
        })

        switch(this.position) {
            case 'right':
                let totalWid = this.refTarget.parentNode.offsetWidth
                return totalWid - count + this.moveX
            case 'bottom':
                let totalHei = this.refTarget.parentNode.offsetHeight
                return totalHei - count + this.moveY
        }
    }
}

export default {
    name: 'selected',
    props: {
        isSelect: Boolean,
        data: Object,
        refTarget: HTMLDivElement
    },
    methods: {
        /**
         * 拖拽对象
         */
        drag (event, position) {
            new Drag(event.target, this.refTarget, position, this.data, {
                x: event.clientX,
                y: event.clientY
            })
        },
    },
}
</script>
<style lang="less" scoped>
    .selected {
        > * { background-color: #999;z-index: 10; }
        .selected-left {
            position: absolute;left: 0;top: 0;width: 2px;height: 100%;
            // cursor: ew-resize;
        }
        .selected-top {
            position: absolute;left: 0;top: 0;width: 100%;height: 2px;
            // cursor: ns-resize;
        }
        .selected-bottom {
            position: absolute;bottom: 0;left: 0;width: 100%;height: 2px;
            span {
                display: block;width: 8px;height: 8px;position: absolute;top: 50%;transform: translate(-50%, -50%);background-color: #999;border-radius: 50%;left: 50%;cursor: ns-resize;z-index: 10;
            }
        }
        .selected-right {
            position: absolute;right: 0;top: 0;width: 2px;height: 100%;
            span {
                display: block;width: 8px;height: 8px;position: absolute;top: 50%;transform: translate(-50%, -50%);background-color: #999;border-radius: 50%;left: 50%;cursor: ew-resize;z-index: 10;
            }
        }
    }
</style>


