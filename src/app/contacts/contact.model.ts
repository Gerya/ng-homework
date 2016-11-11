import { Identifiable } from '../common/common.interfaces';

export enum Gender{
    Female = 1,
    Male = 2
}

export class Contact implements Identifiable {
  constructor(
    public id: number | undefined,
    public name: string,
    public family: string,
    public gender? : Gender,
    public email? : string,
    public phone?:  string,
    public address?: string,

    ) {}
}
