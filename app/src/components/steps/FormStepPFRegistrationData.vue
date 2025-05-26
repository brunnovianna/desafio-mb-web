<template>
	<fieldset>
		<legend v-if="!reviewStep">Pessoa Física</legend>

		<label>Nome</label>
		<input type="text" v-model="props.formData.name" />
		<span class="error-message" v-if="errors.name">{{ errors.name }}</span>

		<label>CPF</label>
		<input type="text" v-model="props.formData.cpf" />
		<span class="error-message" v-if="errors.cpf">{{ errors.cpf }}</span>

		<label>Data de nascimento</label>
		<input type="text" v-model="props.formData.birthDate" placeholder="DD/MM/YYYY" />
		<span class="error-message" v-if="errors.birthDate">{{ errors.birthDate }}</span>

		<label>Telefone</label>
		<input type="text" v-model="props.formData.phone" />
		<span class="error-message" v-if="errors.phone">{{ errors.phone }}</span>

		<div class="form-navigation" v-if="!reviewStep">
			<button class="btn btn--outline" type="button" @click="prev">Voltar</button>
			<button class="btn btn--primary" type="button" @click="next">Continuar</button>
		</div>
	</fieldset>
</template>

<script setup>
	import { reactive } from 'vue';
	import { validateStepPFRegistration, hasError } from '../../utils/validation.js';

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
		const validationErrors = validateStepPFRegistration(props.formData);

		Object.assign(errors, { 
			name: '', 
			cpf: '', 
			birthDate: '', 
			phone: '' 
		}, validationErrors);

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