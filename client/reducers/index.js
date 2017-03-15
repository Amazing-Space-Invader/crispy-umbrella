/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 13.03.17
 */

import objectAssign from 'object-assign';

import customers from './customers';
import products from './products';

export default objectAssign({}, customers, products);