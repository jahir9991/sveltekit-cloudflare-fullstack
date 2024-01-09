export function Singleton<T extends new (...args: any[]) => any>(ctr: T): T {
	let instance: T;

	return class {
		private constructor(...args: any[]) {
			if (instance) {
				console.assert('You cannot instantiate a singleton twice!');
				return instance;
			}

			instance = new ctr(...args);
			return instance;
		}
	} as T;
}
