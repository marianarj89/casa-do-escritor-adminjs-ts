import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';
import { Escritor } from './escritor.entity';


interface ILivro {
    id: number;
    titulo: string;
    isbn: string;
    escritorId: number;
    preco: number;
    quantidadeVendida: number;
    estoque: number;
    createdAt: Date;
    updatedAt: Date;    
}

export type LivroCreationAttributes = Optional<ILivro, 'id' | 'createdAt' | 'updatedAt'>;

export class Livro extends Model<ILivro, LivroCreationAttributes> implements ILivro {
    public id!: number;
    public titulo!: string;
    public isbn!: string;
    public escritorId!: number;
    public preco!: number;
    public quantidadeVendida!: number;
    public estoque!: number;
    public createdAt!: Date;
    public updatedAt!: Date;

    static async calcularValorVendido(escritorId: number): Promise<number> {
        const livros: Livro[] = await Livro.findAll({
            where: { escritorId },
        });

        let valorVendido = 0;

        for (const livro of livros) {
            valorVendido += livro.quantidadeVendida * livro.preco;
        }

        return valorVendido;
    }
}

Livro.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false
    },
    escritorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'escritores',
            key: 'id'
        }
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantidadeVendida: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estoque: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'livros',
    modelName: 'Livro'


});

