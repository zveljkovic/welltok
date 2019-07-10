import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';

const components = {
    DropdownIndicator: null,
};

const createOption = (label) => ({
    label,
    value: label,
});

export default class TagEntry extends Component {
    state = {
        inputValue: '',
    };

    handleInputChange = (inputValue) => {
        this.setState({ inputValue });
    };
    handleKeyDown = (event) => {
        const { inputValue } = this.state;
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                this.setState({
                    inputValue: '',
                });
                if (this.props.value) {
                    this.props.onValueUpdate([...this.props.value, createOption(inputValue)]);
                } else {
                    this.props.onValueUpdate([createOption(inputValue)]);
                }
                event.preventDefault();
                break;
            default:
                return;
        }
    };
    render() {
        return (
            <CreatableSelect
                components={components}
                inputValue={this.state.inputValue}
                isClearable
                isMulti
                menuIsOpen={false}
                onInputChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                placeholder="Type tags and press enter..."
                value={this.props.value}
            />
        );
    }
}
