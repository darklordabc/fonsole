<template>
  <div id="fbutton" :style="{width: getWidth, height: this.height + 'vh'}"
  :class="`${ this.type }` + ' ' + `${ this.disabled ? 'disabled' : 'enabled' }`">
    <div id="background"></div>
    <div id="button" :style="{fontSize: this.height/2 + 'vh'}" @click="handleClick">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FButton',
    props: {
      width: {
        type: [Number, String],
        default: 360,
      },
      height: {
        type: [Number, String],
        default: 270,
      },
      type: {
        type: [String],
        default: 'default',
      },
      disabled: {
        type: [Boolean, String],
        default: false,
      },
    },
    data: () => ({
      colours: ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'],
    }),
    computed: {
      getWidth() {
        if (this.width === 'auto') {
          return '100%';
        }
        return `${this.width}vh`;
      },
    },
    methods: {
      handleClick(e) {
        this.$emit('click', e);
      },
    },
  };
</script>

<style lang="sass" scoped>
  $primary-background-width: 23.5vh

  #fbutton
    // margin: 10px

    & > div
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)

    &.delete
      box-shadow: 0px 5px 0px #222
      background: #333
      transition: transform 0.15s, box-shadow 0.15s
      transform: rotateX(0deg) translateY(0)
      -webkit-font-smoothing: antialiased

      &:hover
        box-shadow: 0px 5px 0px #222
        transform: rotateX(0deg) translateY(0)

      &:hover:active
        box-shadow: 0 1px 0 #222
        background: #333
        transition: transform 0.05s, box-shadow 0.05s
        transform: rotateX(15deg) translateY(4px)

      > #background
        visibility: collapse

      &.disabled
        box-shadow: 0px 5px 0px #222
        opacity: 0.5

    &.publish
      box-shadow: 0px 5px 0px #1f2142
      background: #3f4487
      transition: transform 0.15s, box-shadow 0.15s
      transform: rotateX(0deg) translateY(0)
      -webkit-font-smoothing: antialiased

      &:hover
        box-shadow: 0px 5px 0px #1f2142
        transform: rotateX(0deg) translateY(0)

      &:hover:active
        box-shadow: 0 1px 0 #1f2142
        background: #3f4487
        transition: transform 0.05s, box-shadow 0.05s
        transform: rotateX(15deg) translateY(4px)

      > #background
        visibility: collapse

      &.disabled
        box-shadow: 0px 5px 0px #283329
        opacity: 0.5

    &.play
      box-shadow: 0px 5px 0px #335E38
      background: #48834B
      transition: transform 0.15s, box-shadow 0.15s
      transform: rotateX(0deg) translateY(0)
      -webkit-font-smoothing: antialiased

      &:hover
        box-shadow: 0px 5px 0px #335E38
        transform: rotateX(0deg) translateY(0)

      &:hover:active
        box-shadow: 0 1px 0 #335E38
        background: #48834B
        transition: transform 0.05s, box-shadow 0.05s
        transform: rotateX(15deg) translateY(4px)

      > #background
        visibility: collapse

      &.disabled
        box-shadow: 0px 5px 0px #283329
        opacity: 0.5

    &.install
      box-shadow: 0px 5px 0px #232530
      background: radial-gradient(ellipse at center, #232530 0%,#232530 100%)
      transition: transform 0.15s, box-shadow 0.15s
      transform: rotateX(0deg) translateY(0)
      -webkit-font-smoothing: antialiased

      &:hover
        box-shadow: 0px 5px 0px #232530
        transform: rotateX(0deg) translateY(0)

      &:hover:active
        box-shadow: 0 1px 0 #423847
        background: radial-gradient(ellipse at center, #232530 0%,#232530 100%)
        transition: transform 0.05s, box-shadow 0.05s
        transform: rotateX(15deg) translateY(4px)

      > #background
        background: linear-gradient(-45deg,
        #5e6aa7 10%, #8e96c1 10%,
        #8e96c1 30%, #5e6aa7 30%,
        #5e6aa7 50%, #8e96c1 50%,
        #8e96c1 70%, #5e6aa7 70%,
        #5e6aa7 90%, #8e96c1 90%)
        background-size: $primary-background-width 100%
        -webkit-animation: 'progress-forward' 12s infinite linear
        width: 100%
        height: 100%

    &.uninstall
      box-shadow: 0px 5px 0px #111
      background: radial-gradient(ellipse at center, #232530 0%,#232530 100%)
      transition: transform 0.15s, box-shadow 0.15s
      transform: rotateX(0deg) translateY(0)
      -webkit-font-smoothing: antialiased

      &:hover
        box-shadow: 0px 5px 0px #111
        transform: rotateX(0deg) translateY(0)

      &:hover:active
        box-shadow: 0 1px 0 #111
        background: radial-gradient(ellipse at center, #232530 0%,#232530 100%)
        transition: transform 0.05s, box-shadow 0.05s
        transform: rotateX(15deg) translateY(4px)

      > #background
        background: linear-gradient(-45deg,
        #222 10%, #333 10%,
        #333 30%, #222 30%,
        #222 50%, #333 50%,
        #333 70%, #222 70%,
        #222 90%, #333 90%)
        background-size: $primary-background-width 100%
        -webkit-animation: 'progress-forward' 12s infinite linear
        width: 100%
        height: 100%

    &.progress
      background: radial-gradient(ellipse at center, #D60D2E 0%,#C20020 100%)
      transition: transform 0.15s, box-shadow 0.15s
      -webkit-font-smoothing: antialiased
      box-shadow: 0px 5px 0px #750014
      transform: rotateX(0deg) translateY(0)

      > #background
        background: linear-gradient(-45deg,
        #A7DBD8 10%, #c7c12f 10%,
        #c7c12f 30%, #f26247 30%,
        #f26247 50%, #ec2045 50%,
        #ec2045 70%, #A7DBD8 70%,
        #A7DBD8 90%, #c7c12f 90%)
        background-size: $primary-background-width 100%
        -webkit-animation: 'progress-forward' 3s infinite linear
        width: 100%
        height: 100%

    &.progress-dark
      background: radial-gradient(ellipse at center, #222 0%,#222 100%)
      transition: transform 0.15s, box-shadow 0.15s
      -webkit-font-smoothing: antialiased
      box-shadow: 0px 5px 0px #111
      transform: rotateX(0deg) translateY(0)

      > #background
        background: linear-gradient(-45deg,
        #222 10%, #333 10%,
        #333 30%, #222 30%,
        #222 50%, #333 50%,
        #333 70%, #222 70%,
        #222 90%, #333 90%)
        background-size: $primary-background-width 100%
        -webkit-animation: 'progress-backward' 3s infinite linear
        width: 100%
        height: 100%

  .wobble-horizontal
    display: inline-block
    // box-shadow: 0 0 1px rgba(0, 0, 0, 0)
    // transform: perspective(1px) translateZ(0)

    & > *:hover
      animation: 'wobble-horizontal' 1s 1 ease-in-out

  @-webkit-keyframes 'progress-forward'
    0%
      background-position-x: 0vh
    100%
      background-position-x: $primary-background-width

  @-webkit-keyframes 'progress-backward'
    0%
      background-position-x: $primary-background-width
    100%
      background-position-x: 0vh

  @-webkit-keyframes 'wobble-horizontal'
    16.65%
      transform: translateX(8px)
    33.3%
      transform: translateX(-6px)
    49.95%
      transform: translateX(4px)
    66.6%
      transform: translateX(-2px)
    83.25%
      transform: translateX(1px)
    100%
      transform: translateX(0)
</style>
