import { Injectable } from '@angular/core';
import { Schema } from './schema';
import { SCHEMA_LIST_MOCK } from './mock-schema';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  constructor() { }

  getSchemasList(): Schema[]{
    //todo get schema list from aws
    return SCHEMA_LIST_MOCK;
  }

  saveSchema(schema: Schema): boolean{ 
    //todo save schema to aws
    schema.properties = schema.properties.filter(p => p[0] != "");  //filter not empty properties

    return true;
  }

  deleteSchema(schema: Schema): boolean{  
    //todo delete schema from aws
    return true;
  } 

}

