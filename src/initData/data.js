import Vue from 'vue'

const DATA = {
    Row: {
        type: 'Row',
        css: {
            width: null,
            height: null,
        },
        component: {},
        isSelect: false, // 是否选中
        children: [],
    },
    Col: {
        type: 'Col',
        css: {
            width: null,
            height: null,
        },
        component: {},
        isSelect: false, // 是否选中
        children: [],
    },
    imgHotArea: {
        tempObj: {
            type: 'imgHotArea',
            value: '', // 图片地址
            bizType: ['1', '2', '0'],
            startTime: '',
            endTime: '',
        },
    },
    initData (type) {
        return JSON.parse(JSON.stringify(DATA[type]))
    },
}

export default function install () {
    Vue.prototype.$getData = DATA.initData
}