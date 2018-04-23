<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <h3 v-html=desc class='desc'></h3>
    <h2>01. Getting Start</h2>
    <ul>
      <li v-for="link in section1Links" :key=link.id>
        <router-link :to=link.url>{{ link.title }}</router-link>
      </li>
    </ul>
    <h2>02. Pixi.JS Features</h2>
    <ul>
      <li v-for="link in section2Links" :key=link.id>
        <router-link :to=link.url>{{ link.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Entry',
  data () {
    return {
      title: 'PixiJS Practice Project',
      desc: 'All practise from <a href="http://www.pixijs.com/tutorials">PixiJS Offical Tutorial</a>',
      section1Links: [
        {title: 'Init', url: '01-get-start/init'},
        {title: 'Stage and Render', url: '01-get-start/stagerender'},
        {title: 'Texture', url: '01-get-start/texture'},
        {title: 'Sprite', url: '01-get-start/sprite'},
        {title: 'Tileset Image', url: '01-get-start/tileset'},
        {title: 'Tileset Atlas', url: '01-get-start/atlas'},
        {title: 'Movement', url: '01-get-start/movement'},
        {title: 'Keyboard', url: '01-get-start/keyboard'},
        {title: 'Collision', url: '01-get-start/collision'}
      ],
      section2Links: [
        {title: 'Mouse Follow', url: '02-pixi-features/mouse'},
        {title: 'Particle', url: '02-pixi-features/particle'},
        {title: 'Text Practile', url: '02-pixi-features/text-practile'}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="postcss">
h1, h2, h3 {
  font-weight: normal;
}

a {
  color: #42b983;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>

<style>
h3.desc a {
  color: #42b983;
}
</style>
