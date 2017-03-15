/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import React, { Component } from 'react';
import {
    Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle,
    Button, FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import { closeModalEditCustomer, updateCustomer } from '../../actions/customersActions';

export default class ModalEditCustomer extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            id: '',
            name: '',
            address: '',
            phone: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        const { id, name, address, phone } = nextProps.customer;
        if (name || address || phone) {
            this.setState({ id, name, address, phone });
        }
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handleAddressChange(e) {
        this.setState({ address: e.target.value });
    }

    handlePhoneChange(e) {
        this.setState({ phone: e.target.value });
    }

    handleSubmit(e) {
        const { dispatch } = this.props;
        const { id, name, address, phone } = this.state;
        e.preventDefault();
        dispatch(updateCustomer({ id, name, address, phone }));
        dispatch(closeModalEditCustomer());
    }

    render() {
        const { dispatch, open } = this.props;
        const { name, address, phone } = this.state;

        return (
            <Modal show={open}>
                <ModalHeader>
                    <ModalTitle>Edit customer</ModalTitle>
                </ModalHeader>

                <ModalBody>
                    <form>
                        <FormGroup>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                type='text'
                                value={name}
                                placeholder='John Doe'
                                onChange={::this.handleNameChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Address</ControlLabel>
                            <FormControl
                                type='text'
                                value={address}
                                placeholder='788, 21 st, New York, NY, USA'
                                onChange={::this.handleAddressChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Phone</ControlLabel>
                            <FormControl
                                type='text'
                                value={phone}
                                placeholder='+19834729834'
                                onChange={::this.handlePhoneChange}
                            />
                        </FormGroup>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={::this.handleSubmit} bsStyle='primary'>Update</Button>
                    <Button onClick={ () => dispatch(closeModalEditCustomer()) }>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}