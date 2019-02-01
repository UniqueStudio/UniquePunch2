export const domainURL = `http://localhost:7012/`;

export const login = `${domainURL}user/login`;
export const loginQrCode = `${domainURL}user/qrcode`;
export const loginQrCodeScan = (key: string) => `${domainURL}user/scan/${key}`;
export const userInfo = `${domainURL}user/info`;
export const userAvatar = (id: string) => `${domainURL}user/avatar/${id}`;
export const infoList = (page: string) => `${domainURL}info/list/${page}`;
export const recordList = (page: string) => `${domainURL}info/record/${page}`;
export const detailInfo = (id: string) => `${domainURL}info/detail/${id}`;
