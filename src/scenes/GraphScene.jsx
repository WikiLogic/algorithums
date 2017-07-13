import React, { Component } from 'react';
import ClaimCard from '../components/ClaimCard.jsx';
import ArgCard from '../components/ArgCard.jsx';
import Lines from '../components/Lines.jsx';

class GraphScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      claim1: { text: 'claim1', probability: 0.5 },
      claim2: { text: 'claim2', probability: 0.5 },
      claim3: { text: 'claim3', probability: 0.5 },
      claim4: { text: 'claim4', probability: 0.5 },
      claim5: { text: 'claim5', probability: 0.5 },
      claim6: { text: 'claim6', probability: 0.5 },
      claim7: { text: 'claim7', probability: 0.5 },
      claimStart: { text: 'claimStarter', probability: 0.5 },
      arg1: { text: 'arg1', probability: 0.5 },
      arg2: { text: 'arg2', probability: 0.5 },
      arg3: { text: 'arg3', probability: 0.5 },
      arg4: { text: 'arg4', probability: 0.5 },
      arg5: { text: 'arg5', probability: 0.5 },
      arg6: { text: 'arg6', probability: 0.5 },
      arg7: { text: 'arg7', probability: 0.5 },
      arg8: { text: 'arg8', probability: 0.5 },
      links: [
        { id:"1", type: "OPPOSES", src: "arg1", tgt: "claim1" },
        { id:"2", type: "OPPOSES", src: "arg3", tgt: "claim1" },
        { id:"3", type: "SUPPORTS", src: "arg2", tgt: "claim2" },
        { id:"4", type: "OPPOSES", src: "arg4", tgt: "claim2" },
        { id:"5", type: "SUPPORTS", src: "arg5", tgt: "claim3" },
        { id:"6", type: "OPPOSES", src: "arg6", tgt: "claim3" },
        { id:"7", type: "OPPOSES", src: "arg6", tgt: "claim4" },
        { id:"8", type: "SUPPORTS", src: "arg7", tgt: "claim4" },
        { id:"9", type: "SUPPORTS", src: "arg7", tgt: "claim5" },
        { id:"11", type: "OPPOSES", src: "arg8", tgt: "claim5" },
        { id:"12", type: "USED_IN", src: "claim6", tgt: "arg5" },
        { id:"13", type: "USED_IN", src: "claim6", tgt: "arg6" },
        { id:"14", type: "USED_IN", src: "claimStarter", tgt: "arg6" },
        { id:"15", type: "USED_IN", src: "claimStarter", tgt: "arg7" },
        { id:"16", type: "USED_IN", src: "claim7", tgt: "arg7" },
        { id:"17", type: "USED_IN", src: "claim7", tgt: "arg8" },
        { id:"18", type: "USED_IN", src: "claim3", tgt: "arg1" },
        { id:"19", type: "USED_IN", src: "claim3", tgt: "arg2" },
        { id:"20", type: "USED_IN", src: "claim4", tgt: "arg2" },
        { id:"21", type: "USED_IN", src: "claim4", tgt: "arg3" },
        { id:"22", type: "USED_IN", src: "claim5", tgt: "arg3" },
        { id:"23", type: "USED_IN", src: "claim5", tgt: "arg4" }
      ],
      lines: [],
      svgBound: {
        width: 0, height: 0
      }
    }

    this.getNodeCoords = this.getNodeCoords.bind(this);
    this.lines = []; //this will hold an array of lines to be rendered by Lines
  }

  //returns the coords for the middle of the node
  getNodeCoords(node){
    var bound = node.getBoundingClientRect();
    return {
      x:bound.left + bound.width/2,
      y:bound.top + bound.height/2
    }
  }

  componentDidMount(){
    var svgBound = this.refs.svgwrap.getBoundingClientRect();
    var lines = [];
    //for each link
    for (let i = 0; i < this.state.links.length; i++) {

      //get the coords (but these are global)
      var srcCoords = this.getNodeCoords(this.refs[this.state.links[i].src]);
      var tgtCoords = this.getNodeCoords(this.refs[this.state.links[i].tgt]);

      //translate them to match the SVG space
      srcCoords.x -= svgBound.left;
      srcCoords.y -= svgBound.top;
      tgtCoords.x -= svgBound.left;
      tgtCoords.y -= svgBound.top;

      //apply them to the line!
      var line = {
        x1: srcCoords.x,
        y1: srcCoords.y,
        x2: tgtCoords.x,
        y2: tgtCoords.y,
        type: this.state.links[i].type
      };
      lines.push(line);
    }

    console.log('svgBound', svgBound);

    this.setState({
      lines: lines,
      svgBound: {
        width: svgBound.width,
        height: svgBound.height
      }
    });
  }

  render() {

    return (
      <div className="graph-scene">
        <div className="graph-scene__links-svg-wrap" ref="svgwrap">
          <Lines lines={this.state.lines} svgBound={this.state.svgBound}/>
        </div>
        <div className="graph-scene__nodes-wrap">
          <div className="graph-scene__row">
            <div className="graph-scene__column">
              <div ref="claim1">
                <ClaimCard claim={this.state.claim1} />
              </div>
            </div>
            <div className="graph-scene__column">
              <div ref="claim2">
                <ClaimCard claim={this.state.claim2}/>
              </div>
            </div>
          </div>
          <div className="graph-scene__row">
          <div className="graph-scene__column">
            <div ref="arg1">
              <ArgCard arg={this.state.arg1}/>
            </div>
          </div>
          <div className="graph-scene__column">
            <div ref="arg2">
              <ArgCard arg={this.state.arg2}/>
            </div>
          </div>
          <div className="graph-scene__column">
            <div ref="arg3">
              <ArgCard arg={this.state.arg3}/>
            </div>
          </div>
          <div className="graph-scene__column">
            <div ref="arg4">
              <ArgCard arg={this.state.arg4}/>
            </div>
          </div>
          </div>
          <div className="graph-scene__row">
            <div className="graph-scene__column">
              <div ref="claim3">
                <ClaimCard claim={this.state.claim3}/>
              </div>
            </div>
            <div className="graph-scene__column">
              <div ref="claim4">
                <ClaimCard claim={this.state.claim4}/>
              </div>
            </div>
            <div className="graph-scene__column">
              <div ref="claim5">
                <ClaimCard claim={this.state.claim5}/>
              </div>
            </div>
          </div>
          <div className="graph-scene__row">
            <div className="graph-scene__column">
              <div ref="arg5">
                <ArgCard arg={this.state.arg5}/>
              </div>
            </div>
            <div className="graph-scene__column">
              <div ref="arg6">
                <ArgCard arg={this.state.arg6}/>
              </div>
            </div>
            <div className="graph-scene__column">
              <div ref="arg7">
                <ArgCard arg={this.state.arg7}/>
              </div>
            </div>
            <div className="graph-scene__column">
              <div ref="arg8">
                <ArgCard arg={this.state.arg8}/>
              </div>
            </div>
          </div>
          <div className="graph-scene__row">
            <div className="graph-scene__column">
              <div ref="claim6">
                <ClaimCard claim={this.state.claim6}/>
              </div>
            </div>
            <div className="graph-scene__column">
              <div ref="claimStarter">
                <ClaimCard claim={this.state.claimStart}/>
              </div>
            </div>
            <div className="graph-scene__column">
              <div ref="claim7">
                <ClaimCard claim={this.state.claim7}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GraphScene;
