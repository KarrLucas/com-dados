import expressLoader from './express.js';

export default async ({ expressApp }) => {
    expressLoader({ app: expressApp });
    console.log('Express Intialized');
}