<template>
  <button 
    class="v-button"
    @click="buttonClick"
    :class="buttonClass"
    :disabled="disabled"
    :style="{minWidth: `${width}px`, minHeight: `${height}px`, background, color, fontSize: `${fontSize}px`}">
    <v-icon 
      v-if="iconName"
      :name="iconName" 
      :color="iconColor" 
      :width="iconWidth" 
      :height="iconHeight"
      class="v-button-icon">
    </v-icon>
    <div class="v-button-content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
import vIcon from '../icon/icon.vue'
export default {
  name: 'v-button',
  components: {
    vIcon
  },
  props: {
    disabled:{
      type: Boolean,
      default: false
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    color: {
      type: String
    },
    background: {
      type: String
    },
    fontSize: {
      type: Number
    },
    iconName: {
      type: String
    },
    iconColor: {
      type: String
    },
    iconWidth: {
      type: Number
    },
    iconHeight: {
      type: Number
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator(value){
        return[
          'left',
          'right'
        ].indexOf(value)>-1
      }
    }
  },
  methods: {
    buttonClick(event){
      this.$emit('click',event)
    }
  },
  computed: {
    buttonClass(){
      return {
        [`v-icon-${this.iconPosition}`]: this.iconName && this.iconPosition,
        [`v-button-disabled`]: this.disabled
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-button{
    display:inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    font-size: 14px;
    border: 1px solid transparent;
    outline: none;
    border-radius: 3px;
    border: 1px solid #e1e1e1;
    min-width: 38px;
    background: #fff;
    padding: 0.2em 0.6em;
    cursor: pointer;
    &:hover{
      opacity: .85
    }
    &:active{
      opacity: .7
    }
    &.v-button-disabled{
      cursor: not-allowed;
    }
    &.v-icon-right{
      .v-button-icon{
        order: 2;
      }
      .v-button-content{
        order: 1;
        padding-right: 0.2em;
      }
    }
    &.v-icon-left{
      .v-button-icon{
        order: 1;
      }
      .v-button-content{
        order: 2;
        padding-left: 0.2em;
      }
    }
  }
</style>
