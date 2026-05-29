const Orders = require('../model/Order');
const Products = require('../model/Product');
const Users = require('../model/User');

const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await Users.countDocuments({});
        const totalProducts = await Products.countDocuments({});
        const totalOrders = await Orders.countDocuments({});

        res.json({
            totalOrders,
            totalProducts,
            totalUsers
        });
    } catch(error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAdminStats };