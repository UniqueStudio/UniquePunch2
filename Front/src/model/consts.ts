export const domainURL = `http://localhost:7012/`;

export const login = `${domainURL}user/login`;
export const loginQrCode = `${domainURL}user/qrcode`;
export const loginQrCodeScan = (key: string) => `${domainURL}user/scan/${key}`;
