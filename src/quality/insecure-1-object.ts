export function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function renderSafeGreeting(username: string): string {
  const safeUsername = escapeHtml(username);
  return `<p>Hello ${safeUsername}</p>`;
}
