const fetchStats = require("../script3");

const objectLinksWithStatus=[
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
const statsResult={ total: 4, unique: 4, broken: 2 };


describe('fetchStats',()=>{

    it('should be a function ', () => {
        expect(typeof fetchStats).toBe('function')
      });

      it('Should return an object with three keys',()=>{
        const result= fetchStats(objectLinksWithStatus);
        expect(result).toEqual(statsResult)
      })
  });