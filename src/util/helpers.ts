export const truncateDisplayName = (
  displayName: string,
  maxLength: number = 15,
): string => {
  if (displayName.length <= maxLength) {
    return displayName;
  }
  return displayName.substring(0, maxLength) + "...";
};
