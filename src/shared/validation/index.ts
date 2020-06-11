import validate from 'validate.js'

type ConstraintsProps = {}

export class ValidationModel<ModelProps> {
    private _insertModel;
    private _updateModel;

    constructor(constraints: ConstraintsProps | any) {
        this._updateModel = { ...constraints, id: { presence: true } };
        delete constraints.id;
        this._insertModel = constraints;
    }
    public insertIsValid = (data: ModelProps) => {
        let response: any = validate(data, this._insertModel)
        if (response) {
            response = this.cleanValidateMessages(response);
            return {
                success: false,
                messages: response
            }
        }
        else {
            return {
                success: true
            }
        }
    }
    public updateIsValid = (data: ModelProps) => {
        let response = validate(data, this._updateModel)
        if (response) {
            response = this.cleanValidateMessages(response);
            return {
                success: false,
                messages: response
            }
        }
        else {
            return {
                success: true
            }
        }
    }
    private cleanValidateMessages = (messages: any) => {
        let keys = Object.keys(messages)
        let response: any = [];
        keys.map(item => {
            messages[item].map(message => {
                response.push(message)
            })
        })
        console.log(response)
        return response;
    }
}