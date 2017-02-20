import React, { Component } from 'react';

import Node from './Node'

class TreeSublist extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen:true
        };
    }

    handleOpenClose(e){
        let isOpen = true;
        if(this.state.isOpen){
            isOpen = false;
        }
        this.setState({isOpen});
    }

    render() {
        const { listData, listTitle, filterFieldName, handleChangeSelectedFilter, searchString } = this.props;
        const { isOpen } = this.state;

        let sublist = [];
        
        listData.map(function(itemName){
            const safeName = itemName.toLowerCase();

            const node = <Node key={itemName}
                               handleChangeSelectedFilter={handleChangeSelectedFilter}
                               filterFieldName={filterFieldName}
                               searchString={searchString}
                               itemName={itemName}
                            />;

            if( searchString !=="" && safeName.includes(searchString)){
                sublist.push(node);
            } else if (searchString===""){
                sublist.push(node);
            }

        });

        let iconClasses = "fa fa-plus-circle khb-treelist-icon";
        let sublistContent = "";
        if(isOpen){
            iconClasses = "fa fa-minus-circle khb-treelist-icon";
            sublistContent = sublist;
        }
        
        return (
            <div className="khb-treelist-subtree-container">
                <h4>
                    <i className={iconClasses}
                       onClick={this.handleOpenClose.bind(this)}></i> {listTitle}</h4>
                <ul className='khb-treelist-subtree'>
                    {sublistContent}
                </ul>
            </div>
        );
    }
}

export default TreeSublist;