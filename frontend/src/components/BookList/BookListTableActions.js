import React, { Component } from 'react';
import { Link } from "react-router-dom";

// const propTypes = {
//     row: PropTypes.object.isRequired,
// };

class BookListTableActions extends Component {

    render() {
        const row = this.props.row;
        return (
            <div>
                <Link to={`/${row.id}/edit`}>
                    Edit
                </Link>&nbsp;&nbsp;&nbsp;
                <Link to={`/${row.id}/delete`}>
                    Delete
                </Link>
            </div>
        );
    }
}
// BookListTableActions.propTypes = propTypes;
export default BookListTableActions;
