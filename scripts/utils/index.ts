export const isRemoteUrl = (url: string) => url.startsWith('http');

export function parseTemplate(content: string, params: Record<string, any>) {
  // eslint-disable-next-line regexp/strict
  return content.replace(/{([^}]+)}/g, (match, key) => params[key] ?? match);
}
