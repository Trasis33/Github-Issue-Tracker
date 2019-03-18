'use strict'

const webHookController = {}

/**
 * index GET
 */
webHookController.index = (req, res, next) => res.render('home/index')

webHookController.webhook = async (req, res, next) => {
  // try {
  //   let obj = await JSON.parse(req.body.read)
  //   console.log(obj)
  // } catch (err) {
  //   console.error(err)
  // }
}

// Exports.
module.exports = webHookController
