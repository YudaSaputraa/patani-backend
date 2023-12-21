const express = require('express');
const products = require('../model/products_model');
const sellers = require("../model/seller_model");
const buyers = require("../model/buyer_model");
const orders = require("../model/order_model");

const getAllOrder = async (req, res) => {
    try {
        const order = await orders.findAll();
        if (order === undefined) {
            res.status(400).json({
                status: 'failed',
                message: `Orders is not exist!`

            })
        }

        res.status(200).json({
            status: "Success",
            message: "Successfully fetch all order",
            order
        })

    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }


};

const postOrder = async (req, res) => {
    try {
        const { productId, buyerId, sellerId, qty, total_price, status } = req.body;

        const newOrder = await orders.create({
            qty: qty,
            total_price: total_price,
            status: status,
            productId: productId,
            buyerId: buyerId,
            sellerId: sellerId
        });

        res.status(200).json({
            status: "success",
            message: "sucessfull add order",
            newOrder
        });

    } catch (error) {
        console.log(`Error : ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { productId, buyerId, sellerId, qty, total_price, status } = req.body;
        const updateOrders = {
            qty: qty,
            total_price: total_price,
            status: status,
            productId: productId,
            buyerId: buyerId,
            sellerId: sellerId
        };

        const result = await orders.update(updateOrders, {
            where: {
                id: id
            }
        });
        if (result[0] === 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'Buyer not found or no changes applied',
                updatedData: updateOrders,

            });
        }

        const updatedOrder = await orders.findByPk(id);
        res.status(200).json({
            status: 'success',
            message: 'Order updated successfully',
            updatedOrder
        });

    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }

};

module.exports = {
    getAllOrder,
    postOrder,
    updateOrder
}



