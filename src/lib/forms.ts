/** Shared shapes and validation for the quote and careers forms. */

export type FormState = {
	success?: boolean;
	name?: string;
	errors?: Record<string, string>;
	values?: Record<string, string>;
} | null;

const text = (data: FormData, key: string) => String(data.get(key) ?? '').trim();

const phoneDigits = (value: string) => value.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');

const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export function readQuote(data: FormData) {
	const values = {
		name: text(data, 'name'),
		phone: text(data, 'phone'),
		email: text(data, 'email'),
		town: text(data, 'town'),
		service: text(data, 'service'),
		size: text(data, 'size'),
		contact: text(data, 'contact'),
		time: text(data, 'time'),
		details: text(data, 'details')
	};

	const errors: Record<string, string> = {};
	if (values.name.length < 2) errors.name = 'Please tell us your name.';
	if (phoneDigits(values.phone).length !== 10) errors.phone = 'Please enter a 10-digit phone number.';
	if (values.email && !looksLikeEmail(values.email)) errors.email = 'That email address doesn’t look right.';
	if (!values.town) errors.town = 'Which town is the property in?';

	return { values, errors, spam: text(data, 'company') !== '' };
}

export function readApplication(data: FormData) {
	const values = {
		name: text(data, 'name'),
		phone: text(data, 'phone'),
		email: text(data, 'email'),
		role: text(data, 'role'),
		experience: text(data, 'experience'),
		license: text(data, 'license'),
		about: text(data, 'about')
	};

	const errors: Record<string, string> = {};
	if (values.name.length < 2) errors.name = 'Please tell us your name.';
	if (phoneDigits(values.phone).length !== 10) errors.phone = 'Please enter a 10-digit phone number.';
	if (values.email && !looksLikeEmail(values.email)) errors.email = 'That email address doesn’t look right.';

	return { values, errors, spam: text(data, 'company') !== '' };
}
