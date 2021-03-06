/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.03.17
 */

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import universal from './universal';

import * as customersAPI from './api/customers';
import * as productsAPI from './api/products';
import * as invoicesAPI from './api/invoices';
import * as invoiceItemsAPI from './api/invoiceItems';

require('./db');

const app = express();
const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';

if (isDev) {
    const webpack = require('webpack');
    const webpackConfig = require('../webpack.config');

    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        hot: true,
        noInfo: true,
        stats: 'minimal',
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'static')));

// REST CUSTOMERS
app.route('/api/v1/customers')
    .get(customersAPI.getAllCustomers)
    .post(customersAPI.addCustomer);

app.route('/api/v1/customers/:customer_id')
    .get(customersAPI.getCustomer)
    .put(customersAPI.patchCustomer)
    .delete(customersAPI.deleteCustomer);

// REST PRODUCTS
app.route('/api/v1/products')
    .get(productsAPI.getAllProducts)
    .post(productsAPI.addProduct);

app.route('/api/v1/products/:product_id')
    .get(productsAPI.getProduct)
    .put(productsAPI.patchProduct)
    .delete(productsAPI.deleteProduct);

// REST INVOICES
app.route('/api/v1/invoices')
    .get(invoicesAPI.getAllInvoices)
    .post(invoicesAPI.addInvoice);

app.route('/api/v1/invoices/:invoice_id')
    .get(invoicesAPI.getInvoice)
    .put(invoicesAPI.patchInvoice)
    .delete(invoicesAPI.deleteInvoice);

// REST INVOICE ITEMS
app.route('/api/v1/invoices/:invoice_id/items')
    .get(invoiceItemsAPI.getAllInvoiceItems)
    .post(invoiceItemsAPI.addInvoiceItem);

app.route('/api/v1/invoices/:invoice_id/items/:id')
    .get(invoiceItemsAPI.getInvoiceItem)
    .put(invoiceItemsAPI.patchInvoiceItem)
    .delete(invoiceItemsAPI.deleteInvoiceItem);

// UNIVERSAL ENDPOINT
app.get('*', universal);

app.listen(port);