<template>
	<div class="v-button-group">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'v-button-group',
	mounted () {
    for (let node of this.$el.children) {
      if (node.nodeName.toLowerCase() !== 'button') {
        console.warn('使用不规范，请参考文档')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
	.v-button-group{
		display: inline-flex;
		vertical-align: middle;
		border: 1px solid #e1e1e1;
		border-radius: 4px;
		> .v-button{
			border-radius: 0;
			&:not(:first-child){
				margin-left: -1px;
			}
			&:first-child{
				border-top-left-radius: 4px;
				border-bottom-left-radius: 4px;
			}
			&:last-child{
				border-top-right-radius: 4px;
				border-bottom-right-radius: 4px;
			} 
		}
	}
</style>