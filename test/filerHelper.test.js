import { describe, test, expect, jest, beforeEach } from '@jest/globals'
import FileHelper from '../src/fileHelper'
import fs from 'fs'

describe('#FileHeper', () => {

    describe('#getFileStatus', () => {

        test('it should return files statuses in correct format', async () => {

            const statMock = {
                dev: 1212267687,
                mode: 33206,
                nlink: 1,
                uid: 0,
                gid: 0,
                rdev: 0,
                blksize: 4096,
                ino: 13792273858931732,
                size: 30506,
                blocks: 64,
                atimeMs: 1631027311148,
                mtimeMs: 1631027329588.0002,
                ctimeMs: 1631027329588.2954,
                birthtimeMs: 1631027311148.0466,
                atime: '2021-09-07T15:08:31.148Z',
                mtime: '2021-09-07T15:08:49.588Z',
                ctime: '2021-09-07T15:08:49.588Z',
                birthtime: '2021-09-07T15:08:31.148Z'
            }

            const mockUser = 'evertonwalker'
            process.env.USER = mockUser
            const filename = 'eu_foto.jpg'

            jest.spyOn(fs.promises, fs.promises.readdir.name).mockResolvedValue([filename])
            jest.spyOn(fs.promises, fs.promises.stat.name).mockResolvedValue(statMock)

            const result = await FileHelper.getFileStatus('/tmp') 

            const expectedResult = [{
                size: "30.5 kB",
                lastModified: statMock.birthtime,
                owner: mockUser,
                file: filename
            }]

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
            expect(result).toMatchObject(expectedResult)

        })

    })

})


