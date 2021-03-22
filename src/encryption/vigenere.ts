export class Vigenere {
  private static NUM_OF_ASCII_VALUES = 26;
  private static STARTING_VALUE = 65;

  static matchKeyLength(message: string, key: string) {
    if(key.length == message.length) {
      return key;
    }

    while(key.length < message.length) {
      key = key.concat(key);
    }

    if(key.length > message.length) {
      key = key.slice(0, message.length);
    }

    return key;
  }

  static Encrypt(message: string, key: string) {
    key = this.matchKeyLength(message, key);
    const messageChars = [...message];
    const keyChars = [...key];
    var encryptedChar: number;
    var encryptedMessage: string = '';

    for(var i = 0; i < message.length; i++) {
      var charValue = messageChars[i].charCodeAt(0) + keyChars[i].charCodeAt(0);
      console.log(`${messageChars[i].charCodeAt(0)} + ${keyChars[i].charCodeAt(0)}`);
      encryptedChar = charValue % this.NUM_OF_ASCII_VALUES;
      console.log(encryptedChar);
      encryptedMessage += String.fromCharCode(this.STARTING_VALUE + encryptedChar);
      // encryptedMessage += this.characterTable[encryptedChar];
      // console.log(encryptedMessage);
    }

    return encryptedMessage;
  }

  static Decrypt(message: string, key: string) {
    key = this.matchKeyLength(message, key);
    const messageChars = [...message];
    const keyChars = [...key];
    var decryptedChar: number;
    var decryptedMessage: string = '';

    for(var i = 0; i < message.length; i++) {
      var charValue = messageChars[i].charCodeAt(0) - keyChars[i].charCodeAt(0);
      if(charValue < 0) {
        charValue += this.NUM_OF_ASCII_VALUES;
      }

      console.log(`${messageChars[i].charCodeAt(0)} - ${keyChars[i].charCodeAt(0)}`);
      decryptedChar = charValue % this.NUM_OF_ASCII_VALUES;
      console.log(decryptedChar);
      decryptedMessage += String.fromCharCode(this.STARTING_VALUE + decryptedChar);
      // decryptedMessage += this.characterTable[decryptedChar];
    }

    return decryptedMessage;
  }
}
