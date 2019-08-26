import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currSelectBo: { // 当前选中单元格数据
      data: {},     // 目标数据
      target: null, // 目标节点
      floorName: '',// 楼层名称
    },
    selectComponentBo: {
        isShow: false,
    },
  },
  mutations: {
    setSelect (state, data) {
      if (state.currSelectBo.data) {
        state.currSelectBo.data.isSelect = false
      }
      state.currSelectBo.data = data
      // state.currSelectBo.target = target
    },
    setState (state, callback) {
      callback ? callback(state) : null
    }
  },
  actions: {

  }
})
