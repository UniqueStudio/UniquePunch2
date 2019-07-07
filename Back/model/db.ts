import { MongoClient } from "mongodb";
const mongoURL = process.env.MODE === "DEV" ? "localhost:27017" : "mongodb:38324";

export const databaseConnect = async function() {
    const client = await MongoClient.connect(`mongodb://${mongoURL}/unique`, { useNewUrlParser: true });
    return { db: client.db("unique"), client: client };
};
