
const mdLinks = require('../index.js');

const {
  checkIsPath,
  isAFile,
  isMDFile,
  readingFile,
  searchingLinks,
  validateFoundedLinks
} =require ('../script');

const pathWithLinks='mdFiles\\test3.md' // valid path with links
const pathWithoutLinks='mdFiles\\test4.md' // valid path but empty file
const pathNotMDFile='mdFiles\\myText2.txt'

const objectLinksExample=[
  {
    text: 'Generalidades del protocolo HTTP - MDN',
    url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\test1.md'
  },
  {
    text: 'Mensajes HTTP - MDN',
    url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Messages',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\test1.md'
  },
  {
    text: 'Link roto',
    url: 'https://www.youtube.com/01RHn23Bn_0',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\test1.md'
  },
  {
    text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
    url: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\test1.md'
  }
];

const ObjectLinksWithStatus=[
  {
    text: 'Generalidades del protocolo HTTP - MDN',
    url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\test1.md',
    status: 200,
    info: 'Valid'
  },
  {
    text: 'Mensajes HTTP - MDN',
    url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Messages',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\test1.md',
    status: 200,
    info: 'Valid'
  },
  {
    text: 'Link roto',
    url: 'https://www.youtube.com/01RHn23Bn_0',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\test1.md',
    status: 'Request failed with status code 404',
    info: 'Broken'
  },
  {
    text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
    url: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\test1.md',
    status: 'getaddrinfo ENOTFOUND community.laboratoria.la',
    info: 'Broken'
  }
];

/////////////////////////////////////////////

describe('readingFile',()=>{
  it("Should return an array with an object with one element",()=>{

    const expectedLinks = [
      {
        file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\ejemplo2.md',
        text: 'Generalidades del protocolo HTTP - MDN',
        url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
      }
    ];

    const filePath='./mdFiles/ejemplo2.md'
    return readingFile(filePath).then(result=>{
      expect(result).toStrictEqual(expectedLinks)
    });
  })
});

describe('validateFoundedLinks',()=>{
  it('Should return an array with with four objects with information about their status link',()=>{

    return validateFoundedLinks(objectLinksExample).then(result=>{
      expect(result).toStrictEqual(ObjectLinksWithStatus)
    })
  })
})



it ("Should return true for path: './mdFiles/test3.md'", ()=>{
  const result=isMDFile('./mdFiles/test3.md');
  expect(result).toBe(true)
})

describe('checkIsPath',()=>{
  it('Should return true for the specified path',()=>{
    const result = checkIsPath('./mdFiles/myText2.txt');
    expect(result).toBe(true)

  })
})

describe('mdLinks', () => {

  it('should be a function that resolves a promise', () => {
    expect(typeof mdLinks).toBe('object')
  });

  // it('Deberia devolver un array de objetos (text,href,file)', () => {
  //   const ruta = 'ejemplo2.md'
  //   return mdLinks(ruta, { validate: false }).then((arr) => {
  //     expect(arr).toEqual([
  //       {
  //         text: 'Generalidades del protocolo HTTP - MDN',
  //         url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
  //         file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\ejemplo2.md'

  //       }
  //     ])
  //   })
  // })

  


  // it('should return an array with the links in an md file', () => {
  //   return expect(mdLinks(pathWithLinks, false)).resolves.toEqual(expect.arrayContaining([
  //     expect.objectContaining({
  //       text: expect.any(String),
  //       url: expect.any(String),
  //       file: expect.any(String),
  //     }),
  //   ]))
  // })

  // it('should return an error if the file is not a md file', () => {
  //   return expect(mdLinks('mytext2.txt')).rejects.toThrowError('File is not a MD file');
  // })


});
