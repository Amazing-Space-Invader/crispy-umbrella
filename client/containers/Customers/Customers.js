/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.03.17
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '../../components/Menu/Menu';

class Customers extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <div>customers container</div>
            </div>
        )
    }
}

export default connect(() => ({}))(Customers);