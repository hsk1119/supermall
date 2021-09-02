<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <Scroll class="content"
            ref="scroll"
            :probeType="3"
            @scroll="contentScroll">
      <DetailSwiper :top-images="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"/>
      <DetailShopInfo :shop="shop"/>
      <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <DetailParamInfo ref="params"  :param-info="paramInfo"/>
      <DetailCommentInfo  ref="comment" :comment-info="commentInfo"/>
      <GoodsList ref="recommend" :goods="recommends"/>
    </Scroll>
    <DetailBottomBar @addToCart="addToCart"/>
    <BackTop @click.native="backClick" v-show="isShowBackTop"/>
<!--    <Toast :message="message" :show="show" ></Toast>-->
  </div>
</template>

<script>

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
// import Toast from "components/common/toast/Toast";

import {getDetail, Goods, Shop, GoodsParam, getRecommend}  from "network/detail";
import {debounce} from "common/utils";
import {itemListenerMixin} from "common/mixin";

import BackTop from "components/content/backTop/BackTop";

import {mapActions} from 'vuex';


export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    // Toast
  },
  data(){
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
      isShowBackTop: false,
      // message: '',
      // show: false
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    //2.请求详情数据
    getDetail(this.iid).then(res =>{
      // 获取顶部的图片轮播数据
      const data =  res.result
      // console.log(data);
      this.topImages = data.itemInfo.topImages
      //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //保存商品详情数据
      this.detailInfo = data.detailInfo;

      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //获取评论信息
      if (data.rate.cRate !== 0 ){
        this.commentInfo = data.rate.list[0]
      }
    })

    //3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })

    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    },200)


  },
  methods:{
    ...mapActions(['addCart']),
    imageLoad(){
      this.$refs.scroll.refresh()
      this.getThemeTopYs()
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0, - this.themeTopYs[index], 500)
    },
    contentScroll(position){
      //顶部标签的联动效果
      const positionY = -position.y
      let length = this.themeTopYs.length
      for (let i = 0; i < length; i++){
        if(this.currentIndex !== i &&((i < length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
          (i === length -1 && positionY >= this.themeTopYs[i])))
        { this.currentIndex = i
          console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      //回到顶部
      this.isShowBackTop = - position.y > 1000
    },
    backClick(){
      //x,y,返回时间
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    addToCart(){
      //1、获取购物车需要的信息
      const product ={}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      //2. 物品加入购物车
      // this.$store.commit('addCart', product)
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
      this.addCart(product).then(res => {
        // this.show = true
        // this.message = res
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // }, 1500)
        this.$toast.show(res, 2000)
      })

    },

  },
  mixins: [itemListenerMixin],
  mounted() {
  },
  //由于detail没有在keep-alive中进行缓存，因此使用destroyed，不用deactivated
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  }

}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }

  .content{
    height: calc(100% - 44px - 49px);
  }

</style>
