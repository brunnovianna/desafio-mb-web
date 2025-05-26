<template>
	<div class="step-counter">
		Etapa <span>{{ displayFormStep }}</span> de {{ formStepsMap.length }}
	</div>

    <form>
		<component 
			:is="formStepsMap[currentFormStep]" 
			:form-data="formData"
			@next="onNext" 
			@prev="onPrev"
			@submit="onSubmitUserData"
		/>
    </form>
</template>

<script setup>
	import { ref, computed, reactive, defineAsyncComponent } from 'vue';

	const currentFormStep = ref(0);
	
	const formData = reactive({
		registrationType: 'PF',
		email: 'a@a.com',
		name: 'a', 
		cpf: '10378777726', 
		birthDate: '21/03/1983', 
		phone: '11955571433',
		password: 'a'

	});

	const displayFormStep = computed(() => currentFormStep.value + 1);

	const formStepsMap = [
		defineAsyncComponent(() => import('./steps/FormStepEmail.vue')),
		defineAsyncComponent(() => import('./steps/FormStepRegistration.vue')),
		defineAsyncComponent(() => import('./steps/FormStepPassword.vue')),
		defineAsyncComponent(() => import('./steps/FormStepReviewRegistration.vue')),
	];

	function onNext () {
		if (displayFormStep.value < formStepsMap.length) {
			currentFormStep.value++;
		}
	}

	function onPrev () {
		if (displayFormStep.value > 1) {
			currentFormStep.value--;
		}
	}

	async function onSubmitUserData() {
		try {
			const response = await fetch('http://localhost:3000/registration', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const err = await response.json();
				console.error('Erro no cadastro:', err);
				return;
			}

			const body = await response.json();
			console.log('Resposta do servidor:', body);
		} catch (e) {
			console.error('Falha ao conectar no servidor:', e);
		}

	}
</script>

<style lang="scss" scoped></style>
