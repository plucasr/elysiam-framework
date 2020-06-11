import { ResponseProps } from "../../shared/types"

interface IDemoService {
    (): ResponseProps
}
export const demoService: IDemoService = () => ({
    success: true,
    payload: null,
    messages: ['Demo request']
})

export default {
    demoService
}