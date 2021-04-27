export const removeTagsFromString = (originalString: string) =>
  originalString.replace(/(<([^>]+)>)/gi, '');
