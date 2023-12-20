const express = require('express');
const carts = require("../model/cart_model");
const transactions = require("../model/transaction_model");
const buyers = require("../model/buyer_model");
const products = require('../model/products_model');
const bidRequests = require('../model/product_detail_model');

const getAllCart = async (req, res) => {
    try {
        const { id_cart_params } = req.params;
        const transactionsData = await transactions.findAll({
            where: {
                sellerId: id_cart_params
            },
            attributes: ['id', 'qty', 'total_price', 'productId', 'sellerId'],
            include: [
                {
                    model: products,
                    attributes: ['id', 'product_name', 'product_durability', 'image']
                }
            ]
        });

        const bidRequestsData = await bidRequests.findAll({
            where: {
                sellerId: id_cart_params
            },
            attributes: ['id', 'bid_price', 'qty', 'total_price', 'status', 'sellerId'],
            include: [
                {
                    model: products,
                    attributes: ['id', 'product_name', 'product_durability', 'image']
                }
            ]
        });

        const cart = {
            transactions: transactionsData,
            bidRequests: bidRequestsData
        };
        if (transactionsData.length === 0 && bidRequestsData.length === 0) {
            res.status(400).json({
                status: "failed",
                message: "No carts found for the provided sellerId"
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Successfully fetched all cart data",
                carts: cart
            });
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};


module.exports = {
    getAllCart,
}