import { SERVER_ENV } from '$src/environments/SERVER_ENV';

export class StorageService {
	create = async (uploadOption: {
		R2: R2Bucket;
		folder: string;
		fileName: string;
		file: File;
	}): Promise<{ key: string; url: string } | null> => {
		const path = uploadOption.folder
			? `${uploadOption.folder}/${Date.now()}_${uploadOption.fileName}`
			: `${Date.now()}_${uploadOption.fileName}`;

		const uploadedImage = (await uploadOption.R2.put(path, uploadOption.file)) satisfies R2Object;

		let key = uploadedImage.key;
		const url = `${SERVER_ENV.IMAGE_BASE_URL}/${uploadedImage.key}`;

		return { key, url };
	};
}
