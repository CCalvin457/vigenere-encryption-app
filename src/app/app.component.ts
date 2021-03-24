import { Component, OnInit } from '@angular/core';
import { Vigenere } from 'src/encryption/vigenere';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title: string;
  encryptedMessage: string;
  isEncrypting: boolean = true;
  vigenere: Vigenere;

  private _message: string;
  get message(): string {
    return this._message;
  }
  set message(value: string) {
    if(value != this._message) {
      this._message = value;
      this.vigenere.message = value;
      // Encrypts or decrypts message in real time
      this.displayResults();
    }
  }

  private _encryptionKey: string;
  get encryptionKey(): string {
    return this._encryptionKey;
  }
  set encryptionKey(value: string) {
    if(value != this._encryptionKey) {
      this._encryptionKey = value;
      this.vigenere.key = value;
      this.displayResults();
    }
  }

  constructor() {
    this.title = 'Vigenère Cipher'
    this._message = '';
    this._encryptionKey = 'Your secret key here';
    this.encryptedMessage = '';
    this.vigenere = new Vigenere();
  }

  ngOnInit() {
    this.vigenere.key = this._encryptionKey;
  }

  isEncryptingToggle(value: boolean) {
    this.isEncrypting = value;
    // Update results on toggle
    this.displayResults();
  }

  displayResults() {
    if(this._message && this._encryptionKey) {
      if(this.isEncrypting) {
        this.encryptedMessage = this.vigenere.Encrypt();
      } else {
        this.encryptedMessage = this.vigenere.Decrypt();
      }
    } else {
      this.encryptedMessage = '';
    }
  }
}
