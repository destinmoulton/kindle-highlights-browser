import React from 'react';
import { remote } from 'electron';

import Menu from './Menu';

import HighlightBrowser from './HighlightBrowser.js';

import MyClippingsParser from '../lib/myclippingsparser';

export default class Layout extends React.Component{
   
    constructor(props){
        super(props);
        this.state = {
            clippings:{}
        };

    }

    openClippingsDialog(){
        
        remote.dialog.showOpenDialog({properties:['openFile']},(fileName)=>{
            const clipParser = new MyClippingsParser();
            const newClippings = clipParser.parseFile(fileName[0]);
            this.setState({
                clippings: newClippings
            });
        }); 
    }

    render(){
        return (
            <div>
                <Menu openClippingsDialogHandler={this.openClippingsDialog.bind(this)}></Menu>
                <HighlightBrowser clippings={this.state.clippings}/>
            </div>
        );
    }
}