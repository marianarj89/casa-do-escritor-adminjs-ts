import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';
import { Livro } from './livro.entity'; 
// import { calcularValorVendidoAction } from '../app.ts';


interface IEscritor {
    id: number;
    nome: string;
    email: string;
    password: string;
    livros: string;
    saqueLiberado: boolean;
    topSeller: string;
    valorVendido: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export type EscritorCreationAttributes = Optional<IEscritor, 'id' | 'createdAt' | 'updatedAt'>;

export class Escritor extends Model<IEscritor, EscritorCreationAttributes> {
    public id!: number;
    public nome!: string;
    public email!: string;
    public password!: string;
    public livros!: string;
    public saqueLiberado!: boolean;
    public topSeller!: string;
    public valorVendido!: number;
    public createdAt?: Date;
    public updatedAt?: Date;

    async calcularValorVendido(): Promise<number> {
        const livros: Livro[] | null = await Livro.findAll({ where: { escritorId: this.id } });
        if (!livros) return 0;

        let valorVendido = 0;

        for (const livro of livros) {
            valorVendido += livro.quantidadeVendida * livro.preco;
        }

        this.valorVendido = valorVendido;

        await this.save();

        return valorVendido;
    }
}
Escritor.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: new DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: new DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: new DataTypes.STRING,
        allowNull: false
    },
    livros: {
        type: new DataTypes.STRING,
        allowNull: false
    },
    saqueLiberado: {
        type: new DataTypes.BOOLEAN,
        allowNull: false
    },
    topSeller: {
        type: new DataTypes.STRING,
        allowNull: false
    },
    valorVendido: {
        type: new DataTypes.FLOAT,
        allowNull: false
    },
    createdAt: {
        type: new DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
    },
    updatedAt: {
        type: new DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
    }
}, {
    sequelize,
    tableName: 'escritores',
    modelName: 'Escritor'

});

