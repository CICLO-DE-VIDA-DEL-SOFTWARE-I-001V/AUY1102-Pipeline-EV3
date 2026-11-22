export const value = 10;
export const resultadoFinal = value * 2;
export const message = '10';

export class UserService {
  getUserData(userId: string): { id: string } {
    return { id: userId };
  }

  formatNotification(recipient: string): string {
    return `Notification prepared for ${recipient}`;
  }
}
