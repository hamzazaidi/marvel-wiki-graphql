const baseUrl = 'https://gateway.marvel.com:443/v1/public'
const publicKey = process.env.publicKey;
const privateKey = process.env.privateKey;
const md5 = require('md5');
export const getUrl = (urlPart: string): string => {
    const ts = String(Date.now());
    const hash = md5(ts+privateKey+publicKey);
    const url = `${baseUrl}/${urlPart}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;                    
    return url;
}