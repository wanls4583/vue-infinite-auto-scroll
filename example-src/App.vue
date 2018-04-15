<template>
	<keep-alive>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </keep-alive>
</template>
<script type="text/javascript">
	export default{
		name: 'app',
		data(){
			return{

			}
		}
	}
</script>