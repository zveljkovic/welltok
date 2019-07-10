import React, { Component } from 'react';
import BookListTable from './BookListTable';
import {connect} from "react-redux";
import {
    Alert, Button, Col, Container, Row
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
        let create = this.props.auth.scopes.includes('admin') ?
            <Button color="info" tag={Link} to="/create">Create</Button> :
            null;
        return (
            <div>
                <Container fluid={true}>
                    <Row>
                        <Col xs="12" >
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
                            {create}
                            <BookListTable
                                data={this.props.books}
                                filter={this.props.filter}
                                onDelete={(row) => this.onDelete(row)}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {...state.bookList, auth: state.auth};
};

export default connect(
    mapStateToProps,
    { fetchBooks },
    null
)(BookListScreen);
