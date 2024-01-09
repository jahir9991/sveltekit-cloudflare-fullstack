export const getGraphQlField = (selectionSet) => {
	if (!selectionSet) {
		return {};
	}

	return selectionSet.selections.reduce((fields, selection) => {
		if (selection.selectionSet) {
			// Recursively handle nested selections
			const nestedFields = getGraphQlField(selection.selectionSet);
			const keys = Object.keys(nestedFields).filter((key) => !key.startsWith('__'));
			fields[selection.name.value] = {
				keys,
				...nestedFields
			};
		} else {
			// Add the field to the object with value set to true, excluding keys starting with _
			if (!selection.name.value.startsWith('_')) {
				fields[selection.name.value] = { keys: [] };
			}
		}
		return fields;
	}, {});
};
