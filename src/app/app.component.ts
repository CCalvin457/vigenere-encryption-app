import { Component, Input, SimpleChanges } from '@angular/core';
import { Vigenere } from 'src/encryption/vigenere';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Vigenère Cipher';
  encryptedMessage: string = '';
  isEncrypting: boolean = true;

  private _message: string = ''
  get message(): string {
    return this._message;
  }
  set message(value: string) {
    if(value != this._message) {
      this._message = value;
      console.log(this._message);
      this.encryptedMessage = this.isEncrypting == true ? Vigenere.Encrypt(this._message, this.encryptionKey) : Vigenere.Decrypt(this._message, this.encryptionKey);
    }
  }
  encryptionKey: string = 'Good fortune';

  isEncryptingToggle(value: boolean) {
    this.isEncrypting = value;
    console.log(typeof(this.isEncrypting));
  }
}
