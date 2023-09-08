import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express, { request, response } from 'express';
import { Sequelize } from 'sequelize';
import session from 'express-session';
import { sequelize }  from './db';
import { Escritor , Livro } from './models';
import * as AdminJSSequelize from '@adminjs/sequelize';
import { generateResource } from "./utils/modeling.models";
import { encryptPassword } from './utils/escritor.utils';
import bcrypt from 'bcrypt';
require('dotenv').config();

const mysqlStore = require('express-mysql-session')(session);




AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const PORT = 3000

const start = async () => {
  const app = express()
  const calcularValorVendidoAction = require('./utils/escritor.utils.ts')
  const admin = new AdminJS({
    resources: [
      generateResource(Escritor, {
          password: {
            type: 'password',
            isVisible: { add:true, edit: true, list: false, show: false, filter: false }
          }

          
      }, {
        new: {
          before: async (request: any) => {
            return encryptPassword(request);
          }
        },
        edit: {
          before: async (request: any) => {
            return encryptPassword(request);
          }
        }
      }
      
  
      ), 
      generateResource(Livro)],
  });

  branding: {
    companyName: 'Casa do Escritor'
      }

  const sessionStore = new mysqlStore({
    connectionLimit: 10,
    password: process.env.DB_PASS,
    user:process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    createDatabaseTable: true
  })    

  const secret = 'n1NNOYHMKXwpLr9bksiZu4partisTUAq';
  const cookieName = 'adminjs';

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
        authenticate: async (email: string, password: string) => {
            const user = await Escritor.findOne({ where: { email } });

            if (user) {
                return user;
            } else {
                return false;
            }
        },
        cookieName: cookieName,
        cookiePassword: secret,
    },
    null,

    {

    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    secret: secret,
    cookie: {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production'
    },
    name: cookieName
    }
);

  app.use(admin.options.rootPath, adminRouter)


  app.listen(PORT, () => {
    console.log(`AdminJS started on http://127.0.0.1:${PORT}${admin.options.rootPath}`)
  })
}

start()