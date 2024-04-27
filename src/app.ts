
//import { Request, Response } from 'express';

import { envs } from "./config/envs";
import { Server } from "./presentation/server";

const server = new Server({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    //host: envs.host,


})


server.start();

