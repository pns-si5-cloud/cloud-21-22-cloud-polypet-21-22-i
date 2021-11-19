import { NestFactory } from '@nestjs/core';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";


import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const adminConfig: ServiceAccount = {
    "projectId": "si5-cloud-i",
    "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC290qFHw32S2wi\nOf+n4wPB8/d1m4UC0iFz910ojdabowOLsFvoWKrLj+BuseaYVCwGwMiWhxPdotCZ\ne5MRmu9uWrHMbBWyJ5RNOvpox/Q6007Hq8AL8GsTY48FRUcX4QTuSWtI6WaFIMqH\nDCg1tBg8sQec8xuVJ63diCWfAgRSiEQ/9/btAqW/gMzj+nPu+q+8Ymj5dzGmgLlo\nM8Wqus6FfjaU3b2SYY5B5sywW75E/0kQ9NNw+M+8xKLHT+sEDkWHh0z/49o6uUVn\nIHEB4voZ7iRmhVdutBRW+QOTqH7cUBI8qGJ8kU9tQXHXYFKkivxt7221HAtBN+4c\nKtzT6IcVAgMBAAECggEASPpBwu8sBnz22IABtNkbepTwsvwhBYsCxNp5Ud+hJdrT\nYzgosHgNR7xPbFeQ/lk0Zk0mtMOT7OcwBMgBVRhTP9T07fB+hty6jkNj9b8rbvsx\nhPrAUwLF8qnXNeb4AFJEQTcPj7loptj5bvwuXZ1DvZFu0+8zpT56Xs4bE10elDwQ\n/8yKRP4QWsMj5dtIlSWET9Hsb67ZRqKgz5rEBPUPZ1Tamc638eQTOMGuwnvFmcNK\nN4GZdBT5VqeVR3pNf/1jk5ygnwyobvLbgQ5WyEjlWcDB5HsMjDiIBrCxiHlS07R5\nk74WmHRIkdzT1lCzDZSZbyu3uGwrSrn+7dDpu5i9UQKBgQDjhZYEVJri/sMri1iF\nF1VqgTtl05gAozxOr/RBK3GRwnnwg4CTHULiEwLafWAZT6luiLwEfxQ0neBF3Q35\ny1gJwLo7NNXJ5Lf0uRuSbmoAlOdgKMMgJQvJUZoYPLg9hp/bAgJU3eIN1scrW70L\nIdbYOIo83NAtu6dlUsZwc700wwKBgQDN3gP9KD9wFp1JMhf6gwyOoSOF+OhPPYT7\nA4FBMxUsB+GqF2I9w5+pHpXWqI69n2s0GE3z6Iu/AeT9iU6L72O87CGur9samnLR\nA3paVtW40WT7lN8nvjBDMaFG/pzwjGu6Q08uqFURgCyTx/Fg1WcYsZqOY+mU04Hy\nDFd2FfM3RwKBgQCNDooGX0mzh80KlxanVOMQ59Qiej+XzZwbEL13Fe8QNikRcwXo\nr1CDBtRTDz3gE2Jw8/bVNtAZGvQrfDQo9Oe9DC6pfEU7KUDfSVANxcSUXbzhAgSP\nTkhzZNMLScHT6z36MtGtOe7nM4xBlluqpi0j2lHiD+hFIj1S9TGwECFyrwKBgAhe\nRfs8b5e2053uE1tziEcj9bW0cH0IGye49MAZu3qWt22albu8//h37c9T+rlqiYkM\nk96eTU/uW8iSlEbL7Fn5n0TikR17ub8VTRvu+7EPkfNIEeojqQKSOeQQ5YBBtP9V\nTRqwbQTRGP7I2d79zbsLPSUcmpoaHuYf6k46hjBxAoGBAJM3IJDr91i8IBwFoReI\nmUGPIHrfXINebZYacC6bAgAMj8iBslLls7sME4yFUcypp6aHxU44+IkjlyB+Lylk\nP5gC/UylSHiXIhXPxKS3TnT8zrZ57OijpH5ocw1FT0OCTzCRGZVnWcI4bWUUe7ZC\nYZE8ZtWVfdOx40mQK11VYaC3\n-----END PRIVATE KEY-----\n",
    "clientEmail":"firebase-adminsdk-iktu5@si5-cloud-i.iam.gserviceaccount.com",
  };
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
});
  app.enableCors()
  await app.listen(process.env.PORT || 3005);
  console.log("-------------------------- ACCOUNT -------------------------");
}
bootstrap();
