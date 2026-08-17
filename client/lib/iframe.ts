export function getIframeSrc(src: string, shouldLoad: boolean) {
  return shouldLoad ? src : undefined;
}
