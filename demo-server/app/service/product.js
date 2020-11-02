'use strict'

const { Service } = require('egg')

class ProductService extends Service {
  async findProducts(keyword) {
    const client = this.app.mysql
    const sql = 'select id, name, price, imgurl from product'
    if (!keyword) {
      return await client.query(sql)
    }
    return await client.query(`${sql} where name like ?`, [`%${keyword}%`])
  }
}

module.exports = ProductService

