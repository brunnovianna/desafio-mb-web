<template>
	<FormStepPFRegistration 
		ref="stepPFRegistration"
		v-if="props.formData.registrationType === 'PF'" 
		:form-data="props.formData"
		:review-step="reviewStep"
		@next="$emit('next')"
	/>
	<FormStepPJRegistration 
		ref="stepPJRegistration"
		v-else 
		:form-data="props.formData"
		:review-step="reviewStep" 
		@next="$emit('next')"
	/>
</template>

<script setup>
	import { ref } from 'vue';

	import FormStepPFRegistration from './FormStepPFRegistrationData.vue';
	import FormStepPJRegistration from './FormStepPJRegistrationData.vue';

	import { defineProps } from 'vue';
	const emit = defineEmits(['prev','next']);

	const stepPFRegistration = ref(null);
    const stepPJRegistration = ref(null);

	const props = defineProps({
		formData: { 
			type: Object, 
			required: true 
		},
		reviewStep: {
			type: Boolean,
			default: false
		}
	});

	function next(){
		props.formData.registrationType == 'PF' ?
			stepPFRegistration.value.next() :
			stepPJRegistration.value.next();
	}

	defineExpose({ next });
</script>

<style lang="scss" scoped>
</style>