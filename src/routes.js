import FileHelper from './fileHelper';
import { logger } from './logger';
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));
const defaultDonwloadsFolder = resolve(__dirname, '../', "downloads");
export default class Routes {
    io
    constructor(donwloadsFolder = defaultDonwloadsFolder) {
        this.donwloadsFolder = donwloadsFolder
        this.fileHelper = FileHelper
    }

    setSocketInstance(io) {
        this.io = io
    }

    async defaultRoute(request, response) {
        response.end('hello');
    }


    async options(request, response) {
        response.writeHead(204);
    }

    async post(request, response) {
        logger.info('post')
        response.end()
    }

    async get(request, response) {
        const files = await this.fileHelper.getFileStatus(this.donwloadsFolder);
        response.writeHead(200);
        response.end(JSON.stringify(files));
    }

    handler(request, response) {
        response.setHeader('Access-Control-Allow-Origin', '*')
        const chosen = this[request.method.toLowerCase()] || this.defaultRoute
        return chosen.apply(this, [request, response])
    }
}

