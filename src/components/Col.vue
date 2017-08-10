<template>
    <div v-bind:class="classes">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Col',
  props: ['span'],
  data () {
    return {
      'classes': ['wide', 'column']
    }
  },
  created () {
    if (typeof (this.span) !== 'undefined') {
      var spanAlpha = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen']
      var span = parseInt(this.span)
      if (span >= 1 && span <= 16) {
        this.classes.unshift(spanAlpha[span - 1])
      } else {
        console.warn(this.span + ' - invalid span for <ec-col>')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
