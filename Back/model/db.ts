import { MongoClient } from "mongodb";
const mongoURL = process.env.MODE === "DEV" ? "localhost" : "mongodb";

export const databaseConnect = async function() {
    const client = await MongoClient.connect(`mongodb://${mongoURL}:27017/unique`, { useNewUrlParser: true });
    return { db: client.db("unique"), client: client };
};
