import { Injectable } from '@angular/core';
import { Schema } from '../model/schema/schemaIfz';
import { SCHEMA_LIST_MOCK } from '../mocks/mock-schema';
import { SchemaImpl } from '../model/schema/schema';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  
  constructor() { }

  getDefaultSchema(): Schema {
    return SchemaImpl.prototype.getDefaultSchema();
  }

  getUserSchema(id: string): Schema{
    //todo get schema from aws
    const schema = SCHEMA_LIST_MOCK.filter(s => s.id == id)[0];
    return schema;
  }

  getSchemasList(): Schema[]{
    //todo get schema list from aws
    return SCHEMA_LIST_MOCK;
  }

  saveSchema(schema: Schema): boolean{ 
    //todo save schema to aws
    schema.properties = schema.properties.filter(p => p.getPropName() != "");  //filter not empty properties
    SCHEMA_LIST_MOCK.push(schema);
    return true;
  }

  deleteSchema(schema: Schema): boolean{  
    //todo delete schema from aws
    return true;
  } 

  /**
   * 
   * @returns a schema with all uniques properties from all schemas
   */
  getUniversalSchema(schemaList: Schema[]): Schema {
    let completeSchema: Schema = new SchemaImpl("0","All", []);  //create a empty schema
    let uniqueValues: string[] = [];
    for (let schema of schemaList) {
      for (let prop of schema.properties) {
        if (!uniqueValues.includes(prop.getPropName())) {
          uniqueValues.push(prop.getPropName());
          completeSchema.properties.push(prop);
        }
      }
    }
    return completeSchema;
  }
}

