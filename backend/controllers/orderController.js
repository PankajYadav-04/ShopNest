const express = require('express');
const Order = require('../model/Order');
const sendEmail = require('../utiles/sendEmail');

const createOrder = async (req, res) => {
    try {
        const { products, totalPrice, address, paymentId } = req.body;

        // check if all fields are provided
        if(!products || !totalPrice || !address ){
            return res.status(400).json({ message: 'All fields are required' });
        }

        // create new order
        const order = new Order({
            user: req.user._id,
            products,
            totalPrice,
            address,
            paymentId
        });

        // save order to MongoDB
        await order.save();

        // send confirmation email
        const message = `Your order with ID ${order._id} has been placed successfully. Total Price: $${totalPrice}. Thank you for shopping with us!`;
        await sendEmail(req.user.email, 'Order Confirmation', message);

        res.status(201).json(order);

    } catch(error) {
        console.log(error); 
        res.status(500).json({ message: 'Server error' });
    }
};

const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('products.product', 'name price');
        res.json(orders);
    } catch(error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'id name').populate('products.product', 'name price');
        res.json(orders);
    } catch(error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.json(order);
    } catch(error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createOrder,
    myOrders,
    getOrders,
    updateOrderStatus
}