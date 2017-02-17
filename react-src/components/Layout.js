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
            const clippings = clipParser.parseFile(fileName[0]);
            const authors = clipParser.getAuthorsAsSortedArray();
            const titles = clipParser.getTitlesAsSortedArray();
            this.setState({
                hasClippings: true,
                clippings,
                authors,
                titles
            });
        }); 
    }

    render(){
        const {clippings, authors, titles} = this.state;

        let contents = <Home openClippingsDialogHandler={this.openClippingsDialog.bind(this)} />;
        if(this.state.hasClippings){
            contents = <HighlightBrowser clippings={clippings} authors={authors} titles={titles}/>
        }

        return (
            <div>
                {contents}                
            </div>
        );
    }
}