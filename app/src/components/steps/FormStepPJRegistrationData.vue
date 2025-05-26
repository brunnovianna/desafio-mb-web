<template>
	<fieldset>
		<legend v-if="!reviewStep">Pessoa Jurídica</legend>

		<label>Razão social</label>
		<input type="text" v-model="props.formData.companyName" />
		<span class="error-message" v-if="errors.companyName">{{ errors.companyName }}</span>

		<label>CNPJ</label>
		<input type="text" v-model="props.formData.cnpj" />
		<span class="error-message" v-if="errors.cnpj">{{ errors.cnpj }}</span>

		<label>Data de abertura</label>
		<input type="text" v-model="props.formData.startDate" />
		<span class="error-message" v-if="errors.startDate">{{ errors.startDate }}</span>

		<label>Telefone</label>
		<input type="text" v-model="props.formData.companyPhone" />
		<span class="error-message" v-if="errors.companyPhone">{{ errors.companyPhone }}</span>

		<div class="form-navigation" v-if="!reviewStep">
			<button class="btn btn--outline" type="button" @click="prev">Voltar</button>
			<button class="btn btn--primary" type="button" @click="next">Continuar</button>
		</div>
	</fieldset>
</template>

<script setup>
	import { reactive } from 'vue';
	import { validateStepPJRegistration, hasError } from '../../utils/validation.js';

	const emit = defineEmits(['prev', 'next']);

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

	function next() {
		const validationErrors = validateStepPJRegistration(props.formData);

		Object.assign(errors, {
			companyName: '',
			cnpj: '',
			startDate: '',
			companyPhone: '',
			}, validationErrors);

		if (!hasError(validationErrors)) {
			emit('next');
		}
	}

	function prev() {
		emit('prev');
	}
		
	defineExpose({ next });
</script>

<style lang="scss" scoped>
	@import './../../assets/styles/forms.scss';
</style>