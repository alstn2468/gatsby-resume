import { withAssetPrefix } from 'gatsby';

export function addAssetPrefix(src: string): string {
  if (src.includes('\n')) {
    return src.split('\n').map(withAssetPrefix).join('\n');
  }
  return withAssetPrefix(src);
}