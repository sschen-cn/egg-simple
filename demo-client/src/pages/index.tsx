import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './index.less';
import { request } from "umi";

interface Product {
  id: number
  name: string
  price: number
  imgurl: string
}
const imgCDN = 'http://img.artifact4u.com/'

export default () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'apple', price: 5.99, imgurl: 'products/jiirv5evquof8n8v4u5egrfbpec5uz3m' },
    { id: 2, name: 'pear', price: 6.99, imgurl: 'products/jiirv5evquof8n8v4u5egrfbpec5uz3m' },
    { id: 3, name: 'pea', price: 7.99, imgurl: 'products/jiirv5evquof8n8v4u5egrfbpec5uz3m' },
    { id: 4, name: 'banana', price: 8.99, imgurl: 'products/jiirv5evquof8n8v4u5egrfbpec5uz3m' },
  ])


  const fetchProductList = async (keyword: string = '') => {
    const result = await request('./api/products', {
      params: { keyword }
    })
    setProducts(result)
  }

  useEffect(() => {
    fetchProductList()
  }, []);
  const [keyword, setKeyword] = useState<string>('')
  const searchInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setKeyword(text)
  }

  const searchButtonClickHandler = () => {
    fetchProductList(keyword)
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.searchBar}>
        <input type="text" className={styles.searchInput} onChange={searchInputChangeHandler} />
        <button className={styles.searchButton} onClick={searchButtonClickHandler}>搜索</button>
      </div>
      <div className={styles.producList}>
        {
          products.map(product => {
            return (
              <div className={styles.productItem} key={product.id}>
                <img className={styles.productImage} src={imgCDN + product.imgurl} alt="" width="50" />
                <div className={styles.productInfo}>
                  <div className={styles.productTitle}>{product.name}</div>
                  <div className={styles.productPrice}>{product.price}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
