import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {connect} from "react-redux";

// const propTypes = {
//     row: PropTypes.object.isRequired,
// };

class BookListTableActions extends Component {

    render() {
        const row = this.props.row;
        let actions = this.props.auth.scopes.includes('admin') ?
            <div><Link to={`/${row.id}/edit`}>Edit</Link>&nbsp;&nbsp;&nbsp;<Link to={`/${row.id}/delete`}>Delete</Link></div> :
            <p>Not available</p>;
        return (
            <div>
            {actions}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {auth: state.auth};
};

export default connect(mapStateToProps, null)(BookListTableActions);
