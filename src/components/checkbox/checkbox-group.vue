<template>
	<div class="v-checkbox-group">
		<slot class="test"></slot>
	</div>
</template>

<script>
export default {
	name: 'v-checkbox-group',
	props:{
		value: Array
	}
}
</script>

<style lang="scss" scoped>
	.v-checkbox-group{
		.v-checkbox{
			margin-right: 15px;
		}
	}
</style>