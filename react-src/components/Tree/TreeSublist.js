import React, { Component } from 'react';

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
        const { listData, listTitle, filterFieldName, handleChangeSelectedFilter } = this.props;
        const { isOpen } = this.state;

        let sublist = [];
        listData.map(function(item){
            sublist.push(<li key={item}
                             onClick={handleChangeSelectedFilter}
                             data-filter-field={filterFieldName}
                             data-filter-content={item}>{item}</li>);
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