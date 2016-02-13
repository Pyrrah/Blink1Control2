"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var Button = require('react-bootstrap').Button;
var Overlay = require('react-bootstrap').Overlay;
var MenuItem = require('react-bootstrap').MenuItem;
//var Glyphicon = require('react-bootstrap').Glyphicon;

var BigButton = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		type: React.PropTypes.string.isRequired,
		color: React.PropTypes.string,
		onClick: React.PropTypes.func,
		onContextMenu: React.PropTypes.func
	},
	getInitialState: function() {
		return {
			showContextMenu: false
		};
	},
	showContextMenu: function(e) {
        console.log("showContextMenu", e.target); //, "this:",this);
		this.setState({showContextMenu: true});
		console.log(this.state);
    },
	hideContextMenu: function() {
		this.setState({showContextMenu: false});//  }.bind(this)
	},
	doContextMenu: function(evtkey) {
        console.log("doContextMenu",this.props.idx, evtkey );
		this.hideContextMenu();
		this.props.onEdit(evtkey, this.props.idx);
	},
	render: function() {
		var buttonStyle = { width: 64, height: 64, margin: 5, padding: 0  };
		var tstyle = { border: '1px solid red', color: 'grey', fontSize: "0.7em", overflow:'hidden',  };
		var iconContent;
		if( this.props.type === "color" ) {
			buttonStyle.background = this.props.color;
			buttonStyle.color = 'white';
			//iconContent = <i className="fa fa-play-circle-o fa-2x"></i>;
			iconContent = <i className="fa fa-lightbulb-o fa-2x"></i>;
		}
		else if( this.props.type === "sys") {  // FIXME: seems hacky, must be better way surely
			if( this.props.name === "White") {
				iconContent = <i className="fa fa-sun-o fa-2x"></i>;
			} else if( this.props.name === "Strobe Light" ) {
				iconContent = <i className="fa fa-bullseye fa-2x"></i>;
			} else if( this.props.name === "Color Cycle") {
				iconContent = <i className="fa fa-spinner fa-2x"></i>;
			} else if( this.props.name === "Mood Light") {
				iconContent = <i className="fa fa-asterisk fa-2x"></i>;
			} else if( this.props.name === "Off") {
				iconContent = <i className="fa fa-power-off fa-2x"></i>;
			} else {
				iconContent = <i className="fa fa-eyedropper fa-2x"></i>;
			}
		}
		else if( this.props.type === "add" ) {
			iconContent = <i className="fa fa-plus fa-2x"></i>;
		}
		var cmstyle = {
			position: 'absolute',
			backgroundColor: '#EEE',
			boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
			border: '1px solid #CCC',
			borderRadius: 3,
			marginLeft: -5,
			marginTop: 5,
			padding: 10
		};

		var buttonRef = 'target-' + this.props.type + this.props.idx;
		var self = this;
		return (
			<div id="booper">
				<div>
					<Button style={buttonStyle} ref={buttonRef}
						onClick={this.props.onClick} onContextMenu={this.showContextMenu}>
						{iconContent}<div style={tstyle}>{this.props.name}</div>
					</Button>
				</div>

				<Overlay
					rootClose={true}
					show={this.state.showContextMenu}
					onHide={this.hideContextMenu}
					container={this}
					placement="bottom"
					target={function() { return ReactDOM.findDOMNode(self.refs[buttonRef]); } } >
					<div style={cmstyle}>
						<MenuItem eventKey="setcolor" onSelect={this.doContextMenu}>Set to current color</MenuItem>
						<MenuItem eventKey="setpattern" onSelect={this.doContextMenu}>Set to last pattern</MenuItem>
						<MenuItem eventKey="delete" onSelect={this.doContextMenu}>Delete button</MenuItem>
					</div>
				</Overlay>
			</div>
			);
	}
});

//target={function() { return ReactDOM.findDOMNode(this.refs[buttonRef]); }.bind(this) } >

module.exports = BigButton;
