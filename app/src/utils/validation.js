import schema from './validationSchema.js';

const datePattern = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
const phonePattern = /^\(?\d{2}\)?\s?(?:9\d{4}|(?!9)\d{4})-?\d{4}$/;

export function isEmpty(value) {
	return !value;
}

export function isValidDate(date) {
	if (!datePattern.test(date)) {
		return false;
	}

	const [day, month, year] = date.split('/').map(Number);
	const newDate = new Date(year, month - 1, day);

	if (
		newDate.getFullYear() !== year ||
		newDate.getMonth() !== month - 1 ||
		newDate.getDate() !== day
	) {
		return false;
	}

	const today = new Date();
	today.setHours(0, 0, 0, 0);
	
	if (newDate > today) {
		return false;
	}

	return true;
}

export function isGenericPhone(phone){
	return phonePattern.test(phone);
}

export function isEmail(email) {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
	return emailPattern.test(email);
}

export function isName(name) {
	return !isEmpty(name);
}

export function isCPF(rawCpf) {
	if (isEmpty(rawCpf)) {
		return false;
	}

	const cpf = rawCpf?.replace(/\D+/g, '');

	if (cpf.length !== 11) {
		return false;
	}

	if (/^(\d)\1{10}$/.test(cpf)) {
		return false;
	}

	const calcCheckDigit = (sliceEnd) => {
		const nums = cpf
			.slice(0, sliceEnd)
			.split('')
			.map(d => parseInt(d, 10));

		const factor = sliceEnd + 1;
		const sum = nums.reduce((acc, num, idx) => acc + num * (factor - idx), 0);
		const mod = sum % 11;
		return String((mod < 2) ? 0 : 11 - mod);
	};

	const dig1 = calcCheckDigit(9);
	if (dig1 !== cpf[9]) {
		return false;
	}

	const dig2 = calcCheckDigit(10);
	if (dig2 !== cpf[10]) {
		return false;
	}

	return true;
}

export function isCNPJ(cnpj) {
	const cnpjPattern = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;
	return cnpjPattern.test(cnpj);
}

export function isPhone(phone) {
	return isGenericPhone(phone);
}

export function isCompanyName(companyName) {
	return !isEmpty(companyName);
}

export function isCompanyPhone(companyPhone) {
	return isGenericPhone(companyPhone);
}

export function isBirthDate(date) {
	return isValidDate(date);
}

export function isStartDate(date) {
	return isValidDate(date);
}

export function isPassword(password) {
	return !isEmpty(password);
}

export function getFormErrors(fields) {
	const errorMessagesObject = {};

	fields.forEach((field) => {
		if (schema[field]) {
			errorMessagesObject[field] = schema[field].message;
		}
	});

	return errorMessagesObject;
}

export function validateStepEmail({ email }){
	const errorMessages = [];
	if (!isEmail(email)) {
		errorMessages.push('email');
	}

	return getFormErrors(errorMessages);
}

export function validateStepPFRegistration({ name, cpf, birthDate, phone }) {
	const errorMessages = [];

	if (!isName(name)) {
		errorMessages.push('name');
	}

	if (!isCPF(cpf)) {
		errorMessages.push('cpf');
	}

	if (!isBirthDate(birthDate)) {
		errorMessages.push('birthDate');
	}

	if (!isPhone(phone)) {
		errorMessages.push('phone');
	}

	return getFormErrors(errorMessages);
}

export function validateStepPJRegistration({ companyName, cnpj, startDate, companyPhone }) {
	const errorMessages = [];

	if (!isCompanyName(companyName)) {
		errorMessages.push('companyName');
	}

	if (!isCNPJ(cnpj)) {
		errorMessages.push('cnpj');
	}

	if (!isStartDate(startDate)) {
		errorMessages.push('startDate');
	}

	if (!isCompanyPhone(companyPhone)) {
		errorMessages.push('companyPhone');
	}

	return getFormErrors(errorMessages);
}

export function validateStepPassword({ password }){
	const errorMessages = [];

	if (!isPassword(password)) {
  	errorMessages.push('password');
	}

	return getFormErrors(errorMessages);
}

export function hasError(errorsObject){
	return Object.keys(errorsObject).length;
}