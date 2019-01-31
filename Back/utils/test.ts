import { MongoClient } from "mongodb";

(async function() {
    const client = await MongoClient.connect(
        "mongodb://localhost:27017/unique",
        {
            useNewUrlParser: true
        }
    );
    const db = client.db("unique");
    const result = await db.collection("files").insertOne({
        MD5: "tql"
    });
    console.log(result);
})();
