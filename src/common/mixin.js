import {debounce} from "./utils";

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener: null
    }
  },
  mounted(){
    //监听item中图片加载完成
    const  refresh = debounce(this.$refs.scroll.refresh, 200)

    //对监听的事件进行保存
    this.itemImgListener = () => { refresh() }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}
