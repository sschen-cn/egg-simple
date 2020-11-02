'use strict'

const { Controller } = require('egg')

class ProductController extends Controller {

  async listProduct() {
    const { ctx, service } = this
    const keyword = ctx.query.keyword
    const products = await service.product.findProducts(keyword)
    ctx.body = products
  }
}

module.exports = ProductController
