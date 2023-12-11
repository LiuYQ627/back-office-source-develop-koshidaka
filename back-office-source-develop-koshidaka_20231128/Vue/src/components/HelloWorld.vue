<template>
   <div>
  HelloWorld
 </div>
</template>

<script>
import PresetSetting from './../resource/templates/PresetSetting/PresetSetting'
export default {
  data () {
    return {
      title: 'スマホプリセット登録'
    }
  },
  components: {
    PresetSetting
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
