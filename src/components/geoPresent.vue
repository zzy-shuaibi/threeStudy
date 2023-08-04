<template>
  <div class="home">
    <div class="title">distance:{{info.distance.toFixed(2)}}</div>
    <div class="content">
      pointX:{{info.object.position.x.toFixed(2)}}<br/>
      pointY:{{info.object.position.y.toFixed(2)}}<br/>
      pointZ:{{info.object.position.z.toFixed(2)}}
    </div>
  </div>
</template>

<script>
// import { watch } from 'vue'
export default {
  props:{
    info:{
      default:{
        distance:'一个物品'
      }
    }
  },
  // watch:{
  //   info:{
  //     // deep:true,
  //     handler(newValue,oldValue){
  //       console.log(oldValue,newValue)
  //     } 
  //   }
  // }
}
</script>

<style lang="less" scoped>
.home{
  width: 250px;
  height: 250px;
  background: white;
  border-radius: 15px;
  margin: 15px;
  text-align: center;
  .title{
    font-size: 20px;
    font-weight: 600;
  }
  .content{
    margin-top: 30px;
  }
}

</style>