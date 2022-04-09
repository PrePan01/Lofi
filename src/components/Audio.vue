<template>
  <div style="position: relative">
    <audio
        ref="audio"
        :oncanplay="getData"
        :onended="end"
    >
    </audio>

    <div class="playLine" :style="{'width' : currentTime/audioDuration*100 + 'vw'}">

    </div>
  </div>
</template>

<script>
import {onMounted, ref, watch, getCurrentInstance} from "vue";

export default {
  name: "Audio",
  props: ['play','nowPlay','nowVolume'],
  emits: ['startPlay'],
  setup(props,context){
    let audio = ref(null)
    let audioDuration = ref(0)  // 音频时间
    let currentTime = ref(0)  // 音频当前播放时间
    let nowPlay=ref()
    let audioResourcesMaxNum = getCurrentInstance()?.appContext.config.globalProperties.$audioResourcesMaxNum //服务器总共文件数
    let originVol


    function getData(){
      audioDuration.value = audio.value.duration
      setInterval(() => {
        currentTime.value = audio.value.currentTime
      },100)
    }

    function end(){
      if(nowPlay === audioResourcesMaxNum){
        nowPlay = 0
        audio.value.src = 'https://prepan.top/mp3resource/'+ nowPlay + '.mp3'
      }
      else {
        nowPlay ++
        audio.value.src = 'https://prepan.top/mp3resource/'+ nowPlay + '.mp3'
      }
    }

    onMounted(() => {
      //自动播放
      audio.value.autoplay = true
      //获取开始播放时音量
      originVol = audio.value.volume
      nowPlay = Math.ceil(Math.random()*audioResourcesMaxNum)
      audio.value.src = 'https://prepan.top/mp3resource/'+ nowPlay + '.mp3'
      context.emit('startPlay', nowPlay)
    })

    watch(() => props.play,(newValue) => {
      newValue ?audio.value.play():audio.value.pause()
    })

    watch(() => props.nowVolume,(newValue) => {
      !newValue ?audio.value.volume = 0:audio.value.volume = originVol
      console.log(newValue)
    })

    watch(() => props.nowPlay,(newValue) => {
      audio.value.src = 'https://prepan.top/mp3resource/'+ newValue + '.mp3'
      console.log(props.nowPlay)
    })

    return {
      audio,audioDuration,getData,nowPlay,currentTime,end
    }
  }
}
</script>

<style scoped>
.playLine{
  height: 1px;
  background-color: #fff;
}
</style>
