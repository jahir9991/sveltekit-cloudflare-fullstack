import * as bcrypt from 'bcryptjs';
import { ENV } from '../../environments/ENV';

export const BcryptHelper = {
	hash: async (plainText: string, saltRounds = ENV.salt) => {
		const salt = await bcrypt.genSalt(saltRounds);
		return await bcrypt.hash(plainText, salt);
	},
	compare: async (plainText: string, hashString: string) => {
		return await bcrypt.compare(plainText, hashString);
	}
};
