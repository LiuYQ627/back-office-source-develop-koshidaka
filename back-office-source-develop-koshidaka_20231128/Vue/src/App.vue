<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230419  qinshh(Neusoft)    G001.00.0  issue課題#1563を対応します.
 -->
<template>
  <v-app>
    <div id="app" >
      <Header/>
      <!-- <router-view class="content"/> -->
      <!-- G001.00.0 Add-Start -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view
        v-if="!$route.meta.keepAlive"
        class="content"/>
        <!-- G001.00.0 Add-End -->
    </div>
  </v-app>
</template>

<script>
import Header from '@/resource/templates/CommonDesign/Header'
import '@babel/polyfill'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    Header
  }
}
</script>
<style>
@import "./resource/static/css/CommonDesign/common.css"
</style>
