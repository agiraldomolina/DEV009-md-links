const {
    checkIsPath,
    isMDFile,
    readingFile,
    searchingLinks,
    validateFoundLinks,
  } =require ('../script1');
  
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
      const filePath='./mdFiles/ejemplo2.md';
      return expect(readingFile(filePath)).resolves.toStrictEqual(expectedLinks)

      // return readingFile(filePath).then(result=>{
      //   expect(result).toStrictEqual(expectedLinks)
      // });
    })
  });
  describe('validateFoundLinks',()=>{
    it('Should return an array with with four objects with information about their status link',()=>{
      return validateFoundLinks(objectLinksExample).then(result=>{
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
  });

  