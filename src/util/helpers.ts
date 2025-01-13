export const truncateDisplayName = (
  displayName: string,
  maxLength: number = 15,
): string => {
  if (displayName.length <= maxLength) {
    return displayName;
  }
  return displayName.substring(0, maxLength) + "...";
};

export const getFileNameFromUrl = (url: string): string => {
  const parts = url.split("%2F");
  const fileNameWithParams = parts.pop() || "";
  const fileName = fileNameWithParams.split("?")[0];
  const extensionIndex = fileName.lastIndexOf(".");
  if (extensionIndex !== -1) {
    return fileName.substring(0, extensionIndex + 4); // Adjust the number 4 if your extensions have different lengths
  }
  return fileName;
};
