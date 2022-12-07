import mysql from "mysql2/promise"
import DB_CONFIG from "./DB_config.js"

class DATABASE {
    async connect() {
        this.conn = await mysql.createConnection(DB_CONFIG)
        console.log('DATABASE CONNECTED');
    }
    async dbquery(query) {
        const [rows] = await this.conn.execute(query)
        return rows
    }
    async dbclose() {
        await this.conn.end()
        console.log('DATABASE DISCONNECTED');
    }
}


export default DATABASE





