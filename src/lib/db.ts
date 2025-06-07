import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const uri = process.env.MONGODB_URI;
const isLocalhost = uri.includes("localhost") || uri.includes("127.0.0.1");

const options = {
  // Only enable SSL/TLS for remote MongoDB instances (not localhost)
  ssl: !isLocalhost,
  tls: !isLocalhost,
  // These options are only needed for remote MongoDB instances
  ...(isLocalhost
    ? {}
    : {
        tlsAllowInvalidCertificates: true, // Only use this in development
        tlsAllowInvalidHostnames: true, // Only use this in development
      }),
  // Add connection timeout and retry options
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 10000,
  maxPoolSize: 10,
  minPoolSize: 5,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// Helper function to get database instance
export async function getDb() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB);
}
