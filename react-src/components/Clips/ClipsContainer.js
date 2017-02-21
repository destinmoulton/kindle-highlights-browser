import React from "react";




import ClipsList from "./ClipsList";
import ClipsButtonBar from "./ClipsButtonBar";

export default class ClipsContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            sortBy:'location_start|asc'
        }
    }

    sortChangeHandler(e){
        this.setState({
            sortBy: e.target.value
        });
    }

    render(){
        const { clips, sortParam, filters } = this.props;
        const { sortBy } = this.state;
        const clipsLists = [];
        const clipKeys = Object.keys(clips);
        clipKeys.map(function(sectionTitle){
            clipsLists.push(<ClipsList key={sectionTitle}
                                       sortBy={sortBy}
                                       clips={clips[sectionTitle]}/>);
        });
        return (
            <div >
                <ClipsButtonBar sortChangeHandler={this.sortChangeHandler.bind(this)} 
                                sortBy={this.state.sortBy}
                                clips={clips}
                                filters={filters}/>                                    
                {clipsLists}
            </div>
        );
    }
}