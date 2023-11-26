import { createCanvas, loadImage } from 'canvas'

export default class FileService {

  static async convert(base64, name) {
    return await new Promise((resolve) =>{
      loadImage(Buffer.from(base64, "base64")).then(async (img) => {
        const canvas = createCanvas(img.width, img.height, 'pdf');
        const ctx = canvas.getContext('2d');
      
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const base64image = canvas.toBuffer();
        
        resolve(base64image) 
      });
    })
  }
}