export function maskName(name: string, visibleChars = 2): string {
  if (!name) return '';
  if (name.length <= visibleChars) return '*'.repeat(name.length);
  return name.slice(0, visibleChars) + '*'.repeat(name.length - visibleChars);
}
