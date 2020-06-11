import { demoService } from '../index'

describe('Testing services', () => {
    it('test demo main service', () => {
        let data = demoService()
        expect(data).toBe('test')
    })
})