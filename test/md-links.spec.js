
//const mdLinks = require('../index.js');

const {
  checkIsPath,
  isAFile,
  isMDFile,
  readingFile,
  searchingLinks,
  validateFoundedLinks,
  mdLinks
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

const objectEjemplo2WithStatus=[
  {
    text: 'Generalidades del protocolo HTTP - MDN',
    url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\ejemplo2.md',
    status: 200,
    info: 'Valid'
  }
]

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

  it('Should return an array with one object',()=>{
    return mdLinks('/mdFiles/ejemplo2.md',true).then(result=>{
      expect(result).toEqual(objectEjemplo2WithStatus)
    })
  })

  // Mock para axios (simulamos respuestas exitosas y fallidas)
jest.mock('axios', () => ({
  get: jest.fn((url) => {
    if (url === 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview') {
      return Promise.resolve({ status: 200 });
    } else {
      return Promise.reject(new Error('404 Not Found'));
    }
  }),
}));

describe('mdLinks', () => {
  test('should return an array of links with validation', () => {
    const myPath = './mdFiles/ejemplo2.md';
    const validate = true;

    return mdLinks(myPath, validate).then((links) => {
      // Aquí verificamos que la respuesta coincida con lo esperado
      expect(links).toEqual([
        {
          text: 'Generalidades del protocolo HTTP - MDN',
          url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
          file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\ejemplo2.md',
          status: 200,
          info: 'Valid',
        },
      ]);
    });
  });

  // Agrega más pruebas si lo deseas
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
