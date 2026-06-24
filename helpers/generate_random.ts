export class PasswordHelper {
  static generatePassword(
    length: number = 16,
    includeUppercase: boolean = true,
    includeNumbers: boolean = true,
    includeSymbols: boolean = true
  ): string {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charPool = lowercaseChars;
    if (includeUppercase) charPool += uppercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    if (charPool.length === 0) {
      throw new Error('Character pool cannot be empty');
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      password += charPool[randomIndex];
    }

    return password;
  }
}
