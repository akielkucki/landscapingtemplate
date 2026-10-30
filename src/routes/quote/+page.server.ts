import { fail } from '@sveltejs/kit';
import { readQuote } from '#lib/forms.ts';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const { values, errors, spam } = readQuote(await request.formData());

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values });
		}

		if (!spam) {
			// TODO: deliver to the business (email, CRM or Jobber). Until then requests are only logged.
			console.info('[quote request]', values);
		}

		return { success: true, name: values.name.split(' ')[0] };
	}
} satisfies Actions;
