export class Vigenere {
  private static NUM_OF_ASCII_VALUES = 95;
  private static STARTING_VALUE = 32;
  private _messageChars: string[] = [];
  private _keyChars: string[] = [];

  private _message: string = '';
  get message(): string {
    return this._message;
  }
  set message(value: string) {
    if(value != this._message) {
      this._message = value;
      this._messageChars = [...this._message];
      this._keyChars = Vigenere.MatchKeyLength(this._message, this._key);
    }
  }

  private _key: string;
  get key(): string {
    return this._key;
  }
  set key(value: string) {
    if(value != this._key) {
      this._key = value;
      this._keyChars = Vigenere.MatchKeyLength(this._message, this._key);
    }
  }

  constructor() {
    this._messageChars = [];
    this._keyChars = [];
    this._message = '';
    this._key = '';
  }

  static MatchKeyLength(message: string, key: string) {
    if(key.length <= 0) {
      return [];
    }

    while(key.length < message.length) {
      key = key.concat(key);
    }

    if(key.length > message.length) {
      key = key.slice(0, message.length);
    }

    return [...key];
  }

  Encrypt() {
    var encryptedChar: number;
    var encryptedMessage: string = '';

    for(var i = 0; i < this._message.length; i++) {
      // subtract 32 to offset ascii table by 32 (we only care about the printable characters)
      // figuring out what the encrypted character should be based on the basic formula:
      // encrypted character = (message character + key character) mod NUM_OF_ASCII_VALUES
      var keyValue = this._keyChars[i].charCodeAt(0) - 32;
      var charValue = (this._messageChars[i].charCodeAt(0) - 32) + keyValue;
      encryptedChar = charValue % Vigenere.NUM_OF_ASCII_VALUES;

      encryptedMessage += String.fromCharCode(Vigenere.STARTING_VALUE + encryptedChar);
    }

    return encryptedMessage;
  }

  Decrypt() {
    var decryptedChar: number;
    var decryptedMessage: string = '';

    for(var i = 0; i < this._message.length; i++) {
      // subtract 32 to offset ascii table by 32 (we only care about the printable characters)
      // figuring out what the encrypted character should be based on the basic formula:
      // decrypted character = (encrypted character - key character) mod NUM_OF_ASCII_VALUES
      var keyValue = this._keyChars[i].charCodeAt(0) - 32;
      var charValue = (this._messageChars[i].charCodeAt(0) - 32) - keyValue;

      // if we end up with a negative charValue, we need to wrap around to the end of the ascii values
      if(charValue < 0) {
        charValue += Vigenere.NUM_OF_ASCII_VALUES;
      }

      decryptedChar = charValue % Vigenere.NUM_OF_ASCII_VALUES;

      decryptedMessage += String.fromCharCode(Vigenere.STARTING_VALUE + decryptedChar);
    }

    return decryptedMessage;
  }
}
