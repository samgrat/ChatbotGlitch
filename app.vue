<template>
  <div class="vh-100 dt center">
    <div class="dtc v-mid">
      <h1 class="avenir tracked ttu">{{msg}}</h1>
    </div>
  </div>
</template>

<script>

export default {
	data () {
		return {
			msg: 'Hello from VueJS!'
		}
	}
}
</script>

<style>
  h1 {color: red}
</style>