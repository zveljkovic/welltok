import React, { Component } from 'react';
import BookListTable from './BookListTable';
import {connect} from "react-redux";
import {
    Alert, Button
} from 'reactstrap';
import {Link} from "react-router-dom";
import {fetchBooks} from "../../redux/actions";
class BookListScreen extends Component {
    onDelete = (row) => {
        console.log(row);
    };
    componentDidMount() {
        this.props.fetchBooks();
    }
    render() {
        return (
            <div>
                {this.props.errorMessage &&
                <Alert color="danger" fade="true">
                    {this.props.errorMessage}
                </Alert>
                }
                {this.props.successMessage &&
                <Alert color="success" fade="true">
                    {this.props.successMessage}
                </Alert>
                }
                <Button color="info" tag={Link} to="/create">Create</Button>
                <BookListTable
                    data={this.props.books}
                    filter={this.props.filter}
                    onDelete={(row) => this.onDelete(row)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return state.bookList;
};

export default connect(
    mapStateToProps,
    { fetchBooks },
    null
)(BookListScreen);
