import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { UserD1 } from '../schemas/schemaD1';
const isValidImage = (data: File) => {
	return ['jpg', 'jpeg', 'png', 'gif', 'webm', 'webp', 'svg', 'avif'].includes(
		data.name.split('.').pop()
	);
};

export const insertUserDto = createInsertSchema(UserD1, {
	name: z.string().min(5).max(100),
	// price: z
	// 	.any()
	// 	.refine((data) => !isNaN(Number(data)), {
	// 		message: 'Value must be a valid number'
	// 	})
	// 	.transform((data) => Number(data)),

	image: z
		.instanceof(File, {
			message: 'image must be a valid File'
		})
		.refine((data) => data.size < 10000000, {
			message: 'image must be less than 10MB'
		})
		.refine((data) => isValidImage(data), {
			message: 'image must be a image File'
		})
});
