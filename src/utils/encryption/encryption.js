import CryptoJS from 'crypto-js';
export const encryptData = ({plainText,secret} = {}) => {
    return CryptoJS.AES.encrypt(
        plainText,
        secret
      ).toString();
}
export const decryptData = ({cipherText, secret} = {}) => {
    return  CryptoJS.AES.decrypt(
          cipherText,
          secret
        ).toString(CryptoJS.enc.Utf8);
}