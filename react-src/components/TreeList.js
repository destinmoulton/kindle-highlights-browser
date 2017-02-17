import React, { Component } from 'react';

class TreeList extends Component {
    render() {
        const { clippings, authors, titles, changeSelectedFilter, filterField, filterContent} = this.props;

        let authorList = [];
        authors.map(function(authorName){
            authorList.push(<li key={authorName}
                                onClick={changeSelectedFilter}
                                data-filter-field='authorFullName' 
                                data-filter-content={authorName}>{authorName}</li>);
        });

        let titleList = [];
        titles.map(function(title){
            titleList.push(<li key={title}
                                onClick={changeSelectedFilter}
                                data-filter-field='title' 
                                data-filter-content={title}>{title}</li>);
        });
        return (
            <div>
                <h4>Authors</h4>
                <ul>
                    {authorList}
                </ul>
                <h4>Titles</h4>
                <ul>
                    {titleList}
                </ul>
            </div>
        );
    }
}

export default TreeList;