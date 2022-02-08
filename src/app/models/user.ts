export class User {
    id: number = -1;
    codigo: number = -1;
    nombre: string = '';
    username: string = '';
    roles: string[] = [];
    token?: string;
    unencryptedPassword?: string;
}
