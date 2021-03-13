const baseUrl = 'https://gateway.marvel.com:443/v1/public'
const publicKey = '811b2529a0130c92ab5c1a36e00c61e5';
const privateKey = '426771ca28a1e77bfa361d0c09731bdadf0b63e3';
const md5 = require('md5');
export const getUrlById = (urlPart: string): string => {
    const ts = String(Date.now());
    const hash = md5(ts+privateKey+publicKey);
    const url = `${baseUrl}/${urlPart}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;                    
    return url;
}