<template>
  <div class="container" ondragstart="return false">
    <!--调整背景图片-->
    <div class="adBg">
      <img @click="bgNumDec" src="../assets/icon/arrowLeft.png" alt="" class="adBgArrow">
      <img :src="'https://prepan.top/lofi/bg/'+ bgNum +'.jpg'" alt="" class="adBgImg">
      <img @click="bgNumInc" src="../assets/icon/arrowRight.png" alt="" class="adBgArrow">
    </div>
    <!--控制时间显示-->
    <div class="time">
      <img src="../assets/icon/time.png" alt="" :class="{'stateClose': !timeShow, 'stateOpen': timeShow}" @click="changeTimeShow">
      <img src="../assets/icon/setting.png" alt="" style="width: 30px;right: 140px;top: 227px" @click="showTimeStyleSelect = !showTimeStyleSelect">
    </div>
    <!--控制时间样式-->
    <div class="timeStyleSelect" v-show="showTimeStyleSelect">
      <h2 :class="{'timeStyleSelected': timeStyle===0}" @click="chooseTimeStyle(0)">样式一</h2>
      <h2 :class="{'timeStyleSelected': timeStyle===1}" @click="chooseTimeStyle(1)">样式二</h2>
      <h2 :class="{'timeStyleSelected': timeStyle===2}" @click="chooseTimeStyle(2)">样式三</h2>
    </div>
    <!--控制下雨白噪音-->
    <div>
      <img src="../assets/icon/rain.png" alt="" class="rainIcon" @click="rainState = !rainState" :class="{'stateClose': !rainState, 'stateOpen': rainState}">
      <img src="../assets/icon/setting.png" alt="" class="rainSetting" @click="showRainVolControl = !showRainVolControl">
      <audio loop src="https://prepan.top/mp3resource/rainSound.mp3" ref="rainAudio"></audio>
      <div class="rainSettingDiv" v-show="showRainVolControl">
        <img src="../assets/icon/volumeInc.png" alt="" class="volumeControl" @click="rainVol('Inc')">
        <img src="../assets/icon/volumeDec.png" alt="" class="volumeControl" @click="rainVol('Dec')">
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref, watch, getCurrentInstance} from "vue";
import { message } from 'ant-design-vue';


export default {
  name: "Setting",
  props:['bgNum'],
  emits: ['changeBg', 'changeTime','changeTimeStyle'],
  setup(props,context){
    let maxBgNum = getCurrentInstance()?.appContext.config.globalProperties.$maxBgNum
    let bgNum = ref(props.bgNum)
    let timeShow = ref(false)
    let showTimeStyleSelect = ref(false)
    let timeStyle = ref(0)
    let rainState = ref(false)
    let rainAudio = ref(null)
    let showRainVolControl = ref(false)
    let rainAudioVol = 0

    function bgNumDec(){
      bgNum.value===0?bgNum.value = maxBgNum:bgNum.value--
      context.emit('changeBg', bgNum.value)
    }

    function bgNumInc(){
      bgNum.value > maxBgNum-1?bgNum.value=0:bgNum.value++
      console.log(maxBgNum, bgNum.value)

      context.emit('changeBg', bgNum.value)
    }

    function changeTimeShow(){
      context.emit('changeTime', !timeShow.value)
      timeShow.value = !timeShow.value
    }
    function chooseTimeStyle(data){
      timeStyle.value = data
      context.emit('changeTimeStyle', timeStyle.value)
    }
    function rainVol(data){
      if(data === 'Inc'){
        if(rainAudio.value.volume >= 0.9){
          rainAudio.value.volume = 1
          message.warning('已经最大音量啦！')
        }else{
          rainAudio.value.volume+=0.1
        }
      }else if (data === 'Dec'){
        if(rainAudio.value.volume <= 0.1){
          rainAudio.value.volume = 0
          message.warning('已经最小音量啦！');
        }else{
          rainAudio.value.volume-=0.1
        }
      }
    }

    watch(() => props.bgNum, (newValue) => {
      bgNum = newValue
    })

    watch(rainState,(newValue) => {
      if(newValue){
        rainAudio.value.play()
      }else{
        rainAudio.value.pause()
      }
    })

    return{
      bgNum,bgNumDec,bgNumInc,changeTimeShow,timeShow,showTimeStyleSelect,timeStyle,chooseTimeStyle,rainState,rainAudio,showRainVolControl,rainVol
    }
  }
}
</script>

<style scoped>
.container{
  background: url('../assets/setting.png') no-repeat;
  width: 457px;
  height: 537px;
  position: relative;
}
.adBg{
  display: flex;
  align-items: center;
  position: absolute;
  top: 40px;
  right: 66px;
}
.adBgImg{
  width: 200px;
  height: 100px;
}
.adBgArrow{
  width: 50px;
  height: 40px;
  opacity: 0.9 !important;
}
.time img{
  width: 80px;
  position: absolute;
  right: 175px;
  top: 177px;
}
.stateClose{
  opacity: 0.3;
}
.stateOpen{
  opacity: 1;
}
.timeStyleSelect{
  background-color: rgba(248, 248, 248, 0.3);
  position: absolute;
  width: 230px;
  top: 530px;
  right: 100px;
  text-align: center;
}
.timeStyleSelect h2{
  color: white;
  padding-top: 10px;
}
.timeStyleSelect h2:hover{
  cursor: pointer;
}
.timeStyleSelected{
  text-shadow: 2px 2px 6px #000;
}
.rainIcon{
  position: absolute;
  width: 85px;
  top: 300px;
  right: 170px;
}
.rainSetting{
  position: absolute;
  width: 30px;
  top: 350px;
  right: 140px;
}
.rainSettingDiv{
  position: absolute;
  width: 230px;
  height: 80px;
  top: 530px;
  right: 104px;
  background-color: rgba(248, 248, 248, 0.3);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.volumeControl{
  width: 50px;
  height: 50px;
}
</style>
