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
  mxCellOverlay
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

      graph.popupMenuHandler.factoryMethod = function(menu, cell, evt) {
        if (cell) {
          if (cell.edge === true) {
            menu.addItem("Delete connection", null, function() {
              graph.removeCells([cell]);
              mxEvent.consume(evt);
            });
          } else {
            menu.addItem("Edit child node", null, function() {
              // mxUtils.alert('Edit child node: ');
              // selectionChanged(graph)
            });
            menu.addItem("Delete child node", null, function() {
              graph.removeCells([cell]);
              mxEvent.consume(evt);
            });
          }
        } else {
          menu.addItem("TEST", null, function() {
            // mxUtils.alert('Edit child node: ');
            // selectionChanged(graph)
          });
        }
      };

      graph.getModel().beginUpdate();
      try {
        //mxGrapg component
        var doc = mxUtils.createXmlDocument();
        var node = doc.createElement("Node");
        node.setAttribute("ComponentID", "[P01]");
        console.log(this.state);
        this.display(graph);
        var vx = graph.insertVertex(
          parent,
          null,
          node,
          240,
          40,
          150,
          30,
          "shape=ellipse;fillColor=yellow"
        );

        var v1 = graph.insertVertex(
          parent,
          null,
          "shape1",
          20,
          120,
          80,
          30,
          "rounded=1;strokeColor=red;fillColor=orange"
        );
        var v2 = graph.insertVertex(parent, null, "shape2", 300, 120, 80, 30);
        var v3 = graph.insertVertex(parent, null, "shape3", 620, 180, 80, 30);
        var e1 = graph.insertEdge(
          parent,
          null,
          "",
          v1,
          v2,
          "strokeWidth=2;endArrow=block;endSize=2;endFill=1;strokeColor=blue;rounded=1;"
        );
        var e2 = graph.insertEdge(parent, null, "Edge 2", v2, v3);
        var e3 = graph.insertEdge(parent, null, "Edge 3", v1, v3);

        //data
      } finally {
        // Updates the display
        graph.getModel().endUpdate();
      }

      // Enables rubberband (marquee) selection and a handler for basic keystrokes
      var rubberband = new mxRubberband(graph);
      var keyHandler = new mxKeyHandler(graph);

      var xml2 = prompt(
        "Please enter xml",
        '<root><mxCell id="2" value="World!Vishal" vertex="1"><mxGeometry x="200" y="150" width="80" height="30" as="geometry"/></mxCell><mxCell id="3" edge="1" source="2"><mxGeometry relative="1" as="geometry"><mxPoint x="440" y="90" as="targetPoint"/></mxGeometry></mxCell></root>'
      );

      if (xml2 == null || xml2 == "") {
        alert("User cancelled the prompt.");
      } else {
        //vertex.setId(person);;

        var doc = mxUtils.parseXml(xml2);
        var codec2 = new mxCodec(doc);
        var elt = doc.documentElement.firstChild;
        var cells2 = [];
        while (elt != null) {
          alert("" + elt.toString());
          cells2.push(codec2.decodeCell(elt));
          graph.refresh();
          elt = elt.nextSibling;
        }

        //graph.addCells(cells2);
      }
    }
  }

  createPopupMenu = (graph, menu, cell, evt) => {
    if (cell) {
      if (cell.edge === true) {
        menu.addItem("Delete connection", null, function() {
          graph.removeCells([cell]);
          mxEvent.consume(evt);
        });
      } else {
        menu.addItem("Edit child node", null, function() {
          // mxUtils.alert('Edit child node: ');
          // selectionChanged(graph)
        });
        menu.addItem("Delete child node", null, function() {
          graph.removeCells([cell]);
          mxEvent.consume(evt);
        });
      }
    } else {
      menu.addItem("TEST", null, function() {
        // mxUtils.alert('Edit child node: ');
        // selectionChanged(graph)
      });
    }
  };

  display = graph => {
    if (graph) {
      this.modelo = new Model("Model1", "jorge", graph);
      this.modelo.fromJSON('[{"name":"Model1","lockedByUser": 0,"levels":[]}]');
      alert(this.modelo.toJSON());
      graph.setEnabled(this.state.editable);

      graph.getModel().beginUpdate();
      try {
        graph.getModel().clear();
        this.state.clabjects.map(clabject => {
          var obj = graph.insertVertex(
            graph.getDefaultParent(),
            null,
            clabject.text,
            240,
            40,
            150,
            30,
            "shape=ellipse;fillColor=yellow"
          );
        });
      } finally {
        // Updates the display
        graph.getModel().endUpdate();
      }
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
