export const bodyWidth = 600;

export function getHeightFromAspectRatio(
  originalWidth: number,
  originalHeight: number,
) {
  const newHeight = (bodyWidth * originalHeight) / originalWidth;
  return Math.round(newHeight);
}
