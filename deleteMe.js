const url1 ='https://developer.mozilla.org/es/docs/Web/HTTP/Messages';
const  url2 = 'https://www.youtube.com/01RHn23Bn_0uu';

function isValidURL (string){
    try {
        new URL(string);
        return true;
    } catch (error) {
        return false
    }
}

function isValidHttpUrl(string){
    try {
        const url =new URL(string);
        return url.protocol==="http:" || url.protocol==='https:';
    } catch (error) {
        return false
    }
}

console.log(isValidURL(url1));
console.log(isValidHttpUrl(url1));

console.log(isValidURL(url2));
console.log(isValidHttpUrl(url2));


