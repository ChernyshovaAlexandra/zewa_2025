export function maskName(name: string, visibleChars = 3): string {
  if (!name) return 'unknown';
  if (name.length <= visibleChars) return '*'.repeat(name.length);
  return name.slice(0, visibleChars) + '*'.repeat(name.length - visibleChars);
}
