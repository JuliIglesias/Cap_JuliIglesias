import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import ListRouter from "./routes/list.route";

//Creates a new instance of the Prisma client
export const prisma = new PrismaClient();

const app = express();
const port = 4567;

//cors rules
const cors = require('cors');
app.use(cors());

//Defines the main function that starts the Express server
// and connects to the database using the Prisma client
async function main() {
    app.use(express.json()); //Registers middleware to parse incoming request bodies as JSON.

    // Register API routes
    app.use("/api/list", ListRouter); //Registers API routes using the ListRouter module.

    // Defines a catch-all route to handle unregistered routes and return a 404 error response.
    app.all("*", (req: Request, res: Response) => {
        res.status(404).json({ error: `Route ${req.originalUrl} not found` });
    });

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

main() //it starts the Express server and connects to the database using the Prisma client
    .then(async () => {
        await prisma.$connect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });