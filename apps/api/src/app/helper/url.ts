const baseUrl = 'https://gateway.marvel.com:443/v1/public'
const publicKey = process.env.publicKey;
const privateKey = process.env.privateKey;
const md5 = require('md5');
interface Params {
    [key: string]: string | number;
}


export const getUrl = (urlPart: string, params: Params = {}): string => {
    const qs =  Object.keys({ ...params})
                    .map(key => `${key}=${params[key]}`)
                    .join('&');
    const ts = String(Date.now());
    const hash = md5(ts+privateKey+publicKey);
    const url = `${baseUrl}/${urlPart}?ts=${ts}&apikey=${publicKey}&hash=${hash}&${qs}`;          
    return url;
}