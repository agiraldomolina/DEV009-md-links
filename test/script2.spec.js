const {
  findMDFilesFromDir,
  findLinksInMarkdownFiles}=require('../script2.js')


const filesFoundedMDFiles=[
  'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\ejemplo2.md',
  'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\innerMDFiles\\innerTest1.md',
  'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\test1.md',
  'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\test3.md',
  'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\test4.md'
];

const linksFounded=[
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

describe('findMDFilesFromDir',()=>{

    it('should be a function ', () => {
        expect(typeof findMDFilesFromDir).toBe('function')
      });

      it('Should return an array with four elements',()=>{
        const result1= findMDFilesFromDir('./mdFiles');
        expect(result1).toEqual(filesFoundedMDFiles)
      })
  });

  describe ('findLinksInMarkdownFiles',()=>{
    it('should be a function ', () => {
      expect(typeof findLinksInMarkdownFiles).toBe('function')
    });

    it('Should return an array with ten objects ',()=>{
      return findLinksInMarkdownFiles('./mdFiles').then(result=>{
        expect(result).toEqual(linksFounded)
      })
    })
  })