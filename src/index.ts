import { connectDb } from "./frameworks/database/mongodb/dbConnect";
import { ExpressServer } from "./frameworks/server";

connectDb();
const server = new ExpressServer()