const axios = require('axios');
const { validateFoundLinks } = require('../script1.js'); // Reemplaza 'ruta-de-tu-funcion' con la ruta real de tu función

jest.mock('axios');

// An example array of links without status and info
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
    }
  ];

  // An array of links with status and info
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
    }
  ]

describe('validateFoundLinks', () => {
    it('should validate four links and update their status and info', () => {
    // Mocking the responses of axios.get for each link
      axios.get.mockResolvedValueOnce({ status: 200 });
      axios.get.mockResolvedValueOnce({ status: 200 });
      axios.get.mockRejectedValueOnce(new Error("Request failed with status code 404"));
      axios.get.mockResolvedValueOnce({ status: 200 });
  
       // Calling the validateFoundLinks function with the example links
      const promiseResult = validateFoundLinks(objectLinksExample);
  
      // Ensuring that the result is as expected (links with status and info)
      return promiseResult.then(result => {
        expect(result).toEqual(objectLinksWithStatus);
      });
    });
  });
  
