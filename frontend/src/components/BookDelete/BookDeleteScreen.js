import React, { Component } from 'react';
import {connect} from "react-redux";
import {Alert, Button, Col, Container, Row, Spinner,} from 'reactstrap';
import {BookApi} from "../../libraries/BookApi";
import {Link, Redirect} from "react-router-dom";

class BookDeleteScreen extends Component {
    constructor(props) {
        super(props);
        this.bookId = props.match.params.id;
        this.state = {
            errorMessage: null,
            book: null,
            spinner: true,
            redirectToHome: false,
        };
    }

    componentDidMount() {
        new BookApi(this.props.auth.token).getById(this.bookId).then((value => {
            if (value.status === 'ok') {
                this.setState({book: value.data, spinner: false});
                return;
            }
            this.setState({errorMessage: value.errorMessage, spinner: false});
        }));
    }

    delete = async () => {
        const response = await new BookApi(this.props.auth.token).delete(this.bookId);
        if (response.status === 'ok') {
            this.setState({redirectToHome: true});
            return;
        }
        this.setState({errorMessage: response.errorMessage});
    };


    render() {
        let split;
        if (this.state.spinner){
            split = <Spinner style={{width: '1rem', height: '1rem'}}/>
        } else {
            split = <div>
                <p>Are you sure you want to delete the {this.state.book.title}?</p>
                <Button tag={Link} to="/" color="primary">Back</Button>
                <Button onClick={() => this.delete()} color="danger" className="float-right">Delete</Button>
            </div>
        }
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs="12"  sm={{size: 8, offset: 2}} md={{size: 6, offset: 3}}>
                        {this.state.redirectToHome && <Redirect to={'/'} />}
                        {this.state.errorMessage &&
                        <Alert color="danger" fade={true}>{this.state.errorMessage}</Alert>
                        }
                        {split}
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {auth: state.auth};
};
export default connect(mapStateToProps)(BookDeleteScreen);
