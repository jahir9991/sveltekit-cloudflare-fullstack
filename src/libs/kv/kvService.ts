
export interface KVCrudServiceOptions {
    kv: KVNamespace
    objectPrefix: string
}

export class KVCrudService<T extends { id: string }> {
    public options: KVCrudServiceOptions

    constructor(options: KVCrudServiceOptions) {
        this.options = options
    }

    async list(): Promise<T[]> {
        const { kv, objectPrefix } = this.options
        const _ids = (await kv.get(objectPrefix, 'arrayBuffer')) as unknown as string;
        const ids: string[] = _ids ? JSON.parse(_ids) : [];

        const fetchObjects = ids.map(async id => {
            const obj = await kv.get(`${objectPrefix}-${id}`);
            console.log(obj);
            if (obj) {
                const ff = JSON.parse(obj)
                console.log(ff);
                return <T>ff;
            }

        });
        const data = await Promise.all(fetchObjects)
        const cl = data.filter((src) => {
            return src;
        });

        return cl;
    }

    async get(id: string): Promise<T | undefined> {
        const { kv, objectPrefix } = this.options
        const result = await kv.get(`${objectPrefix}-${id}`,);
        return String(result) === "" ? null : JSON.parse(result) as T;
    }

    async create(obj: T) {
        const { kv, objectPrefix } = this.options
        const _ids = (await kv.get(objectPrefix, 'arrayBuffer')) as unknown as string;
        const ids: string[] = _ids ? JSON.parse(_ids) : [];

        await Promise.all([
            kv.put(`${objectPrefix}-${obj.id}`, JSON.stringify(obj)),
            !ids.includes(obj.id)
                ? kv.put(objectPrefix, JSON.stringify(ids.concat(obj.id)))
                : Promise.resolve(),
        ])
    }
    async edit(obj: T) {
        const { kv, objectPrefix } = this.options
        const _ids = (await kv.get(objectPrefix, 'arrayBuffer')) as unknown as string;
        const ids: string[] = _ids ? JSON.parse(_ids) : [];

        await Promise.all([
            kv.put(`${objectPrefix}-${obj.id}`, JSON.stringify(obj)),
            !ids.includes(obj.id)
                ? kv.put(objectPrefix, JSON.stringify(ids.concat(obj.id)))
                : Promise.resolve(),
        ])
    }

    async delete(id: string) {
        if (!id) return Error('no id ');
        const { kv, objectPrefix } = this.options
        await kv.delete(`${objectPrefix}-${id}`);

        const _ids = (await kv.get(objectPrefix, 'arrayBuffer')) as unknown as string;
        const ids: string[] = _ids ? JSON.parse(_ids) : [];

        await kv.put(objectPrefix, JSON.stringify(ids.filter(_id => _id !== id)))

    }

    // async deleteAll() {
    //     const { kv, objectPrefix } = this.options
    //     await kv.delete(objectPrefix)
    // }
}