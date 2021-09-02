<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>

  #tab-bar{
  /*水平*/
  display: flex;

  /*背景颜色*/
  background-color: #f6f6f6;

  /*位置放到下面*/
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  /*阴影,x向右偏移，y向下偏移，阴影大小，颜色*/
  box-shadow: 0 -1px 1px rgba(100,100,100,0.2);
  }


</style>
