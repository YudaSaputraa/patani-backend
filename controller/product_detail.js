const express = require('express');
const product_details = require("../model/product_detail_model");
const products = require("../model/products_model");
const carts = require("../model/cart_model");
const sellers = require("../model/seller_model");

const getProductDetailById = async (req, res) => {
    try {
        const { productId } = req.params;
        const productDetail = await products.findByPk(productId, {
            include: [
                {
                    model: products,
                    attributes: ['product_name', 'price', 'stock', 'description', 'image']
                }
            ]
        });

        if (!productDetail) {
            return res.status(400).json({
                status: "Error",
                message: `Product with id ${productId} does not exist!`
            });
        }

        res.status(200).json({
            status: "success",
            message: "Successfully fetched product detail",
            product: productDetail
        });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });

    }
};

const newBidProduct = async (req, res) => {
    try {
        const { bid_price, qty, sellerId } = req.body;
        const { id_product } = req.params;
        const status = 'On review';
        const product = await products.findOne({
            where: {
                id: id_product
            }
        });

        if (!product) {
            return res.status(400).json({
                status: "Error",
                message: `Product with id ${id_product} does not exist!`
            });
        }
        const total_price = product.price * qty;

        const newBidRequest = await product_details.create({
            bid_price,
            qty,
            total_price,
            status: status,
            sellerId: sellerId,
            productId: id_product,
        })

        const newProductDetail = newBidRequest.id;
        if (newBidRequest.status === 'Approve') {
            const newCart = await carts.create({
                offerId: newProductDetail
            })

            res.status(201).json({
                status: "success",
                message: "Successfully add bid request",
                product: newBidRequest,
                carts: newCart
            });
        }
        res.status(201).json({
            status: "success",
            message: "bid request on review seller",
            product: newBidRequest,
        });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};

const approveBidRequest = async (req, res) => {
    try {
        const { bidRequestId } = req.params;
        const bidRequest = await product_details.findOne({
            where: {
                id: bidRequestId
            }
        });

        if (!bidRequest) {
            return res.status(400).json({
                status: "Error",
                message: `bidRequest with id ${bidRequestId} does not exist!`
            });
        }
        const { status } = req.body;
        const approveStatus = {
            bid_price: bidRequest.bid_price,
            qty: bidRequest.qty,
            total_price: bidRequest.total_price,
            status: status,
            sellerId: bidRequest.sellerId,
            productId: bidRequest.productId,
        }

        const result = await product_details.update(approveStatus, {
            where: {
                id: bidRequest.id
            }
        });
        if (result[0] === 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'bidRequestData not found or no changes applied',
                approveStatus: approveStatus,

            });
        }
        const newProductDetail = bidRequest.id;
        if (approveStatus.status === 'Approve') {
            const newCart = await carts.create({
                offerId: newProductDetail
            })

            res.status(201).json({
                status: "success",
                message: "Successfully add bid request",
                product: approveStatus,
                carts: newCart
            });
        }


    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {
    getProductDetailById,
    newBidProduct,
    approveBidRequest
}