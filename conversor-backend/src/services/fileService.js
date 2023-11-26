import fs from 'fs'
import { createCanvas, loadImage } from 'canvas'

export default class FileService {

  static async convert(base64, name) {
    base64 = base64.split('base64,')[1]
    fs.writeFile(name, base64, 'base64', () => console.log('SALVOU A IMAGEM'))
    return await new Promise((resolve) =>{
      loadImage(Buffer.from(base64, "base64")).then(async (img) => {
        const canvas = createCanvas(img.width, img.height, 'pdf');
        const ctx = canvas.getContext('2d');
      
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const base64pdf = canvas.toBuffer();
        fs.writeFile(`${name.split('.')[0]}.pdf`, base64pdf, 'base64', () => console.log('SALVOU O PDF'))
        resolve(base64pdf) 
      });
    })
  }
}