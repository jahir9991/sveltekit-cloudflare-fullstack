import { type InferSelectModel } from 'drizzle-orm';

export const getDbSelectkey = (
	dbSelectKeys: string[],
	model
): InferSelectModel<typeof model> | null => {
	let dd ;
	if (dbSelectKeys !== null && dbSelectKeys !== undefined && dbSelectKeys.length > 0) {
		dd = {};
		dbSelectKeys.forEach((key) => {
			if (model[key]) {
				dd[key] = model[key];
			}
		});
	}
	return dd;
};
