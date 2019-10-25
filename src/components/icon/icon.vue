<template>
	<svg 
		class="v-icon" 
		@click="clickHandle"
		aria-hidden="true" 
		:style="{fill: color, width: `${width}em`, height: `${height}em`}">
		<use :xlink:href="`#v-${name}`"></use>
	</svg>
</template>
<script>
import './svg.js'

export default {
	name: 'v-icon',
	props: {
		name: {
			type: String
		},
		color: {
			type: String
		},
		width: {
			type: Number,
			default: 1
		},
		height: {
			type: Number,   
			default: 1
		}
	},
	methods: {
		clickHandle(){
			this.$emit('click')
		}
	}
}
</script>
<style lang="scss" scoped>
	.v-icon{
		overflow: hidden;
	}
</style>