import knex from './db_set'
import { QueryBuilder } from 'knex';
require('dotenv').config()
interface IClient {
    (): QueryBuilder
}
type GetProps = string | number | Array<string> | Array<number>
type DeleteProps = string | number | Array<string> | Array<number>
type validationType = any
export class Repository<ClientType> {
    private _client: IClient;
    private _modelDTO: ClientType;
    constructor(tableName: string, modelDTO?: validationType) {
        this._client = () => knex(tableName);
        this._modelDTO = modelDTO;
    }
    filterValues = (data: ClientType, update: boolean) => {
        if (this._modelDTO) {
            let modelDTO = update ? { ...this._modelDTO, id: null } : this._modelDTO;
            let keys = Object.keys(modelDTO);
            let filteredModelDTO: any = {};
            keys.forEach((item: string) => {
                filteredModelDTO[item] = data[item];
            })
            return filteredModelDTO;
        }
        else {
            return data;
        }
    }
    get = (id: GetProps) => new Promise<ClientType[]>(resolve => {
        this._client().where('id', id)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                console.log(err);
                resolve([])
            })
    })
    getByField = (fieldName: string, fieldValue: any) => new Promise<ClientType[]>(resolve => {
        this._client().where(fieldName, fieldValue)
            .then(response => resolve(response))
            .catch(err => {
                console.log(err);
                resolve([]);
            })
    })
    insert = (data: ClientType) => new Promise<number[]>(resolve => {
        data = this.filterValues(data, false)
        this._client().insert(data)
            .then(response => resolve(response))
            .catch(err => {
                console.log(err)
                resolve(null);
            })
    })
    delete = (id: DeleteProps) => new Promise(resolve => {
        this._client().where('id', id).delete()
            .then(response => resolve(response))
            .catch(err => {
                console.log(err)
                resolve(null)
            })
    })
    update = (data: ClientType | any) => new Promise<number[] | number>(resolve => {
        data = this.filterValues(data, true)
        console.log(data)
        let { id } = data;
        delete data.id;
        this._client().where('id', id).update(data)
            .then(response => {
                
                resolve(response)
            })
            .catch(err => {
                console.log(err)
                resolve([]);
            })
    })
    getAll = (offset = 0, limit = 15) => new Promise<ClientType[]>(resolve => {
        this._client().limit(limit).offset(offset)
            .then(response => {
                resolve(response)
            })
            .catch(err => {
                console.log(err)
                resolve([])
            })
    })
}

export default knex;