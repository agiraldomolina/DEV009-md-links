const mdLinks = require('../index.js');


const objectEjemplo2WithStatus=[
  {
    text: 'Generalidades del protocolo HTTP - MDN',
    url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
    file: 'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\ejemplo2.md',
    status: 200,
    info: 'Valid'
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
  })
})