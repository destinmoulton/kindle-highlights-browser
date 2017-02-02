import React from 'react';
import { remote } from 'electron';

import Home from './Home';

import HighlightBrowser from './HighlightBrowser.js';

import MyClippingsParser from '../lib/myclippingsparser';

export default class Layout extends React.Component{
   
    constructor(props){
        super(props);

        this.state = {
            hasClippings: false,
            clippings:{}
        };

    }

    openClippingsDialog(){
        
        remote.dialog.showOpenDialog({properties:['openFile']},(fileName)=>{
            const clipParser = new MyClippingsParser();
            const newClippings = clipParser.parseFile(fileName[0]);
            this.setState({
                hasClippings: true,
                clippings: newClippings
            });
        }); 
    }

    render(){
        let contents = <Home openClippingsDialogHandler={this.openClippingsDialog.bind(this)} />;
        if(this.state.hasClippings){
            contents = <HighlightBrowser clippings={this.state.clippings}/>
        }

        return (
            <div>
                {contents}                
            </div>
        );
    }
}