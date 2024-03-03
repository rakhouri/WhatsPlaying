// Replace the following with your Atlas connection string
import { MongoClient } from "mongodb";
const connectionString =
  "mongodb+srv://alfred3:GfIW9zo8EKNA0DyC@leaderboard.l3md99m.mongodb.net/?retryWrites=true&w=majority&appName=Leaderboard";
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
  console.log("connection?");
} catch (e) {
  console.error(e);
}
let db = conn.db("Spotify");
export default db;
