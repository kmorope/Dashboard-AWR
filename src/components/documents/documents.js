import "relativity-web-components/dist/dependencies/native-shim-all-in-one.js";
import * as rwc from "relativity-web-components/dist/relativity-web-components.umd.js"

export class Documents {
  constructor() {
    
  }

  randomData(){
      return [
        {
          ArtifactId: 85991,
          ControNumber: '6d6b4cc3-11d0-4999-8320-39c360a48074',
          FileName: 'LOTRON',
          FileExtension: 'pptx'
        },
        {
          ArtifactId: 88209,
          ControNumber: '20055344-1f0e-490e-9618-16c5a3001c23',
          FileName: 'URBANSHEE',
          FileExtension: 'pptx'
        },
        {
          ArtifactId: 69963,
          ControNumber: 'c814b1d9-c99f-4892-a162-3d6096cf42c5',
          FileName: 'COMVEX',
          FileExtension: 'xlsx'
        },
        {
          ArtifactId: 93257,
          ControNumber: '3f4f8b56-7749-46c4-ae80-8ec6d9e9b7a8',
          FileName: 'OTHERWAY',
          FileExtension: 'docx'
        },
        {
          ArtifactId: 57708,
          ControNumber: 'a8f52df1-9921-4589-b723-60e453b2614b',
          FileName: 'TALAE',
          FileExtension: 'png'
        },
        {
          ArtifactId: 73909,
          ControNumber: '45b39447-1009-43f1-86a8-ddbce2c716ff',
          FileName: 'SUREMAX',
          FileExtension: 'png'
        },
        {
          ArtifactId: 116125,
          ControNumber: '9109aa2a-6857-426d-ac86-f35d5363d88b',
          FileName: 'MANTRO',
          FileExtension: 'jpg'
        },
        {
          ArtifactId: 107084,
          ControNumber: '711c7589-3561-44e9-bddf-6acffbd758f0',
          FileName: 'ASSISTIA',
          FileExtension: 'docx'
        },
        {
          ArtifactId: 87614,
          ControNumber: 'a6568f05-1142-4965-a3c9-a1cf032d2e0c',
          FileName: 'SPLINX',
          FileExtension: 'pdf'
        },
        {
          ArtifactId: 78144,
          ControNumber: '4366c21e-d347-4440-9773-4cb47e1b2b79',
          FileName: 'APPLICA',
          FileExtension: 'jpg'
        },
        {
          ArtifactId: 103738,
          ControNumber: '8e39b165-85df-49d1-9ebc-429a1a03af42',
          FileName: 'KENGEN',
          FileExtension: 'pptx'
        },
        {
          ArtifactId: 86780,
          ControNumber: '8fedfa38-7b0b-41d4-9b00-899673a2fe76',
          FileName: 'HELIXO',
          FileExtension: 'pptx'
        },
        {
          ArtifactId: 104781,
          ControNumber: 'dbf4dca4-7c56-43fe-a33f-2ccf30ce9ba8',
          FileName: 'ENJOLA',
          FileExtension: 'pptx'
        },
        {
          ArtifactId: 43384,
          ControNumber: '13ca8915-d626-401c-ab9b-b12ad7bed7e3',
          FileName: 'UTARIAN',
          FileExtension: 'xlsx'
        }
      ]
  }

  attached() {
    var ns = rwc.dataManagement.grid;
    var grid = this.simpleGrid;
    console.log(grid)
    var colDefinitions = [];
    var colDefinition;

    colDefinition = new ns.ColumnDefinition();
    colDefinition.title = "Control Number";
    colDefinition.width = 600;
    colDefinition.content.dataLocation = "ControNumber";
    colDefinitions.push(colDefinition);

    colDefinition = new ns.ColumnDefinition();
    colDefinition.title = "File Name";
    colDefinition.content.dataLocation = "FileName";
    colDefinitions.push(colDefinition);

    colDefinition = new ns.ColumnDefinition();
    colDefinition.title = "File Extension";
    colDefinition.content.dataLocation = "FileExtension";
    colDefinitions.push(colDefinition);
    
    colDefinition = new ns.ColumnDefinition();
    colDefinition.title = "Artifact ID";
    colDefinition.content.dataLocation = "ArtifactId";
    colDefinitions.push(colDefinition); 

    grid.columns = colDefinitions;
    grid.data = this.randomData();
  }
};
