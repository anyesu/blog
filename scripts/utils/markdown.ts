import type { MarkdownImage } from './types';

// eslint-disable-next-line regexp/strict
export const MARKDOWN_IMAGE_REGEX = /!\[([^\]]*)]\(\s*(.*?)\s*(["'].*["'])?\s*\)/g;

export function resolveMarkdownImages(markdown: string = '') {
  let matcher;
  const result: MarkdownImage[] = [];
  while ((matcher = MARKDOWN_IMAGE_REGEX.exec(markdown)) !== null) {
    const alt = matcher[1];
    const url = matcher[2];
    const title = matcher[3];
    result.push({ alt, url, title });
  }
  return result;
}
