import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Model from "./Classes/Model";
import Attribute from "./Classes/Attribute";
import Connection from "./Classes/Connection";
import ConnectionEnd from "./Classes/ConnectionEnd";
import Entity from "./Classes/Entity";
import Level from "./Classes/Level";
import Method from "./Classes/Method";
import Inheritance from "./Classes/Inheritance";
import Subtype from "./Classes/Subtype";
import Supertype from "./Classes/Supertype";

import {
  mxGraph,
  mxParallelEdgeLayout,
  mxConstants,
  mxEdgeStyle,
  mxLayoutManager,
  mxGraphHandler,
  mxGuide,
  mxEdgeHandler,
  mxCell,
  mxGeometry,
  mxRubberband,
  mxDragSource,
  mxKeyHandler,
  mxCodec,
  mxClient,
  mxConnectionHandler,
  mxUtils,
  mxToolbar,
  mxEvent,
  mxImage,
  mxConstraintHandler,
  mxFastOrganicLayout,
  mxUndoManager,
  mxObjectCodec,
  mxHierarchicalLayout,
  mxConnectionConstraint,
  mxCellState,
  mxPoint,
  mxGraphModel,
  mxPerimeter,
  mxCompactTreeLayout,
  mxCellOverlay,
  mxWindow,
  mxEffects,
  mxDivResizer,
  mxForm

} from "mxgraph-js";
import { black } from "ansi-colors";
import mxGraphGridAreaEditor from "./MxGraphGridEditor";

export default class App extends Component {
  ccc = "works";
  container;
  graph;
  modelo;
  constructor(props) {
    super(props);

    this.state = {
      editable: true,
      clabjects: [
        {
          id: 1,
          type: "rect",
          text: "Jorge"
        },
        {
          id: 2,
          type: "circle",
          text: "Pedro"
        },
        {
          id: 3,
          type: "circle",
          text: "Paco"
        },
        {
          id: 4,
          type: "rect",
          text: "Luis"
        }
      ]
    };
    //this.LoadGraph = this.LoadGraph.bind(this);
  }

  componentDidMount() {
    this.container = ReactDOM.findDOMNode(this.refs.divGraph);
    this.graph = new mxGraph(this.container);
    this.modelo = new Model("Model1", "jorge", this.graph);
    this.modelo.works();
    this.LoadGraph(this.container, this.graph);
  }

