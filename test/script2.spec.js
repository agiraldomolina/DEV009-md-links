const findMDFilesFromDir=require('../script2.js')


const filesFoundedMDFiles=[
    'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\ejemplo2.md',
    'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\test1.md',  'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\test3.md',  'C:\\Users\\albag\\OneDrive\\Escritorio\\mdLinks\\DEV009-md-links\\mdFiles\\test4.md'
  ];

describe('findMDFilesFromDir',()=>{

    it('should be a function ', () => {
        expect(typeof findMDFilesFromDir).toBe('function')
      });

      it('Should return an array with four elements',()=>{
        const result= findMDFilesFromDir('./mdFiles');
        expect(result).toEqual(filesFoundedMDFiles)
      })
  })