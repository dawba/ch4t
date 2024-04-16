import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect client to the server
  await client.connect();
  // Send a ping to confirm successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged db deployment. Successfully connected to MongoDB!");
} catch (error) {
  console.error(error);
}

let db = client.db("employees");

export default db;
