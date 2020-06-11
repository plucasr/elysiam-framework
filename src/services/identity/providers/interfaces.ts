import { LoginProps } from "./types";
import { ResponseProps } from "../../../shared/types";

export interface ILogin {
    (loginData:LoginProps): Promise<ResponseProps>
}