export const removeTagsAndWordInside = (originalString: string) =>
  originalString.replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/gi, '...');
