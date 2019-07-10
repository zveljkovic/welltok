import React, { Component } from 'react';
import {connect} from "react-redux";
import {Button, Form, FormGroup, Label, Input, Spinner, Alert, FormFeedback, Container, Row, Col} from 'reactstrap';
import {BookApi} from "../../libraries/BookApi";
import TagEntry from "../shared/TagEntry";
import {Link, Redirect} from "react-router-dom";

class BookCreateScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            author: '',
            tags: [],
            errorMessage: null,
            spinner: false,
            submitDisabled: true,
            redirectToHome: false,
            validate: {
                titleState: '',
                authorState: '',
                descriptionState: '',
            },
        }
    }

    create = async () => {
        const v = this.state.validate;
        if (v.titleState !== 'has-success' ||
            v.authorState !== 'has-success' ||
            v.descriptionState !== 'has-success') {
            this.setState({
                errorMessage: 'Please fix validation errors before continuing',
            });
            setTimeout(() => {
                this.setState({errorMessage: null});
            }, 5000);
            return;
        }
        this.setState({spinner: true});
        const response = await BookApi.create({
                title: this.state.title,
                description: this.state.description,
                author: this.state.author,
                tags: this.state.tags.map(t => t.value),
            });
        if (response.status !== 'ok') {
            this.setState({
                spinner: false,
                errorMessage: response.errorMessage,
            });
            setTimeout(() => {
                this.setState({errorMessage: null});
            }, 5000);
            return;
        }

        this.setState({spinner: false, redirectToHome: true});
    };

    handleChange = async (event) => {
        const { name, value } = event.target;
        await this.setState({
            [ name ]: value,
        });
    };

    handleTagsChange = async (values) => {
        await this.setState({
            tags: values,
        });
    };

    checkSubmitEnabled = () => {
        const v = this.state.validate;
        this.setState({
            submitDisabled: v.titleState !== 'has-success' ||
                v.authorState !== 'has-success' ||
                v.descriptionState !== 'has-success'
        });
    };

    validateTitle = (e) => {
        const { validate } = this.state;
        if (!!e.target.value && e.target.value.length >= 0) {
            validate.titleState = 'has-success'
        } else {
            validate.titleState = 'has-danger'
        }
        this.setState({ validate });
        this.checkSubmitEnabled();
    };
    validateAuthor = (e) => {
        const { validate } = this.state;
        if (!!e.target.value && e.target.value.length >= 0) {
            validate.authorState = 'has-success'
        } else {
            validate.authorState = 'has-danger'
        }
        this.setState({ validate })
        this.checkSubmitEnabled();
    };
    validateDescription = (e) => {
        const { validate } = this.state;
        if (!!e.target.value && e.target.value.length >= 10) {
            validate.descriptionState = 'has-success'
        } else {
            validate.descriptionState = 'has-danger'
        }
        this.setState({ validate });
        this.checkSubmitEnabled();
    };

    render() {
        return (
            <div>
                <Container fluid={true}>
                    <Row>
                        <Col xs="12"  sm={{size: 8, offset: 2}} md={{size: 6, offset: 3}}>
                        {this.state.redirectToHome && <Redirect to={'/'} />}
                        {this.state.errorMessage &&
                            <Alert color="danger" fade={true}>{this.state.errorMessage}</Alert>
                        }
                            <Form>
                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input type="text" name="title" id="title" placeholder="Title"
                                           valid={ this.state.validate.titleState === 'has-success' }
                                           invalid={ this.state.validate.titleState === 'has-danger' }
                                           value={this.state.title} onChange={(e) => {
                                                this.validateTitle(e);
                                                this.handleChange(e);
                                            }}  />
                                    <FormFeedback invalid>
                                        Please enter valid title
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="author">Author</Label>
                                    <Input type="text" name="author" id="author" placeholder="Author"
                                           valid={ this.state.validate.authorState === 'has-success' }
                                           invalid={ this.state.validate.authorState === 'has-danger' }
                                           value={this.state.author} onChange={(e) => {
                                        this.validateAuthor(e);
                                        this.handleChange(e)
                                    }}/>
                                    <FormFeedback invalid>
                                        Please enter valid author
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input type="textarea" name="description" id="description"
                                           valid={ this.state.validate.descriptionState === 'has-success' }
                                           invalid={ this.state.validate.descriptionState === 'has-danger' }
                                           value={this.state.description} onChange={(e) => {
                                                this.validateDescription(e);
                                                this.handleChange(e)
                                        }}/>
                                    <FormFeedback invalid>
                                        Please enter at least 10 characters
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="tags">Tags</Label>
                                    <TagEntry value={this.state.tags} onValueUpdate={(values) => {
                                        this.handleTagsChange(values)
                                    }}/>
                                </FormGroup>
                                <Button tag={Link} to="/" color="primary">Back</Button>
                                <Button onClick={() => this.create()} color="success"  className="float-right" disabled={this.state.submitDisabled}>Submit {this.state.spinner &&
                                    <Spinner style={{width: '1rem', height: '1rem'}}/>
                                }</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default connect()(BookCreateScreen);
