export const Utils={
    exclude: (model: any, keys: string[]) => {
        return Object.fromEntries(
          Object.entries(model).filter(([key]) => !keys.includes(key)),
        );
      },
}