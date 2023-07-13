import{
    mdLinks
  } from './index.js'

  const path='./test1.md';

  mdLinks(path).then((result)=>{
    console.log(result);
  })
  .catch((error)=>{
    console.error(error)
  });