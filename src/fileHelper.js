import fs from 'fs'
import prettyBytes from 'pretty-bytes'

export default class FileHelper {
    static async getFileStatus(donwloadsFolder) {

        const currentFiles = await fs.promises.readdir(donwloadsFolder)
        const statuses = await Promise
            .all(currentFiles
                .map(file => fs.promises
                    .stat(`${donwloadsFolder}/${file}`)));

        const filesStatuses = [];
        for (const fileIndex in currentFiles) {
            const { birthtime, size } = statuses[fileIndex]
            filesStatuses.push(
                {
                    size: prettyBytes(size),
                    file: currentFiles[fileIndex],
                    lastModified: birthtime,
                    owner: process.env.USER
                }
            )
        }

        return filesStatuses;

    }
}