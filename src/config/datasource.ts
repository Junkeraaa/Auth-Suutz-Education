import { DataSource } from "typeorm"

const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345",
    database: "Sivt",
    entities: [`src/entity/**/*.ts`],
    migrations: ['src/migrations/**/*.ts'],
    
});

dataSource.initialize().then(() => 'CONNECTECT').catch(e => console.log(e));


export default dataSource;