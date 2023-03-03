import { Usuario } from "./usuarios.models";

export class Notification {
    
    _id : string;
    title: string;
    detalle: string;
    view: boolean;
    fechaReporte: string;
    uri: string;
    trasmitter: Usuario
    receiver: Usuario

}
