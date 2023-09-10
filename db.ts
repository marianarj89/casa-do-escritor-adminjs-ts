import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';

require('dotenv').config();

const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    dialect: 'mysql',
});

mongoose.connect('mongodb://127.0.0.1:27017/communication');
    const mongoDb = mongoose.connection;

export {
    sequelize,
    mongoDb
}
