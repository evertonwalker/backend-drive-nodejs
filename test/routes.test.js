import { describe, test, expect, jest, beforeEach } from '@jest/globals'
import Routes from '../src/routes.js'

describe('#Routes suite test', () => {

    const defaultParams = {
        request: {
            headers: {
                'Content-type': 'multipart/form-data'
            },
            method: '',
            body: {}
        },
        response: {
            setHeader: jest.fn(),
            writeHead: jest.fn(),
            end: jest.fn()
        },
        values: () => Object.values(defaultParams)
    }

    describe("Set socket", () => {
        test('set socket should store io instance', () => {
            const routes = new Routes()
            const ioObject = {
                to: (id) => ioObject,
                emit: (event, message) => { }
            }

            routes.setSocketInstance(ioObject)
            expect(routes.io).toStrictEqual(ioObject)

        })
    })

    describe("Handler", () => {

        let routes;

        beforeEach(() => {
            routes = new Routes()
        })

        test("Given an inexistente route it should choose default route", async () => {

            const routes = new Routes()
            const params = {
                ...defaultParams
            }

            params.request = 'inexistente'

            await routes.handler(...params.values())

            expect(params.response.end).toHaveBeenCalledWith('hello')

        })

        test("It should set any request with CORS ENABLE", async () => {

            const params = {
                ...defaultParams
            }

            params.request = 'inexistente'

            await routes.handler(...params.values())

            expect(params.response.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*')

        })

        test("Given method OPTIONS it should choose options route", async () => {

            const params = {
                ...defaultParams
            }

            params.request.method = 'OPTIONS'

            await routes.handler(...params.values())

            expect(params.response.writeHead).toHaveBeenCalledWith(204)
        })

        test("Given method GET it should get get route", async () => {

            const params = {
                ...defaultParams
            }
            jest.spyOn(routes, routes.get.name).mockResolvedValue()

            params.request.method = 'GET'
            await routes.handler(...params.values())

            expect(routes.get).toHaveBeenCalled()
        })

        test("Given method POST it should choose post route", async () => {

            const params = {
                ...defaultParams
            }

            params.request.method = 'POST'
            jest.spyOn(routes, routes.post.name).mockResolvedValue()

            routes.handler(...params.values())

            expect(routes.post).toHaveBeenCalled()
        })



    })

    describe("#GET", () => {
        test('Given method GET IT should list all files donwloaded', async () => {

            const route = new Routes();
            const params = {
                ...defaultParams
            }

            const filesStatusesMock = [{
                size: "30.5 kB",
                lastModified: '2021-09-07T15:08:31.148Z',
                owner: 'evertonwalker',
                file: 'eu_foto.jpg'
            }]

            jest.spyOn(route.fileHelper, route.fileHelper.getFileStatus.name)
                .mockResolvedValue(filesStatusesMock)


            params.request.method = 'GET'

            await route.handler(...params.values())

            expect(params.response.writeHead).toHaveBeenCalledWith(200)
            expect(params.response.end).toHaveBeenCalledWith(JSON.stringify(filesStatusesMock))


        })
    })

})