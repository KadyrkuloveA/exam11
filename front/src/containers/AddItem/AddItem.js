import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import FormElement from "../../components/UI/Form/FormElement";
import {connect} from "react-redux";
import {fetchCategories} from "../../store/actions/categoriesActions";
import {addItem} from "../../store/actions/itemsActions";

class AddItem extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        category: ''
    };

    componentDidMount() {
        this.props.fetchCategories();
    }


    submitFormHandler = async event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            let value = this.state[key];

            formData.append(key, value);
        });

        await this.props.addItem(formData);
        this.props.history.push('/');
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    render() {
        return (
            <>
                <Form onSubmit={this.submitFormHandler}>
                    <FormElement
                        propertyName='title'
                        title='Title'
                        value={this.state.title}
                        onChange={this.inputChangeHandler}
                        type='text'
                        placeholder='Enter the title'
                        required={true}
                    />
                    <FormElement
                        propertyName='description'
                        title='Description'
                        value={this.state.description}
                        onChange={this.inputChangeHandler}
                        type='text'
                        placeholder='Enter any description or send an image'
                    />
                    <FormGroup row>
                        <Label sm={2} for="image">Image</Label>
                        <Col sm={10}>
                            <Input
                                type="file"
                                name="image" id="image"
                                onChange={this.fileChangeHandler}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2} for="category">Category</Label>
                        <Col sm={10}>
                            <Input
                                type="select"
                                name="category" id="category"
                                value={this.state.category}
                                onChange={this.inputChangeHandler}
                            >
                                <option value="">Please select a category...</option>
                                {this.props.categories.map(category => (
                                    <option key={category._id} value={category._id}>{category.title}</option>
                                ))}
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup className='mt-3'>
                        <Button type="submit" color="primary">Post Selling</Button>
                    </FormGroup>
                    {this.state.image ? null : <span className='pb-3 text-danger'>you must attach a picture, if all the fields are filled in, it will transfer you to the main page</span>}
                </Form>
            </>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.categories.categories
});

const mapDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories()),
    addItem: itemData => dispatch(addItem(itemData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);