<template>
  <!--<a-spin v-show="true" style="float: top"/>-->
  <div style="overflow: hidden;position: relative">
    <Audio :play="play" :nowVolume="nowVolume" @startPlay="startPlay" :nowPlay="nowPlay" style="position:absolute;z-index: 1;bottom: 0"></Audio>

    <div class="mainContainer" :style="{backgroundImage: 'url(' + bgSrc + ')'}" ref="main">
      <div class="time" v-show="showTime && timeStyle === 0">
        {{ `${nowTime.hours}:${nowTime.minutes}:${nowTime.seconds}` }}
      </div>
      <div class="time" v-show="showTime && timeStyle === 1">
        <div style="margin-bottom: -60px">{{ nowTime.hours }}</div>
        <div style="margin-bottom: -60px">{{ nowTime.minutes }}</div>
        <div style="margin-bottom: -60px">{{ nowTime.seconds }}</div>
      </div>
      <div class="time" v-show="showTime && timeStyle === 2">
        <div style="margin-bottom: -60px">{{ nowTime.hours }}</div>
        <div style="margin-bottom: -60px">{{ nowTime.minutes }}</div>
      </div>
      <div class="controlBtn" ondragstart="return false">
        <div @click="lastSong"><img src="../assets/icon/backward.png" alt="" class="playIcon"></div>
        <div @click="play = !play">
          <img v-if="play" src="../assets/icon/pause.png" alt="" class="playIcon playBtn">
          <img v-else src="../assets/icon/play.png" alt="" class="playIcon playBtn">
        </div>
        <div @click="nextSong"><img src="../assets/icon/forward.png" alt="" class="playIcon"></div>
        <div @click="nowVolume = !nowVolume">
          <img v-if="nowVolume" src="../assets/icon/volume.png" alt="" class="playIcon">
          <img v-else src="../assets/icon/volumeZero.png" alt="" class="playIcon">
        </div>
      </div>
    </div>
    <Setting class="setting" :bgNum="bgNum" @changeBg="changeBg" @changeTime="changeTime" @changeTimeStyle="changeTimeStyle"></Setting>
  </div>
</template>

<script>
import {computed, getCurrentInstance, onMounted, reactive, ref, watch} from "vue";
import Audio from "./Audio.vue";
import Setting from "./Setting.vue";

export default {
  name: "Player",
  components:{Audio,Setting},
  setup(){
    let play = ref(true) //true：正在播放
    let nowVolume = ref(true) //true：不静音
    let bgNum = ref(4)
    let bgSrc = ref('https://prepan.top/lofi/bg/'+ bgNum.value +'.jpg')
    let main = ref(null)
    let nowPlay = ref()
    let audioResourcesMaxNum = getCurrentInstance()?.appContext.config.globalProperties.$audioResourcesMaxNum //服务器总共文件数
    let showTime = ref(false)
    let timeStyle = ref(0)
    let nowTime = reactive({
      hours: '',
      minutes: '',
      seconds: ''
    })

    function changeBg(value){
      bgNum = value
      let img = new Image()
      img.src = 'https://prepan.top/lofi/bg/'+ value +'.jpg'
      img.onload = function (){
        bgSrc.value = 'https://prepan.top/lofi/bg/'+ value +'.jpg'
      }
    }

    function nextSong(){
      if(nowPlay.value === audioResourcesMaxNum){
        nowPlay.value = 0
      }
      else nowPlay.value++
    }

    function lastSong(){
      if(nowPlay.value === 0){
        nowPlay.value = audioResourcesMaxNum
      }
      else nowPlay.value--
    }

    function startPlay(value){
      nowPlay.value = value
    }

    function changeTime(value){
      showTime.value = value
    }

    function changeTimeStyle(value){
      timeStyle.value = value
    }

    onMounted(() => {
      setInterval(() => {
        nowTime.hours = Date().slice(-26,-24)
        nowTime.minutes = Date().slice(-23,-21)
        nowTime.seconds = Date().slice(-20,-18)
      },1000)
    })

    return{
      play,bgSrc,bgNum,changeBg,startPlay,main,nowPlay,audioResourcesMaxNum,nextSong,lastSong,nowVolume,nowTime,showTime,changeTime,timeStyle,changeTimeStyle,nowTime
    }

  }
}
</script>

<style scoped>
  .mainContainer{
    height: 100vh;
    background-size: cover;
    background-position: 50%;
    position: relative;
    transition: 0.2s all;
  }
  .controlBtn{
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 370px;
    bottom: 10vh;
    display: flex;
    align-items: center;
  }
  /*三个按钮*/
  .playIcon{
    width: 50px;
    margin: 0 30px;
  }
  /*播放暂停按钮*/
  .playBtn{
    width: 90px;
  }
  .setting{
    position: absolute;
    top: 10vh;
    right: -392px;
    transition: 1s all;
    opacity: 0.5;
  }
  .setting:hover{
    right: -40px;
    transition: 1s all;
    opacity: 1;
  }
  .time{
    padding-top: 10vh;
    text-align: center;
    font-size: 110px;
    color: white;
    z-index: 1;
  }
</style>
