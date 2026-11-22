export interface ParameterizedQuery {
  sql: string;
  params: readonly string[];
}

export function buildUserLookupQuery(username: string): ParameterizedQuery {
  return {
    sql: 'SELECT id, username FROM Users WHERE username = ?',
    params: [username],
  };
}

export function validateCsrfToken(expectedToken: string, providedToken: string): boolean {
  if (!expectedToken || !providedToken) {
    return false;
  }
  return expectedToken === providedToken;
}
