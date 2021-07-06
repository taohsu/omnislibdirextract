import sketch from 'sketch'

export default function() {

console.log("This Sketch plugin extracts the library directories.")

let sketch = require('sketch')
//let artboard = sketch.Artboard
var async = require('sketch/async')
var UI = require('sketch/ui')
    
var Artboard = require('sketch/dom').Artboard
var Document = require('sketch/dom').Document
var Page = require('sketch/dom').Page
var Text = require('sketch/dom').Text

let document = sketch.getSelectedDocument()
let page = document.selectedPage
let libraryReferences = []
let DirectoryName = []
let libs = []
let cmps = ['Symbols', 'Layer styles', 'Text styles', 'Color variables']
let cmpsMethod = ['getImportableSymbolReferencesForDocument', 'getImportableLayerStyleReferencesForDocument', 'getImportableTextStyleReferencesForDocument', 'getImportableSwatchReferencesForDocument']
let s
let ss
let enabledLibraries = []
let thatPage;
let f = '';
let fs = [];


var UI = require('sketch/ui')

let libraries = require('sketch/dom').getLibraries()

for (let i = 0; i < libraries.length; i++) {
  if(libraries[i].enabled == true) {
    enabledLibraries.push(libraries[i]);
  }
}


for (let i = 0; i < enabledLibraries.length; i++) {
let lib = enabledLibraries[i].name;
libs.push(lib);
}

UI.getInputFromUser(
  "Select a library",
  {
    type: UI.INPUT_TYPE.selection,
    possibleValues: libs,
  },
  (err, value) => {
    if (err) {
      return console.log('too bad');
    }
    if (value) {
        s = libs.indexOf(value);
        console.log(s);
        //let myArtboard = new Artboard({ parent: page })


			UI.getInputFromUser(
  				"which component to export?",
               {
    				type: UI.INPUT_TYPE.selection,
    				possibleValues: cmps
  				},
  				(err, value) => {
    				if (err) {
      				return console.log('too bad');
    				}

    				if (value) {
            		ss = cmps.indexOf(value);
               var myPage = new Page({ parent: document, name: '_' + enabledLibraries[s].name + ' => ' + cmps[ss] })
               thatPage = myPage;
                let va = cmpsMethod[ss];
               libraryReferences = enabledLibraries[s][va](
  							document
                        )
						}

  				}
			)

    }
  }
)

console.log(ss);
let libraryDirectories = []

for (let i = 0; i < libraryReferences.length; i++){

    libraryDirectories.push(libraryReferences[i].name)
}

libraryDirectories = libraryDirectories.sort()
console.log(libraryDirectories);


let display = libraryDirectories.join("\r\n");
console.log(display);

var text = new Text({
  
  text: display,
  name: cmps[ss],
  //alignment: Text.Alignment.left,
  parent: thatPage,
  style: {
    alignment: 'left',
    fontFamily: 'system',
    textColor: '#F16E00'
  }
})

}