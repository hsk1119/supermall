export default {
  addCart(context, payload){
  //这里的context包含{state, commit}
  //payload新添加的商品
  // let oldProduct= null
  // for (let item of this.state.cartList){
  //   if(item.iid === payload.iid){
  //     oldProduct = item
  //   }
  // }
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct){
        context.commit('AddCounter',oldProduct)
        resolve('当前的商品数量+1')
      }
      else {
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('添加了新的商品')
      }
    })
}
}
