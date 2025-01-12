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
  return fileNameWithParams.split("?")[0];
};
