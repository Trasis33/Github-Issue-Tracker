'use strict'

const homeController = {}

/**
 * index GET
 */
homeController.index = (req, res, next) => res.render('home/index')

// homeController.issues = async (req, res, next) => {

// }

// Exports.
module.exports = homeController
