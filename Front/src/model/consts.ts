export const domainURL = `https://punch.hustunique.com/api/`;

export const login = `${domainURL}user/login`;
export const loginQrCode = `${domainURL}user/qrcode`;
export const loginQrCodeScan = (key: string) => `${domainURL}user/scan/${key}`;
export const userInfo = `${domainURL}user/info`;
export const userAvatar = (id: string) => `${domainURL}user/avatar/${id}`;
export const infoList = (page: string) => `${domainURL}info/list/${page}`;
export const recordList = (page: string) => `${domainURL}info/record/${page}`;
export const detailInfo = (id: string) => `${domainURL}info/detail/${id}`;
export const deleteInfo = (id: string) => `${domainURL}info/delete/${id}`;
export const uploadFile = `${domainURL}info/process`;
export const updateRuntime = `${domainURL}runtime`;
