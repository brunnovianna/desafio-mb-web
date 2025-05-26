<template>
    <fieldset>
        <legend v-if="!reviewStep">Seja bem vindo(a)</legend>
        <label>Endereço de e-mail</label>
        <input type="email" v-model="props.formData.email"/>
        <span class="error-message">{{ errors.email }}</span>
        <div v-if="!reviewStep" class="form-radio-group">
            <label>
                <input
                    type="radio"
                    name="registrationType"
                    value="PF"
                    v-model="props.formData.registrationType"
                />
                <span>Pessoa Física</span>
            </label>

            <label>
                <input
                    type="radio"
                    name="registrationType"
                    value="PJ"
                    v-model="props.formData.registrationType"
                />
                <span>Pessoa Jurídica</span>
            </label>
        </div>
        
        <div class="form-navigation" v-if="!reviewStep">
            <button class="btn btn--primary" type="button" @click="next">Continuar</button>
        </div>
    </fieldset>
</template>

<script setup>
    import { reactive } from 'vue';
    import { validateStepEmail, hasError } from '../../utils/validation.js';

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
        const validationErrors = validateStepEmail(props.formData);
        Object.assign(errors, { email: '' }, validationErrors);

        if (!hasError(validationErrors)) {
            emit('next');
        }
    }
    defineExpose({ next });
</script>

<style lang="scss" scoped>
    @import './../../assets/styles/forms.scss';
</style>