<template>
	<fieldset>
		<legend v-if="!reviewStep">Senha de acesso</legend>
	
		<label>Sua senha</label>
		<input type="password" v-model="props.formData.password" />
		<span class="error-message" v-if="errors.password">{{ errors.password }}</span>
	
		<div class="form-navigation" v-if="!reviewStep">
			<button class="btn btn--outline" type="button" @click="prev">Voltar</button>
			<button class="btn btn--primary" type="button" @click="next">Continuar</button>
		</div>
	</fieldset>
</template>
  

<script setup>
	import { reactive } from 'vue';
	import { validateStepPassword, hasError } from '../../utils/validation.js';

	const emit = defineEmits(['prev','next']);

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

	const errors = reactive({});

	function next () {
		const validationErrors = validateStepPassword(props.formData);

		Object.assign(errors, { password: '' }, validationErrors);

		if (!hasError(validationErrors)) {
			emit('next');
		}
	}

	function prev () {
		emit('prev');
	}

	defineExpose({ next });
</script>
  
<style lang="scss" scoped>
	@import './../../assets/styles/forms.scss';
</style>