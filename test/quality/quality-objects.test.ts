import { UserService, resultadoFinal, message } from '../../src/quality/errores-object';
import { escapeHtml, renderSafeGreeting } from '../../src/quality/insecure-1-object';
import { buildUserLookupQuery, validateCsrfToken } from '../../src/quality/insecure-2-object';

describe('Remediated quality and security helpers', () => {
  it('UserService returns user data and notification text', () => {
    const service = new UserService();
    expect(resultadoFinal).toBe(20);
    expect(message).toBe('10');
    expect(service.getUserData('u-1')).toEqual({ id: 'u-1' });
    expect(service.formatNotification('isidro')).toBe('Notification prepared for isidro');
  });

  it('escapeHtml and renderSafeGreeting neutralize XSS payloads', () => {
    const raw = '<script>alert("xss")</script>';
    expect(escapeHtml(raw)).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    expect(renderSafeGreeting('<b>Rafael</b>')).toBe('<p>Hello &lt;b&gt;Rafael&lt;/b&gt;</p>');
  });

  it('buildUserLookupQuery creates parameterized query and validateCsrfToken checks tokens', () => {
    const query = buildUserLookupQuery("admin'; DROP TABLE Users; --");
    expect(query.sql).toBe('SELECT id, username FROM Users WHERE username = ?');
    expect(query.params).toEqual(["admin'; DROP TABLE Users; --"]);

    expect(validateCsrfToken('token-123', 'token-123')).toBe(true);
    expect(validateCsrfToken('token-123', 'wrong')).toBe(false);
    expect(validateCsrfToken('', 'token-123')).toBe(false);
  });
});
