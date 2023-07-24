const mdLinks = require('../index.js');

const objectEjemplo2WithStatus=[
  {
    text: 'Generalidades del protocolo HTTP - MDN',
    url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\ejemplo2.md',
    status: 200,
    info: 'Valid'
  }
];

const arrayLinksWithoutStatus=[
  {
    text: 'Generalidades del protocolo HTTP - MDN',
    url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\ejemplo2.md'
  },
  {
    text: 'Mensajes HTTP - MDN',
    url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Messages',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\innerMDFiles\\innerTest1.md'
  },
  {
    text: 'Generalidades del protocolo HTTP - MDN',
    url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\test1.md'
  },
  {
    text: 'Mensajes HTTP - MDN',
    url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Messages',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\test1.md'
  },
  {
    text: 'Mensajes HTTP - MDN',
    url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Messages',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\test1.md'
  },
  {
    text: 'Link roto',
    url: 'https://www.youtube.com/01RHn23Bn_0',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\test1.md'
  },
  {
    text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
    url: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\test1.md'
  },
  {
    text: 'Node.js',
    url: 'https://nodejs.org/',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\test3.md'
  },
  {
    text: 'JavaScript Info',
    url: 'https://javascript.info/',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\test3.md'
  },
  {
    text: 'File System | Node',
    url: 'https://nodejs.org/api/fs',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\test3.md'
  }
]

describe('mdLinks', () => {
  it('should be a function that resolves a promise', () => {
    expect(typeof mdLinks).toBe('function')
  });

  it('Should return an array with one object',()=>{
    return mdLinks('./mdFiles/ejemplo2.md',true).then(result=>{
      expect(result).toEqual(objectEjemplo2WithStatus)
    })
  });

  it('Should return an array with twelve objects without information about status',()=>{
    return mdLinks('./mdFiles',false).then(result=>{
      expect(result).toEqual(arrayLinksWithoutStatus)
    })
  });
});
