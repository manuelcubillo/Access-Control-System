import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SchemaService } from '../../services/schema.service';
import { Schema } from '../../model/schema/schemaIfz';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { v4 as uuid } from 'uuid';
import { AcsProp } from 'src/app/model/schema/acsProp';
import { type } from 'src/app/model/schema/acsPropIfz';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css']
})

/**
 * Schema component
 * edit, create and delete schemas
 */
export class SchemaComponent {

  selectedSchema!: Schema;
  schemaList: Schema[] = []; 
  count: Number = 1;
  countless: Number = 1; // IMPORTANT countless is count - 1 always to keep the index of the last element in view
  numbers: Number[] = []; 
  propertieMaxNumber: Number = 50; //max number of properties
  newSchemaOption: boolean = false; //show or hide new schema option
  

  constructor(
    private schemaService: SchemaService,
    private message: NzMessageService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.schemaList = this.schemaService.getSchemasList();
    this.numbers = Array(this.propertieMaxNumber.valueOf()).fill(0).map((x, i) => i);
    this.countless = this.count.valueOf() - 1;
  }


  newSchema(): void {
    this.newSchemaOption = true;  
    //create a uuid for the new schema
    let id = uuid();
    this.selectedSchema = {id: id, name: "", properties: [["",new AcsProp(type.default)]]};
    this.count = 1;
    this.countless = 0; // IMPORTANT countless is count - 1 always to keep the index of the last element in view
  }

  /**
   * show schema properties
   * update count and countless depending on the number of properties of the schema
   */
  showSchema(): void {
    console.log("selected schema: " + (this.selectedSchema as Schema).name);
    this.newSchemaOption = true;  
    this.count = (this.selectedSchema as Schema).properties.length;
    this.countless = this.count.valueOf() - 1;
  }


  /**
   * add new propertie to the selected schema
   * update count and countless
   */
  addNewPropertie(): void {
    if (this.propertieMaxNumber.valueOf() == this.count.valueOf()){
      // show error - max number of properties reached
      this.message.create("error", 'Max number of properties reached!');
    } else {
      this.count = this.count.valueOf() + 1;
      this.countless = this.countless.valueOf() + 1;
      this.selectedSchema.properties.push(["",new AcsProp(type.default)]);
    }
  }

  /**
   * remove last propertie to the selected schema
   * update count and countless
   */
  removePropertie(): void {
    if (this.count.valueOf() > 1){
      this.count = this.count.valueOf() - 1;
      this.countless = this.countless.valueOf() - 1;
      this.selectedSchema.properties.pop();
    }
  }

  /**
   * call server to save schema
   */
  saveSchema(): void {   
    console.log(this.selectedSchema);
    if (this.schemaService.saveSchema(this.selectedSchema as Schema)){
      this.message.create("success", 'Schema saved!');
    }else{
      this.message.create("error", 'Schema coudn\'t be saved!');
    }
  } 
  
  /**
   * call server to remove schema
   * hide properties
   * remove from the select schema list
   **/
  deleteSchema(): void {  
    console.log(this.selectedSchema);
    if(this.schemaService.deleteSchema(this.selectedSchema as Schema)){
      this.message.create("success", 'Schema deleted!');
      this.newSchemaOption = false;
      this.schemaList = this.schemaList.filter(s => s.name != this.selectedSchema.name);
    }else{
      this.message.create("error", 'Schema coudn\'t be saved!');
    }
  } 

}
