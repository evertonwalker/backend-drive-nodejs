import { describe, test, expect, jest } from '@jest/globals'
import Routes from '../src/routes.js'

describe('#Routes suite test', () => {

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
                writeHeader: jest.fn(),
                end: jest.fn()
            },
            values: () => Object.values(defaultParams)
        }

        test("Given an inexistente route it should choose default route", () => {

            const routes = new Routes()
            const params = {
                ...defaultParams
            }

            params.request = 'inexistente'

            routes.handler(...params.values())

            expect(params.response.end).toHaveBeenCalledWith('hello')

        })

        // test.todo("It should set any request with CORS ENABLE", () => {

        // })

        // test.todo("Given method OPTIONS it should choose options route")
        // test.todo("Given method GET it should get get route")
        // test.todo("Given method POST it should choose post route")



    })


})