<template>
    <div v-bind:class="classes" v-if="show_msg">
      <i v-if="dismissable!==false" class="close icon" @click="this.closeMessage"></i>
      <i v-if="icon" v-bind:class="icon_classes"></i>
      <div class="content">
        <div v-if="title" class="header">{{title}}</div>
        <p>
          <slot></slot>
        </p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Alert',
  data () {
    return {
      show_msg: true,
      classes: ['ui', 'message'],
      icon_classes: ['icon']
    }
  },
  props: {
    'title': {},
    'size': {},
    'type': {},
    'icon': {},
    'dismissable': {
      default: false
    }
  },
  methods: {
    valid_type: function () {
      var types = ['warning', 'info', 'positive', 'success', 'negative', 'error']
      if (types.indexOf(this.type) !== -1) {
        return true
      } else {
        return false
      }
    },
    closeMessage: function () {
      this.show_msg = false
    }
  },
  created: function () {
    if (this.size) {
      // if (valid_size(this.size)) {
      this.classes.push(this.size)
      // }
      // else {
      //   console.warn(this.size + ' - invalid size for <ec-message>')
      // }
    }
    if (this.type) {
      if (this.valid_type(this.type)) {
        this.classes.push(this.type)
      } else {
        console.warn(this.type + ' - invalid type for <ec-message>')
      }
    }
    if (this.icon) {
      this.icon_classes.push(this.icon)
      this.classes.push('icon')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
