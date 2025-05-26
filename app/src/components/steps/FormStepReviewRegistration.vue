<template>
    <FormStepEmail 
        ref="stepEmail"
        :form-data="props.formData" 
        :review-step="true" 
    />
    <FormStepRegistration
        ref="stepRegistration"
        :form-data="props.formData" 
        :review-step="true" 
    />
    <FormStepPassword 
        ref="stepPassword"
        :form-data="props.formData" 
        :review-step="true" 
    />
    <div class="form-navigation" v-if="!reviewStep">
        <button class="btn btn--outline" type="button" @click="prev">Voltar</button>
        <button class="btn btn--primary" type="button" @click="submit">Cadastrar</button>
      </div>
</template>

<script setup>
    import { ref } from 'vue';

    import FormStepEmail from './FormStepEmail.vue';
    import FormStepRegistration from './FormStepRegistration.vue';
    import FormStepPassword from './FormStepPassword.vue';

    import { validateStepEmail, validateStepPFRegistration, validateStepPJRegistration, validateStepPassword, hasError } from '../../utils/validation';

    const emit = defineEmits(['prev', 'submit']);
    const stepEmail = ref(null);
    const stepRegistration = ref(null);
    const stepPassword = ref(null);

    const props = defineProps({
        formData: { 
            type: Object, 
            required: true 
        },
    });

    function submit() {
        stepEmail.value.next();
        stepRegistration.value.next();
        stepPassword.value.next();

        const { formData } = props;

        const validationErrors = {
            ...validateStepEmail(formData),
            ...(
                formData.registrationType === 'PF' ?
                    validateStepPFRegistration(formData) :
                    validateStepPJRegistration(formData)
            ),
            ...validateStepPassword(formData)
        }

        if (!hasError(validationErrors)) {
            emit('submit');
        }
    }

    function prev () {
        emit('prev');
    }
</script>

<style lang="scss" scoped>
    @import './../../assets/styles/forms.scss';
</style>