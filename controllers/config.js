import dotenv from 'dotenv';
const entorno = process.env.NODE_ENV || 'dev';
console.log(`entorno: ${entorno}`);
entorno === 'dev' ? dotenv.config({ path: 'config.dev.env' }) : dotenv.config({ path: 'config.prod.env' });
const config = {

}




databaseUrl: process.env.DATABASE_URL,

    console.log(`DATABASE_URL: ${databaseUrl}`);
console.log(`API_KEY: ${apiKey}`);
export config(); 