  LoadGraph(container, graph) {
    //var container = ReactDOM.findDOMNode(this.refs.divGraph);

    //var zoomPanel = ReactDOM.findDOMNode(this.refs.divZoom);
    var graphHandlerGetInitialCellForEvent = mxGraphHandler.prototype.getInitialCellForEvent;
    mxGraphHandler.prototype.getInitialCellForEvent = function(me) {
     var cell = graphHandlerGetInitialCellForEvent.apply(this, arguments);
    
     if (graph.isPart(cell)) {
      cell = graph.getModel().getParent(cell)
     }
    
     return cell;
    };
    
    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported()) {
      // Displays an error message if the browser is not supported.
      mxUtils.error("Browser is not supported!", 200, false);
    } else {
      // Disables th<e built-in context menu
      mxEvent.disableContextMenu(container);

      // Creates the graph inside the given container
      //this.graph = new mxGraph(container);

      // Enables rubberband selection
      new mxRubberband(graph);
      container.style.position = 'absolute';
  //container.style.overflow = 'hidden';
  container.style.left = '0px';
  container.style.top = '36px';
  container.style.right = '0px';
  container.style.bottom = '36px';
  //container.style.background = 'url("javascript/examples/editors/images/grid.gif")';
  container.style.backgroundColor='white';
  container.style.overflow = 'scroll';
      // Gets the default parent for inserting new cells. This is normally the first
      // child of the root (ie. layer 0).
      var parent = graph.getDefaultParent();

      // Enables tooltips, new connections and panning
      graph.setPanning(true);
      graph.setTooltips(true);
      graph.setConnectable(true);
      graph.setEnabled(true);
      graph.setEdgeLabelsMovable(false);
      graph.setVertexLabelsMovable(false);
      graph.setGridEnabled(true);
      graph.setAllowDanglingEdges(false);
      graph.graphHandler.setRemoveCellsFromParent(false);
  graph.setHtmlLabels(true);
  mxEdgeHandler.prototype.snapToTerminals = true;

  var style = graph.getStylesheet().getDefaultVertexStyle();
  style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
  style[mxConstants.STYLE_EDITABLE] = 0;
  style[mxConstants.STYLE_MOVABLE] = 0;
  style[mxConstants.STYLE_RESIZABLE] = 0;
  style[mxConstants.STYLE_VERTICAL_ALIGN] = 'middle';
  style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
  style[mxConstants.STYLE_FONTSIZE] = 11;
  style[mxConstants.STYLE_STARTSIZE] = 22;
  style[mxConstants.STYLE_HORIZONTAL] = false;
  style[mxConstants.STYLE_FONTCOLOR] = 'black';
  style[mxConstants.STYLE_STROKECOLOR] = 'black';
  style[mxConstants.STYLE_FILLCOLOR] = 'white';
  style[mxConstants.SHADOW_OPACITY] = 0.5;
  style[mxConstants.SHADOWCOLOR] = '#C0C0C0';
  style[mxConstants.SHADOW_OFFSET_X] = 5;
  style[mxConstants.SHADOW_OFFSET_Y] = 6;
  style[mxConstants.STYLE_FOLDABLE] = false;


  style = mxUtils.clone(style);
  //style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
  style[mxConstants.STYLE_RESIZABLE] = 1;
  style[mxConstants.STYLE_MOVABLE] = 1;
  style[mxConstants.STYLE_FONTSIZE] = 10;
  style[mxConstants.STYLE_ROUNDED] = false;
  style[mxConstants.STYLE_HORIZONTAL] = true;
  delete style[mxConstants.STYLE_VERTICAL_ALIGN];
  delete style[mxConstants.STYLE_STARTSIZE];
  style[mxConstants.STYLE_SHADOW] = '1';
  //style[mxConstants.STYLE_FILLCOLOR]='none';
  //style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'none';
  //style[mxConstants.STYLE_STROKECOLOR] = 'none';
  //style[mxConstants.STYLE_IMAGE]='jorge.jpg';	
  //style[mxConstants.STYLE_IMAGE_WIDTH]=140;
  //style[mxConstants.STYLE_IMAGE_HEIGHT]=70;

  graph.getStylesheet().putCellStyle('entity', style);
  style = mxUtils.clone(style);
  style[mxConstants.STYLE_ROUNDED] = true;
  style[mxConstants.STYLE_ARCSIZE] = 50;
  style[mxConstants.STYLE_FOLDABLE] = true;
  style[mxConstants.STYLE_SHADOW] = '1';
  graph.getStylesheet().putCellStyle('connection', style);

  style = mxUtils.clone(style);
  style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
  style[mxConstants.STYLE_RESIZABLE] = 1;
  style[mxConstants.STYLE_MOVABLE] = 1;
  style[mxConstants.STYLE_FONTSIZE] = 10;
  style[mxConstants.STYLE_ROUNDED] = false;
  style[mxConstants.STYLE_HORIZONTAL] = true;
  delete style[mxConstants.STYLE_VERTICAL_ALIGN];
  delete style[mxConstants.STYLE_STARTSIZE];
  //style[mxConstants.STYLE_FILLCOLOR]='none';
  //style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'none';
  //style[mxConstants.STYLE_STROKECOLOR] = 'none';
  //style[mxConstants.STYLE_IMAGE]='jorge.jpg';	
  //style[mxConstants.STYLE_IMAGE_WIDTH]=140;
  //style[mxConstants.STYLE_IMAGE_HEIGHT]=70;
  graph.getStylesheet().putCellStyle('inheritance', style);

  style = mxUtils.clone(style);
  style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
  style[mxConstants.STYLE_ROUNDED] = false;
  style[mxConstants.STYLE_RESIZABLE] = 0;
  style[mxConstants.STYLE_MOVABLE] = 0;
  style[mxConstants.STYLE_FONTSIZE] = 10;
  style[mxConstants.STYLE_HORIZONTAL] = true;
  style[mxConstants.STYLE_STROKECOLOR] = 'none';
  delete style[mxConstants.STYLE_STARTSIZE];
  style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'none';
  style[mxConstants.STYLE_FILLCOLOR] = 'none';
  style[mxConstants.STYLE_ALIGN]='left';
  graph.getStylesheet().putCellStyle('attribute', style);
  graph.getStylesheet().putCellStyle('method', style);
  
  style = mxUtils.clone(style);
  style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
  style[mxConstants.STYLE_RESIZABLE] = 1;
  style[mxConstants.STYLE_MOVABLE] = 1;
  style[mxConstants.STYLE_FONTSIZE] = 10;
  style[mxConstants.STYLE_ROUNDED] = false;
  style[mxConstants.STYLE_HORIZONTAL] = true;
  delete style[mxConstants.STYLE_VERTICAL_ALIGN];
  delete style[mxConstants.STYLE_STARTSIZE];
  //style[mxConstants.STYLE_FILLCOLOR]='none';
  //style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'none';
  //style[mxConstants.STYLE_STROKECOLOR] = 'none';
  //style[mxConstants.STYLE_IMAGE]='jorge.jpg';	
  //style[mxConstants.STYLE_IMAGE_WIDTH]=140;
  //style[mxConstants.STYLE_IMAGE_HEIGHT]=70;

  graph.getStylesheet().putCellStyle('labelConn', style);

  style = mxUtils.clone(style);
  style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
  style[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
  delete style[mxConstants.STYLE_ROUNDED];
  graph.getStylesheet().putCellStyle('state', style);

  style = mxUtils.clone(style);
  style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RHOMBUS;
  style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RhombusPerimeter;
  style[mxConstants.STYLE_VERTICAL_ALIGN] = 'top';
  style[mxConstants.STYLE_SPACING_TOP] = 40;
  style[mxConstants.STYLE_SPACING_RIGHT] = 64;
  graph.getStylesheet().putCellStyle('condition', style);

  style = mxUtils.clone(style);
  style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_DOUBLE_ELLIPSE;
  style[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
  style[mxConstants.STYLE_SPACING_TOP] = 28;
  style[mxConstants.STYLE_FONTSIZE] = 14;
  style[mxConstants.STYLE_FONTSTYLE] = 1;
  delete style[mxConstants.STYLE_SPACING_RIGHT];
  graph.getStylesheet().putCellStyle('end', style);

  style = graph.getStylesheet().getDefaultEdgeStyle();
  style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
  style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_BLOCK;
  style[mxConstants.STYLE_ROUNDED] = true;
  style[mxConstants.STYLE_FONTCOLOR] = 'black';
  style[mxConstants.STYLE_STROKECOLOR] = 'black';

  style = mxUtils.clone(style);
  style[mxConstants.STYLE_MOVABLE] = 0;
  style[mxConstants.STYLE_RESIZABLE] = 0;
  style[mxConstants.STYLE_EDITABLE] = 0;
  style[mxConstants.STYLE_DASHED] = false;
  style[mxConstants.STYLE_ENDARROW] = 'none';
  style[mxConstants.STYLE_STARTARROW] = 'none';
  graph.getStylesheet().putCellStyle('crossover0', style);
  
  style = mxUtils.clone(style);
  style[mxConstants.STYLE_MOVABLE] = 0;
  style[mxConstants.STYLE_RESIZABLE] = 0;
  style[mxConstants.STYLE_EDITABLE] = 0;
  style[mxConstants.STYLE_DASHED] = false;
  style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_OPEN;
  style[mxConstants.STYLE_STARTARROW] = 'none';
  graph.getStylesheet().putCellStyle('crossover1', style);
  
  style = mxUtils.clone(style);
  style[mxConstants.STYLE_MOVABLE] = 0;
  style[mxConstants.STYLE_RESIZABLE] = 0;
  style[mxConstants.STYLE_EDITABLE] = 0;
  style[mxConstants.STYLE_DASHED] = false;
  style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_BLOCK;
  style[mxConstants.STYLE_ENDFILL] = 0;
  style[mxConstants.STYLE_STARTARROW] = 'none';
  graph.getStylesheet().putCellStyle('supertype', style);

  style = mxUtils.clone(style);
  style[mxConstants.STYLE_MOVABLE] = 0;
  style[mxConstants.STYLE_RESIZABLE] = 0;
  style[mxConstants.STYLE_EDITABLE] = 0;
  style[mxConstants.STYLE_DASHED] = false;
  style[mxConstants.STYLE_ENDARROW] = 'none';
  style[mxConstants.STYLE_STARTARROW] = 'none';
  graph.getStylesheet().putCellStyle('subtype', style);

graph.isPart = function(cell) {
   var state = this.view.getState(cell);
   var style = (state != null) ? state.style : this.getCellStyle(cell);

   return style['constituent'] == '1';
  };

  // Redirects selection to parent
  graph.selectCellForEvent = function(cell) {
   if (this.isPart(cell)) {
    cell = this.model.getParent(cell);
   }

   mxGraph.prototype.selectCellForEvent.apply(this, arguments);
  };

  graph.getTooltip = function(state)
	{
		var cell = state.cell;
		var model = this.getModel();
		var style = this.getModel().getStyle(cell);
		
		if (style == 'labelConn') 
		{
			return 'Click to correct offset ';
		}
		else
		{
			return this.getLabel(cell);
		}
	};

      graph.popupMenuHandler.factoryMethod = function(menu, cell, evt) {
        if (cell) {
          if (cell.edge === true) {
            menu.addItem("Delete connection", null, function() {
              this.alert();
              //graph.removeCells([cell]);
              mxEvent.consume(evt);
            });
          } else {
            menu.addItem("Edit child node", null, function() {
              // mxUtils.alert('Edit child node: ');
              // selectionChanged(graph)
              this.test();

            });
            menu.addItem("Delete child node", null, function() {
              graph.removeCells([cell]);
              mxEvent.consume(evt);
            });
          }
        } else {
          menu.addItem("TEST!!!!!", null, function() {
            // mxUtils.alert('Edit child node: ');
            // selectionChanged(graph)
          });
        }
      };

      graph.getModel().beginUpdate();
      
        //mxGrapg component
        var doc = mxUtils.createXmlDocument();
        var node = doc.createElement("Node");
        node.setAttribute("ComponentID", "[P01]");
        
        this.display(graph);
        

        
        
        

        //data
      

      // Enables rubberband (marquee) selection and a handler for basic keystrokes
      var rubberband = new mxRubberband(graph);
      var keyHandler = new mxKeyHandler(graph);

      

     
    }
  }

  test=()=>{alert('ok')};


  createPopupMenu = (graph, menu, cell, evt) => {
    if (cell != null) {
      //var style = graph.getModel().getStyle(cell);
      var cellId = cell.getId();
      var model=graph.getModel()
      var style = model.getObjectById(cellId).kind;
      
      if (style == 'level') {
       menu.addItem('Properties', 'javascript/examples/editors/images/properties.gif', function() {
    
        this.showProperties(graph);
       });
       menu.addItem('New Entity', 'javascript/examples/editors/images/properties.gif', function() {
        this.newEntity(graph,model);
       });
       menu.addItem('New Connection', 'javascript/examples/editors/images/properties.gif', function() {
         this.newConnection(graph,model);
         });
       menu.addItem('New Inheritance', 'javascript/examples/editors/images/properties.gif', function() {
         this.newInheritance(graph,model);
         });
     
      }
    
      if (style == 'connection') {
         menu.addItem('Properties', 'javascript/examples/editors/images/properties.gif', function() {
    
           this.editConnection(graph,model);
         });
         menu.addItem('New Attribute', 'javascript/examples/editors/images/properties.gif', function() {
          //editor.execute('addNewAttributeConnection');
         });
         menu.addItem('New Method', 'javascript/examples/editors/images/properties.gif', function() {
          //editor.execute('addNewMethodConnection');
         });
      
    
        }
      
      
      
      if (style == 'inheritance') {
         menu.addItem('Properties', 'javascript/examples/editors/images/properties.gif', function() {
    
          this.editInheritance(graph,model);
         });
      
    
        }
      
      if (style == 'subtype') {
         menu.addItem('Properties', 'javascript/examples/editors/images/properties.gif', function() {
    
          this.showProperties(graph);
         });
      
    
        }
      
      
      
      if (style == 'entity') {
       menu.addItem('Properties', 'javascript/examples/editors/images/properties.gif', function() {
    
         this.editEntity(graph,model);
       });
       menu.addItem('New Attribute', 'javascript/examples/editors/images/properties.gif', function() {
       // editor.execute('addNewAttribute');
       });
       menu.addItem('New Method', 'javascript/examples/editors/images/properties.gif', function() {
        //editor.execute('addNewMethod');
       });
     
    
       
       menu.addItem('Connect to ->', 'javascript/examples/editors/images/properties.gif', function() {
          this.connectTo(graph,model,cell);
         }, null, null, true);
       
       menu.addItem('Supertype ->', 'javascript/examples/editors/images/properties.gif', function() {
         this.subtype(graph,model,cell,'supertype');
         }, null, null, true);
       
       menu.addItem('Subtype ->', 'javascript/examples/editors/images/properties.gif', function() {
          this.subtype(graph,model,cell,'subtype');
         }, null, null, true);
    
       var ent = model.getObjectById(cellId);
       if((ent.levelNo<(model.levels.length-1))){
       menu.addItem('Instantiate v', 'javascript/examples/editors/images/properties.gif', function() {
       
         
        
         this.instEntity(graph,model,cell,'subtype');
         }, null, null, true);
      }
       
       if(ent.levelNo>0){
       menu.addItem('Upstantiate ^', 'javascript/examples/editors/images/properties.gif', function() {
         var found=false;
         for(let k=0;k<model.levels[ent.levelNo-1].entities.length;k++){
          if(model.levels[ent.levelNo-1].entities[k].name==ent.directType){
            
            
            found=true;
            break;
          }
         
          }
         if(!found){
         this.upEntity(graph,model,cell,'subtype');
         }else{
           alert("This entity already has a parent");
         }
         }, null, null, true);
     
       }
     
    
    
      
      }
    
     } else {
      menu.addItem('New Level', 'javascript/examples/editors/images/properties.gif', function() {
       this.newLevel(graph,model,1);
      });
      menu.addItem('New Level (At position 0)', 'javascript/examples/editors/images/properties.gif', function() {
         this.newLevel(graph,model,0);
        });
    
     }
  };

   showModalWindow2=(title, content, width, height)=> {
    var background = document.createElement('div');

    var x = Math.max(0, document.body.scrollWidth / 2 - width / 2);
    var y = Math.max(10, (document.body.scrollHeight ||
     document.documentElement.scrollHeight) / 2 - height * 2 / 3);
    var wnd = new mxWindow(title, content, x, y, width, height, false, true);
    wnd.setClosable(true);
 
    // Fades the background out after after the window has been closed
    wnd.addListener(mxEvent.DESTROY, function(evt) {
     mxEffects.fadeOut(background, 50, true,
      10, 30, true);
    });
 
    wnd.setVisible(true);
 
    return wnd;
   };
 
 
  showModalWindow=(title, content, width, height)=> {
  var background = document.createElement('div');
  
  
  background.style.position = 'absolute';
  background.style.left = '0px';
  background.style.top = '0px';
  background.style.right = '0px';
  background.style.bottom = '0px';
  background.style.background = 'black';
  mxUtils.setOpacity(background, 50);
  document.body.appendChild(background);
 
  if (mxClient.IS_QUIRKS) {
   new mxDivResizer(background);
  }
 
  var x = Math.max(0, document.body.scrollWidth / 2 - width / 2);
  var y = Math.max(10, (document.body.scrollHeight ||
   document.documentElement.scrollHeight) / 2 - height * 2 / 3);
  var wnd = new mxWindow(title, content, x, y, width, height, false, true);
  wnd.setClosable(true);
 
  // Fades the background out after after the window has been closed
  wnd.addListener(mxEvent.DESTROY, function(evt) {
   mxEffects.fadeOut(background, 50, true,
    10, 30, true);
  });
 
  wnd.setVisible(true);
 
  return wnd;
 };

  newLevel=(graph,modelo,where)=> {
  // Creates a form for the user object inside
  // the cell
  var txt='2';
  var form = new mxForm('New Level');

  // Adds a field for the columnname
  var nameField = form.addText('Name', 'Level 0');
 
  var wnd = null;

  // Defines the function to be executed when the
  // OK button is pressed in the dialog
  var okFunction = function() {
   
    let level1 = new Level(nameField.value, graph);
    modelo.updatePosition();
    
    modelo.addLevel(level1,where);
    modelo.build();
    //toolbarWindow.setVisible(true);
    wnd.destroy();
  }

  // Defines the function to be executed when the
  // Cancel button is pressed in the dialog
  var cancelFunction = function() {
    //toolbarWindow.setVisible(true);
    wnd.destroy();
  }
  form.addButtons(okFunction, cancelFunction);

  var parent = graph.getDefaultParent();

  wnd = this.showModalWindow('New Level', form.table, 240, 240);
 };

 newEntity2=(graph,modelo) =>{

 var form = new mxForm('New Entity');
 var nameField = form.addText('Name', 'Entity 1');	
 var wnd = null;
 var okFunction = function() {
      
   let entity1 = new Entity(nameField.value);
   var cell = graph.getSelectionCells();
   var levelId = cell[0].getId();
   //alert(""+levelId);
   var idInModel = modelo.getLevelById(levelId);
   modelo.updatePosition();
   //alert(""+idInModel);
   modelo.levels[idInModel].addEntity(entity1);
   modelo.build();
   wnd.destroy();
  }

 var cancelFunction = function() {
  wnd.destroy();
 }
 form.addButtons(okFunction, cancelFunction);
 var parent = graph.getDefaultParent();
 wnd = this.showModalWindow('New Entity', form.table, 240, 240);
};
 

 editEntity=(graph,modelo)=>{
 
   var testw=document.createElement('div');
   testw.style.position = 'absolute';
   testw.style.overflow = 'hidden';
   //outline.style.left = '60px';
   testw.style.top = '0px';
   testw.style.left = '0px';
   testw.style.width = '200px';
   testw.style.height = '500px';
   var wnd=null;
   //var countryList=document.createElement("select");
   //var countryOption = new Option ("jjjj", "jjj");
   //countryList.options.add (countryOption);
   var nameField = document.createElement("input");
   var potencyField = document.createElement("input");
   var directTypeField = document.createElement("input");
   var imageField = document.createElement("input");
 
 
   
   var okbutton = mxUtils.button('ok', function(evt) {
     
      
     
       //entity1.styleText=('image='+imageField.value);
       //alert(""+entity1.styleText);
       
     modelo.getObjectById(graph.getSelectionCells()[0].getId()).name=nameField.value;
     //modelo.getObjectById(graph.getSelectionCells()[0].getId()).potency=potencyField.value;
     //modelo.getObjectById(graph.getSelectionCells()[0].getId()).directType=directTypeField.value;
     modelo.getObjectById(graph.getSelectionCells()[0].getId()).styleText=imageField.value;
     modelo.updatePosition();
     modelo.build();
     wnd.destroy();

     });
   var cancelButton = mxUtils.button('cancel', function(evt) {
      wnd.destroy();
   });
   let entity1 = modelo.getObjectById(graph.getSelectionCells()[0].getId());
   testw.appendChild(document.createTextNode("Name: "));
   nameField.value=entity1.name;
   testw.appendChild(nameField);
   //testw.appendChild(document.createElement("br"));
   //testw.appendChild(document.createTextNode("Potency: "));
   //potencyField.value=entity1.potency;
   //testw.appendChild(potencyField);
   //testw.appendChild(document.createElement("br"));
   //testw.appendChild(document.createTextNode("Direct type: "));
   //directTypeField.value=entity1.directType;
   //testw.appendChild(directTypeField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(document.createTextNode("Image URL: "));
   imageField.value=entity1.styleText;
   testw.appendChild(imageField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(okbutton);
   testw.appendChild(cancelButton);
   var x = Math.max(0, document.body.scrollWidth / 2 - 200 / 2);
   var y = Math.max(10, (document.body.scrollHeight ||
    document.documentElement.scrollHeight) / 2 - 200 * 2 / 3);
   wnd = new mxWindow(entity1.name, testw, x, y, 200, 200, true, true);
   wnd.setMaximizable(false);
   wnd.setMinimizable(false);
   wnd.setResizable(true);
   wnd.setVisible(true);
   wnd.setResizable(false);
   
   
   var background = document.createElement('div');	
   background.style.position = 'absolute';
   background.style.left = '0px';
   background.style.top = '0px';
   background.style.right = '0px';
   background.style.bottom = '0px';
   background.style.background = 'black';
   mxUtils.setOpacity(background, 50);
   document.body.appendChild(background);

   

   // Fades the background out after after the window has been closed
   wnd.addListener(mxEvent.DESTROY, function(evt) {
    mxEffects.fadeOut(background, 50, true,
     10, 30, true);
   });

   wnd.setVisible(true);
   
   };




 newEntity=(graph,modelo)=>{
 
   var testw=document.createElement('div');
   testw.style.position = 'absolute';
   testw.style.overflow = 'hidden';
   //outline.style.left = '60px';
   testw.style.top = '0px';
   testw.style.left = '0px';
   testw.style.width = '200px';
   testw.style.height = '500px';
   var wnd=null;
   //var countryList=document.createElement("select");
   //var countryOption = new Option ("jjjj", "jjj");
   //countryList.options.add (countryOption);
   var nameField = document.createElement("input");
   var potencyField = document.createElement("input");
   var directTypeField = document.createElement("input");
   var imageField = document.createElement("input");
 
 
   
   var okbutton = mxUtils.button('ok', function(evt) {
     
       var entity1 = new Entity(nameField.value,0,"",imageField.value);
     
       //entity1.styleText=('image='+imageField.value);
       //alert(""+entity1.styleText);
       var cell = graph.getSelectionCells();
     var levelId = cell[0].getId();
     var idInModel = modelo.getLevelById(levelId);
     modelo.updatePosition();
     modelo.levels[idInModel].addEntity(entity1);
     modelo.build();
     wnd.destroy();

     });
   var cancelButton = mxUtils.button('cancel', function(evt) {
      wnd.destroy();
   });
 
   testw.appendChild(document.createTextNode("Name: "));
   testw.appendChild(nameField);
   testw.appendChild(document.createElement("br"));
   //testw.appendChild(document.createTextNode("Potency: "));
   //testw.appendChild(potencyField);
   //testw.appendChild(document.createElement("br"));
   //testw.appendChild(document.createTextNode("Direct type: "));
   //testw.appendChild(directTypeField);
   //testw.appendChild(document.createElement("br"));
   testw.appendChild(document.createTextNode("Image URL: "));
   testw.appendChild(imageField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(okbutton);
   testw.appendChild(cancelButton);
   var x = Math.max(0, document.body.scrollWidth / 2 - 200 / 2);
   var y = Math.max(10, (document.body.scrollHeight ||
    document.documentElement.scrollHeight) / 2 - 200 * 2 / 3);
   wnd = new mxWindow('New Entity', testw, x, y, 200, 200, true, true);
   wnd.setMaximizable(false);
   wnd.setMinimizable(false);
   wnd.setResizable(true);
   wnd.setVisible(true);
   wnd.setResizable(false);
   
   
   var background = document.createElement('div');	
   background.style.position = 'absolute';
   background.style.left = '0px';
   background.style.top = '0px';
   background.style.right = '0px';
   background.style.bottom = '0px';
   background.style.background = 'black';
   mxUtils.setOpacity(background, 50);
   document.body.appendChild(background);

   

   // Fades the background out after after the window has been closed
   wnd.addListener(mxEvent.DESTROY, function(evt) {
    mxEffects.fadeOut(background, 50, true,
     10, 30, true);
   });

   wnd.setVisible(true);
   
   };


   
    instEntity=(graph,modelo)=>{
     
     var testw=document.createElement('div');
     testw.style.position = 'absolute';
     testw.style.overflow = 'hidden';
     //outline.style.left = '60px';
     testw.style.top = '0px';
     testw.style.left = '0px';
     testw.style.width = '200px';
     testw.style.height = '500px';
     var wnd=null;
     //var countryList=document.createElement("select");
     //var countryOption = new Option ("jjjj", "jjj");
     //countryList.options.add (countryOption);
     var nameField = document.createElement("input");
   
   
   
     
     var okbutton = mxUtils.button('ok', function(evt) {
       
       //entity1.styleText=('image='+imageField.value);
         //alert(""+entity1.styleText);
         var cell = graph.getSelectionCells();
       var entId = cell[0].getId();
       var ent = modelo.getObjectById(entId);
         
       //if((ent.levelNo<(modelo.levels.length-1))){
             //if(ent.potency>0){
         //var entity1 = new Entity(nameField.value,(ent.potency-1),ent.name,ent.styleText);
             //}else{
               if(ent.potency>0){
               var entity1 = new Entity(nameField.value,(ent.potency-1),ent.name,ent.styleText);
               }else{
                 var entity1 = new Entity(nameField.value,0,ent.name,ent.styleText);	
               
               
               //entity1.potency++;
               var j,k,z,l;
               var found=true;
               var dt=entity1.directType;
               z=entity1.potency;
               for (j=(ent.levelNo);j>=0;j--){
                 if (!found){
                   z--;
                   break;
                   
                 }
                 found=false;
                 z++;
                 for(let k=0;k<modelo.levels[j].entities.length;k++){
                   if(modelo.levels[j].entities[k].name==dt){
                     modelo.levels[j].entities[k].potency=z;
                     if(modelo.levels[j].entities[k].directType!=""){
                     dt=modelo.levels[j].entities[k].directType;
                     }
                     found=true;
                     
                   }
                   
                 }
               }
               
             
               var list1=[],list2=[];
               list1.push(dt);
               alert(""+dt);
               for (let j=0;j<modelo.levels.length;j++){
                 found=false;
                 for (let l=0;l<list1.length;l++){
                 
                 for(let k=0;k<modelo.levels[j].entities.length;k++){
                   if(modelo.levels[j].entities[k].directType==list1[l]){
                     modelo.levels[j].entities[k].potency=z;
                     list2.push(modelo.levels[j].entities[k].name);
                     
                     found=true;
                   }
                 }
                 
                   
                 }
                 
                 z--;
                 if(found){
                 var list1 = Array.from(list2);
                 }
               }
               
               
               }
               
             
             var i;
         for(let i=0;i<ent.attributes.length;i++){
           if (ent.attributes[i].durability>0){
             var att1 = new Attribute(ent.attributes[i].name,ent.attributes[i].type,ent.attributes[i].value,(ent.attributes[i].durability-1), ent.attributes[i].mutability);
             entity1.addAttribute(att1);
           }
         }
         for(let i=0;i<ent.methods.length;i++){
           if (ent.methods[i].durability>0){
           var mtd1 = new Method(ent.methods[i].name, ent.methods[i].signature,ent.methods[i].body,(ent.methods[i].durability-1));
           entity1.addMethod(mtd1);
           }
         }
        
       
       modelo.updatePosition();
       modelo.levels[(ent.levelNo+1)].addEntity(entity1);
   
       modelo.build();
         
       wnd.destroy();
        

     });
     var cancelButton = mxUtils.button('cancel', function(evt) {
        wnd.destroy();
     });
   
     testw.appendChild(document.createTextNode("Name: "));
     testw.appendChild(nameField);
     testw.appendChild(document.createElement("br"));
     testw.appendChild(okbutton);
     testw.appendChild(cancelButton);
     var x = Math.max(0, document.body.scrollWidth / 2 - 200 / 2);
     var y = Math.max(10, (document.body.scrollHeight ||
      document.documentElement.scrollHeight) / 2 - 200 * 2 / 3);
     wnd = new mxWindow('New Entity', testw, x, y, 200, 200, true, true);
     wnd.setMaximizable(false);
     wnd.setMinimizable(false);
     wnd.setResizable(true);
     wnd.setVisible(true);
     wnd.setResizable(false);
     
     
     var background = document.createElement('div');	
     background.style.position = 'absolute';
     background.style.left = '0px';
     background.style.top = '0px';
     background.style.right = '0px';
     background.style.bottom = '0px';
     background.style.background = 'black';
     mxUtils.setOpacity(background, 50);
     document.body.appendChild(background);

     

     // Fades the background out after after the window has been closed
     wnd.addListener(mxEvent.DESTROY, function(evt) {
      mxEffects.fadeOut(background, 50, true,
       10, 30, true);
     });

     wnd.setVisible(true);
     
     };


     
      upEntity(graph,modelo){
       
       var testw=document.createElement('div');
       testw.style.position = 'absolute';
       testw.style.overflow = 'hidden';
       //outline.style.left = '60px';
       testw.style.top = '0px';
       testw.style.left = '0px';
       testw.style.width = '200px';
       testw.style.height = '500px';
       var wnd=null;
       //var countryList=document.createElement("select");
       //var countryOption = new Option ("jjjj", "jjj");
       //countryList.options.add (countryOption);
       var nameField = document.createElement("input");
     
     
     
       
       var okbutton = mxUtils.button('ok', function(evt) {
         
         //entity1.styleText=('image='+imageField.value);
           //alert(""+entity1.styleText);
           var cell = graph.getSelectionCells();
         var entId = cell[0].getId();
         var ent = modelo.getObjectById(entId);
           var found=false;
         //if((ent.levelNo<(modelo.levels.length-1))){
               //if(ent.potency>0){
           //var entity1 = new Entity(nameField.value,(ent.potency-1),ent.name,ent.styleText);
               //}else{
         for(let k=0;k<modelo.levels[ent.levelNo-1].entities.length;k++){
             if(modelo.levels[ent.levelNo-1].entities[k].name==ent.directType){
               
               found=true;
               break;
               
             }
             
           }	
               
               if (!found){
           var entity1 = new Entity(nameField.value,(ent.potency+1),"",ent.styleText);
               ent.directType=entity1.name;
               
               var i;
           for(let i=0;i<ent.attributes.length;i++){
             if (ent.attributes[i].durability>0){
               var att1 = new Attribute(ent.attributes[i].name,ent.attributes[i].type,ent.attributes[i].value,(ent.attributes[i].durability-1), ent.attributes[i].mutability);
               entity1.addAttribute(att1);
             }
           }
           for(let i=0;i<ent.methods.length;i++){
             if (ent.methods[i].durability>0){
             var mtd1 = new Method(ent.methods[i].name, ent.methods[i].signature,ent.methods[i].body,(ent.methods[i].durability-1));
             entity1.addMethod(mtd1);
             }
           }
          
         
         modelo.updatePosition();
         modelo.levels[(ent.levelNo-1)].addEntity(entity1);
     
         modelo.build();
               }else{
                 alert("This entity already has a parent on the deeper level");
               }
         wnd.destroy();
          

       });
       var cancelButton = mxUtils.button('cancel', function(evt) {
          wnd.destroy();
       });
     
       testw.appendChild(document.createTextNode("Name: "));
       testw.appendChild(nameField);
       testw.appendChild(document.createElement("br"));
       testw.appendChild(okbutton);
       testw.appendChild(cancelButton);
       var x = Math.max(0, document.body.scrollWidth / 2 - 200 / 2);
       var y = Math.max(10, (document.body.scrollHeight ||
        document.documentElement.scrollHeight) / 2 - 200 * 2 / 3);
       wnd = new mxWindow('New Entity', testw, x, y, 200, 200, true, true);
       wnd.setMaximizable(false);
       wnd.setMinimizable(false);
       wnd.setResizable(true);
       wnd.setVisible(true);
       wnd.setResizable(false);
       
       
       var background = document.createElement('div');	
       background.style.position = 'absolute';
       background.style.left = '0px';
       background.style.top = '0px';
       background.style.right = '0px';
       background.style.bottom = '0px';
       background.style.background = 'black';
       mxUtils.setOpacity(background, 50);
       document.body.appendChild(background);

       

       // Fades the background out after after the window has been closed
       wnd.addListener(mxEvent.DESTROY, function(evt) {
        mxEffects.fadeOut(background, 50, true,
         10, 30, true);
       });

       wnd.setVisible(true);
       
       };


     
     
     
 remove(graph,modelo) {

      
 
   var cell = graph.getSelectionCells();
   var id = cell[0].getId();
   modelo.updatePosition();
   modelo.remove(id);
   modelo.build();

 
};

 connectTo(graph,model,cell) {

  var testw=document.createElement('div');
   testw.style.position = 'absolute';
   testw.style.overflow = 'hidden';
   //outline.style.left = '60px';
   testw.style.top = '0px';
   testw.style.left = '0px';
   testw.style.width = '200px';
   testw.style.height = '500px';
   var wnd=null;
   //var countryList=document.createElement("select");
   //var countryOption = new Option ("jjjj", "jjj");
   //countryList.options.add (countryOption);
   var connectionsList=document.createElement("select");
   var levelId = cell.getParent().getId();
    var idInModel = model.getLevelById(levelId);
    var conns = model.levels[idInModel].connections;
    var i;
    
    for (let i = 0; i < conns.length; i++) {

     var connection = conns[i];
     //var connOption = new Option (i, ("   "+connection.name+"  "));
     connectionsList.options.add(new Option (("   "+connection.name+"  "),i));
     
      
      
    
    }
   
   
 
   var nameField = document.createElement("input");
   var roleField = document.createElement("input");
   var navigableField = document.createElement("input");
   var lowerField = document.createElement("input");
   var upperField = document.createElement("input");
 
 
   
   var okbutton = mxUtils.button('ok', function(evt) {
     
     
     var entityId = cell.getId();
        var entity = model.getEntityById(entityId);
        //alert(""+connectionsList.value);
        let end1 = new ConnectionEnd(nameField.value, entity, conns[connectionsList.value],roleField.value,navigableField.value,lowerField.value,upperField.value);
        model.updatePosition();
        model.levels[idInModel].addConnectionEnd(end1);
        model.build();

     wnd.destroy();

     });
   var cancelButton = mxUtils.button('cancel', function(evt) {
      wnd.destroy();
   });   
 
   testw.appendChild(document.createTextNode("Name: "));
   testw.appendChild(nameField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(document.createTextNode("Connection: "));
   testw.appendChild(connectionsList);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(document.createTextNode("Role Name: "));
   testw.appendChild(roleField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(document.createTextNode("navigableFrom: "));
   testw.appendChild(navigableField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(document.createTextNode("Lower: "));
   testw.appendChild(lowerField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(document.createTextNode("Upper: "));
   testw.appendChild(upperField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(okbutton);
   testw.appendChild(cancelButton);
   var x = Math.max(0, document.body.scrollWidth / 2 - 200 / 2);
   var y = Math.max(10, (document.body.scrollHeight ||
    document.documentElement.scrollHeight) / 2 - 200 * 2 / 3);
   wnd = new mxWindow('Connect to', testw, x, y, 200, 200, true, true);
   wnd.setMaximizable(false);
   wnd.setMinimizable(false);
   wnd.setResizable(true);
   wnd.setVisible(true);
   wnd.setResizable(false);
   
   
   var background = document.createElement('div');	
   background.style.position = 'absolute';
   background.style.left = '0px';
   background.style.top = '0px';
   background.style.right = '0px';
   background.style.bottom = '0px';
   background.style.background = 'black';
   mxUtils.setOpacity(background, 50);
   document.body.appendChild(background);

   

   // Fades the background out after after the window has been closed
   wnd.addListener(mxEvent.DESTROY, function(evt) {
    mxEffects.fadeOut(background, 50, true,
     10, 30, true);
   });

   wnd.setVisible(true);
   


};



 supertype(graph,model,cell) {

 
 var form = new mxForm('New Supertype Relation');
 var nameField = form.addText('Name', 'Uses');	
 
 var wnd = null;
 
 
   var levelId = cell.getParent().getId();
    var idInModel = model.getLevelById(levelId);
    var superts = model.levels[idInModel].inheritances;
    var i;

    var combo= form.addCombo('Connect to: ',true,superts.length);
    
    for (let i = 0; i < superts.length; i++) {

     var supertp = superts[i];
     form.addOption(combo,("   "+supertp.name+"  "),i,false);
      
    }
 
 
 var okFunction = function() {
      
   var name1 = nameField.value;
   var entityId = cell.getId();
      var entity = model.getEntityById(entityId);
      let end1 = new Supertype(name1, entity, superts[combo.value]);
      model.updatePosition();
      model.levels[idInModel].addSupertype(end1);
      model.build();

   wnd.destroy();
  }

 var cancelFunction = function() {
  wnd.destroy();
 }
 form.addButtons(okFunction, cancelFunction);
 var parent = graph.getDefaultParent();
 var wnd = this.showModalWindow('New Connection', form.table, 240, 240);
};



 subtype(graph,model,cell,role) {

 
 var testw=document.createElement('div');
   testw.style.position = 'absolute';
   testw.style.overflow = 'hidden';
   //outline.style.left = '60px';
   testw.style.top = '0px';
   testw.style.left = '0px';
   testw.style.width = '200px';
   testw.style.height = '500px';
   var wnd=null;
   //var countryList=document.createElement("select");
   //var countryOption = new Option ("jjjj", "jjj");
   //countryList.options.add (countryOption);
   var subtsList=document.createElement("select");
   var levelId = cell.getParent().getId();
    var idInModel = model.getLevelById(levelId);
    var subts = model.levels[idInModel].inheritances;
    var i;
    
    for (let i = 0; i < subts.length; i++) {

      var subtp = subts[i];
      subtsList.options.add(new Option (("   "+subtp.name+"  "),i));
     
      
    
    }
   
   
 
   var nameField = document.createElement("input");
   
  
 
   
   var okbutton = mxUtils.button('ok', function(evt) {
     
     
     var entityId = cell.getId();
        var entity = model.getEntityById(entityId);
        
        let sub1 = new Subtype(nameField.value, entity, subts[subtsList.value],role);
        model.updatePosition();
        model.levels[idInModel].addSubtype(sub1);
        model.build();

     wnd.destroy();

     });
   var cancelButton = mxUtils.button('cancel', function(evt) {
      wnd.destroy();
   });   
 
   testw.appendChild(document.createTextNode("Name: "));
   testw.appendChild(nameField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(document.createTextNode("Inheritance: "));
   testw.appendChild(subtsList);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(okbutton);
   testw.appendChild(cancelButton);
   var x = Math.max(0, document.body.scrollWidth / 2 - 200 / 2);
   var y = Math.max(10, (document.body.scrollHeight ||
    document.documentElement.scrollHeight) / 2 - 200 * 2 / 3);
   wnd = new mxWindow('Connect to', testw, x, y, 200, 200, true, true);
   wnd.setMaximizable(false);
   wnd.setMinimizable(false);
   wnd.setResizable(true);
   wnd.setVisible(true);
   wnd.setResizable(false);
   
   
   var background = document.createElement('div');	
   background.style.position = 'absolute';
   background.style.left = '0px';
   background.style.top = '0px';
   background.style.right = '0px';
   background.style.bottom = '0px';
   background.style.background = 'black';
   mxUtils.setOpacity(background, 50);
   document.body.appendChild(background);

   

   // Fades the background out after after the window has been closed
   wnd.addListener(mxEvent.DESTROY, function(evt) {
    mxEffects.fadeOut(background, 50, true,
     10, 30, true);
   });

   wnd.setVisible(true);
   

};


 subtype2(graph,model,cell,role) {

 
 var form = new mxForm('New Subtype Relation');
 var nameField = form.addText('Name', 'Uses');	
 
 var wnd = null;
 
 
   var levelId = cell.getParent().getId();
    var idInModel = model.getLevelById(levelId);
    var subts = model.levels[idInModel].inheritances;
    var i;

    var combo= form.addCombo('Connect to: ',true,subts.length);
    
    for (let i = 0; i < subts.length; i++) {

     var subtp = subts[i];
     form.addOption(combo,("   "+subtp.name+"  "),i,false);
      
    }
 
 
 var okFunction = function() {
      
   var name1 = nameField.value;
   var entityId = cell.getId();
      var entity = model.getEntityById(entityId);
      let end1 = new Subtype(name1, entity, subts[combo.value],role);
      model.updatePosition();
      model.levels[idInModel].addSubtype(end1);
      model.build();

   wnd.destroy();
  }

 var cancelFunction = function() {
  wnd.destroy();
 }
 form.addButtons(okFunction, cancelFunction);
 var parent = graph.getDefaultParent();
 var wnd = this.showModalWindow('New Connection', form.table, 240, 240);
};


 newConnection(graph,modelo) {
 var testw=document.createElement('div');
   testw.style.position = 'absolute';
   testw.style.overflow = 'hidden';
   //outline.style.left = '60px';
   testw.style.top = '0px';
   testw.style.left = '0px';
   testw.style.width = '200px';
   testw.style.height = '500px';
   var wnd=null;
   //var countryList=document.createElement("select");
   //var countryOption = new Option ("jjjj", "jjj");
   //countryList.options.add (countryOption);
   var nameField = document.createElement("input");
   var labelField = document.createElement("input");
   var potencyField = document.createElement("input");
   var directTypeField = document.createElement("input");
 
 
   
   var okbutton = mxUtils.button('ok', function(evt) {
     
       var conn1 = new Connection(nameField.value,potencyField.value,directTypeField.value,labelField.value);
     var cell = graph.getSelectionCells();
     var levelId = cell[0].getId();
     var idInModel = modelo.getLevelById(levelId);
     modelo.updatePosition();
     modelo.levels[idInModel].addConnection(conn1);
     modelo.build();
     wnd.destroy();

     });
   var cancelButton = mxUtils.button('cancel', function(evt) {
      wnd.destroy();
   });
 
   testw.appendChild(document.createTextNode("Name: "));
   testw.appendChild(nameField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(document.createTextNode("Label: "));
   testw.appendChild(labelField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(document.createTextNode("Potency: "));
   testw.appendChild(potencyField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(document.createTextNode("Direct type: "));
   testw.appendChild(directTypeField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(okbutton);
   testw.appendChild(cancelButton);
   var x = Math.max(0, document.body.scrollWidth / 2 - 200 / 2);
   var y = Math.max(10, (document.body.scrollHeight ||
    document.documentElement.scrollHeight) / 2 - 200 * 2 / 3);
   var wnd = new mxWindow('New Connection', testw, x, y, 200, 200, true, true);
   wnd.setMaximizable(false);
   wnd.setMinimizable(false);
   wnd.setResizable(true);
   wnd.setVisible(true);
   wnd.setResizable(false);
   
   
   var background = document.createElement('div');
   background.style.position = 'absolute';
   background.style.left = '0px';
   background.style.top = '0px';
   background.style.right = '0px';
   background.style.bottom = '0px';
   background.style.background = 'black';
   mxUtils.setOpacity(background, 50);
   document.body.appendChild(background);

   

   // Fades the background out after after the window has been closed
   wnd.addListener(mxEvent.DESTROY, function(evt) {
    mxEffects.fadeOut(background, 50, true,
     10, 30, true);
   });

   wnd.setVisible(true);
};







 editConnection(graph,modelo) {
 var testw=document.createElement('div');
   testw.style.position = 'absolute';
   testw.style.overflow = 'hidden';
   //outline.style.left = '60px';
   testw.style.top = '0px';
   testw.style.left = '0px';
   testw.style.width = '200px';
   testw.style.height = '500px';
   var wnd=null;
   //var countryList=document.createElement("select");
   //var countryOption = new Option ("jjjj", "jjj");
   //countryList.options.add (countryOption);
   var nameField = document.createElement("input");
   var labelField = document.createElement("input");
   var potencyField = document.createElement("input");
   var directTypeField = document.createElement("input");
 
 
   
   var okbutton = mxUtils.button('ok', function(evt) {
     
       
     modelo.getObjectById(graph.getSelectionCells()[0].getId()).name=nameField.value;
     modelo.getObjectById(graph.getSelectionCells()[0].getId()).label=labelField.value;
     modelo.getObjectById(graph.getSelectionCells()[0].getId()).potency=potencyField.value;
     modelo.getObjectById(graph.getSelectionCells()[0].getId()).directType=directTypeField.value;


     modelo.updatePosition();
     modelo.build();
     wnd.destroy();

     });
   var cancelButton = mxUtils.button('cancel', function(evt) {
      wnd.destroy();
   });
  var conn1=modelo.getObjectById(graph.getSelectionCells()[0].getId());
   testw.appendChild(document.createTextNode("Name: "));
   nameField.value=conn1.name;
   testw.appendChild(nameField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(document.createTextNode("Label: "));
   labelField.value=conn1.label;
   testw.appendChild(labelField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(document.createTextNode("Potency: "));
   potencyField.value=conn1.potency;
   testw.appendChild(potencyField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(document.createTextNode("Direct type: "));
   directTypeField.value=conn1.directType;
   testw.appendChild(directTypeField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(okbutton);
   testw.appendChild(cancelButton);
   var x = Math.max(0, document.body.scrollWidth / 2 - 200 / 2);
   var y = Math.max(10, (document.body.scrollHeight ||
    document.documentElement.scrollHeight) / 2 - 200 * 2 / 3);
   wnd = new mxWindow(conn1.name, testw, x, y, 200, 200, true, true);
   wnd.setMaximizable(false);
   wnd.setMinimizable(false);
   wnd.setResizable(true);
   wnd.setVisible(true);
   wnd.setResizable(false);
   
   
   var background = document.createElement('div');
   background.style.position = 'absolute';
   background.style.left = '0px';
   background.style.top = '0px';
   background.style.right = '0px';
   background.style.bottom = '0px';
   background.style.background = 'black';
   mxUtils.setOpacity(background, 50);
   document.body.appendChild(background);

   

   // Fades the background out after after the window has been closed
   wnd.addListener(mxEvent.DESTROY, function(evt) {
    mxEffects.fadeOut(background, 50, true,
     10, 30, true);
   });

   wnd.setVisible(true);
};





 editInheritance(graph,modelo) {

 var testw=document.createElement('div');
   testw.style.position = 'absolute';
   testw.style.overflow = 'hidden';
   //outline.style.left = '60px';
   testw.style.top = '0px';
   testw.style.left = '0px';
   testw.style.width = '200px';
   testw.style.height = '500px';
   var wnd=null;
   //var countryList=document.createElement("select");
   //var countryOption = new Option ("jjjj", "jjj");
   //countryList.options.add (countryOption);
   var nameField = document.createElement("input");
   var completeField = document.createElement("input");
   var disjointField = document.createElement("input");
   
 
 
   
   var okbutton = mxUtils.button('ok', function(evt) {
       modelo.getObjectById(graph.getSelectionCells()[0].getId()).name=nameField.value;
       modelo.getObjectById(graph.getSelectionCells()[0].getId()).complete=completeField.value;
       modelo.getObjectById(graph.getSelectionCells()[0].getId()).disjoint=disjointField.value;
     modelo.updatePosition();
     modelo.build();
     wnd.destroy();

     });
   var cancelButton = mxUtils.button('cancel', function(evt) {
      wnd.destroy();
   });
   var inh1=modelo.getObjectById(graph.getSelectionCells()[0].getId());
   testw.appendChild(document.createTextNode("Name: "));
   nameField.value=inh1.name;
   testw.appendChild(nameField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(document.createTextNode("Complete: "));
   completeField.value=inh1.complete;
   testw.appendChild(completeField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(document.createTextNode("Disjoint: "));
   disjointField.value=inh1.disjoint;
   testw.appendChild(disjointField);
   testw.appendChild(document.createElement("br"));
 
   testw.appendChild(okbutton);
   testw.appendChild(cancelButton);
   var x = Math.max(0, document.body.scrollWidth / 2 - 200 / 2);
   var y = Math.max(10, (document.body.scrollHeight ||
    document.documentElement.scrollHeight) / 2 - 200 * 2 / 3);
   wnd = new mxWindow(inh1.name, testw, x, y, 200, 200, true, true);
   wnd.setMaximizable(false);
   wnd.setMinimizable(false);
   wnd.setResizable(true);
   wnd.setVisible(true);
   wnd.setResizable(false);
   
   
   var background = document.createElement('div');	
   background.style.position = 'absolute';
   background.style.left = '0px';
   background.style.top = '0px';
   background.style.right = '0px';
   background.style.bottom = '0px';
   background.style.background = 'black';
   mxUtils.setOpacity(background, 50);
   document.body.appendChild(background);

   

   // Fades the background out after after the window has been closed
   wnd.addListener(mxEvent.DESTROY, function(evt) {
    mxEffects.fadeOut(background, 50, true,
     10, 30, true);
   });

   wnd.setVisible(true);
};





 newInheritance(graph,modelo) {

 var testw=document.createElement('div');
   testw.style.position = 'absolute';
   testw.style.overflow = 'hidden';
   //outline.style.left = '60px';
   testw.style.top = '0px';
   testw.style.left = '0px';
   testw.style.width = '200px';
   testw.style.height = '500px';
   var wnd=null;
   //var countryList=document.createElement("select");
   //var countryOption = new Option ("jjjj", "jjj");
   //countryList.options.add (countryOption);
   var nameField = document.createElement("input");
   var completeField = document.createElement("input");
   var disjointField = document.createElement("input");
   
 
 
   
   var okbutton = mxUtils.button('ok', function(evt) {
     
      var inh1 = new Inheritance(nameField.value,completeField.value,disjointField.value);
     
       //entity1.styleText=('image='+imageField.value);
       //alert(""+entity1.styleText);
       var cell = graph.getSelectionCells();
     var levelId = cell[0].getId();
     var idInModel = modelo.getLevelById(levelId);
     modelo.updatePosition();
     modelo.levels[idInModel].addInheritance(inh1);
     modelo.build();
     wnd.destroy();

     });
   var cancelButton = mxUtils.button('cancel', function(evt) {
      wnd.destroy();
   });
 
   testw.appendChild(document.createTextNode("Name: "));
   testw.appendChild(nameField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(document.createTextNode("Complete: "));
   testw.appendChild(completeField);
   testw.appendChild(document.createElement("br"));
   testw.appendChild(document.createTextNode("Disjoint: "));
   testw.appendChild(disjointField);
   testw.appendChild(document.createElement("br"));
 
   testw.appendChild(okbutton);
   testw.appendChild(cancelButton);
   var x = Math.max(0, document.body.scrollWidth / 2 - 200 / 2);
   var y = Math.max(10, (document.body.scrollHeight ||
    document.documentElement.scrollHeight) / 2 - 200 * 2 / 3);
   wnd = new mxWindow('New Inheritance', testw, x, y, 200, 200, true, true);
   wnd.setMaximizable(false);
   wnd.setMinimizable(false);
   wnd.setResizable(true);
   wnd.setVisible(true);
   wnd.setResizable(false);
   
   
   var background = document.createElement('div');	
   background.style.position = 'absolute';
   background.style.left = '0px';
   background.style.top = '0px';
   background.style.right = '0px';
   background.style.bottom = '0px';
   background.style.background = 'black';
   mxUtils.setOpacity(background, 50);
   document.body.appendChild(background);

   

   // Fades the background out after after the window has been closed
   wnd.addListener(mxEvent.DESTROY, function(evt) {
    mxEffects.fadeOut(background, 50, true,
     10, 30, true);
   });

   wnd.setVisible(true);
};


 showProperties=(graph) =>{
// Creates a form for the user object inside
// the cell

var buttonEntity = mxUtils.button('', function(evt) {
   this.newEntity(graph,this.modelo);

 });

 buttonEntity.style.position = 'absolute';
 buttonEntity.style.left = '5px';
 buttonEntity.style.top = '135px';
 buttonEntity.style.width = '50px';
 buttonEntity.style.height = '35px';
 var img = document.createElement("IMG");
 var image=	'images/alignleft.gif';
   img.setAttribute('src', image);
   img.style.width = '30px';
   img.style.height = '30px';
   img.style.verticalAlign = 'middle';
   img.style.marginRight = '0px';
   img.style.marginLeft = '0px';
   //img.style.left = '200px';
 buttonEntity.appendChild(img);
   
   mxUtils.write(buttonEntity, ' Entity');


var form = new mxForm('properties');

// Adds a field for the columnname
var nameField = form.addText('Name', 'Jorge');
var typeField = form.addText('Potency', '2');

var primaryKeyField = form.addCheckbox('Primary Key', true);
var autoIncrementField = form.addCheckbox('Auto Increment', false);
var combo= form.addCombo('combo',true,5);
form.addOption(combo,'option 1','toy',true);
form.addOption(combo,'option 2','1',true);
form.addOption(combo,'option 3','2',false);
form.addOption(combo,'option 4','3',false);
form.addOption(combo,'option 5','4',false);

var wnd = null;

// Defines the function to be executed when the
// OK button is pressed in the dialog
var okFunction = function() {
  //toolbarWindow.setVisible(true);

  wnd.destroy();
}

// Defines the function to be executed when the
// Cancel button is pressed in the dialog
var cancelFunction = function() {
  //toolbarWindow.setVisible(true);

  wnd.destroy();
}
form.addButtons(okFunction, cancelFunction,buttonEntity);

var parent = graph.getDefaultParent();

wnd = this.showModalWindow('Properties', form.table, 240, 240);
};

  display = graph => {
    if (graph) {
      this.modelo = new Model("Model1", "jorge", graph);
      this.modelo.fromJSON('[{"name":"Model1","lockedByUser": 0,"levels":[]}]');
      this.modelo.build();
      graph.getView().setScale(.75);
    }
  };

  newObject = () => {
    if (this.state.editable === true) {
      var objs = this.state.clabjects;
      var newlength = objs.push({
        id: objs.length + 1,
        type: "circle",
        text: "Mary"
      });
      this.setState({ clabjects: objs });
      console.log("CLICK", this.state.clabjects);
      this.setState({ editable: false });
    } else {
      alert("no!", this.state.editable);
    }
  };

  render() {
    console.log(this.ccc);

    this.display(this.graph);
    return (
      <React.Fragment>
        <div className="graph-container" ref="divGraph" id="divGraph" />;
        <button onClick={() => this.newObject()}> New object</button> ;
      </React.Fragment>
    );
  }
}
