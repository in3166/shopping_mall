import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProuductImage'
import ProductInfo from './Sections/ProductInfo'
// 슬라이딩, 재생, 전체화면 라이브러리
// npm install --save react-image-gallery

function DetailProductPage(props) {
    const productId = props.match.params.productId;
    const [Product, setProduct] = useState({});
    useEffect(() => {
        Axios.get(`/api/product/products_by_id?id=${productId}&type=single`) //하나의 정보만 가져옴
            .then(res => {
                if (res.data.success) {
                    setProduct(res.data.product[0])

                } else {
                    alert('상세 정보 가져오기 실패');
                }
            })
    }, [])

    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.title}</h1>
            </div>
            <br />
            <Row gutter={[16, 16]}>
                {/* Prouduct Image */}
                <Col lg={12} xs={24}>
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} xs={24}>
                    {/* Prouduct Info */}
                    <ProductInfo detail={Product} />
                </Col>
            </Row>
        </div>
    )
}

export default DetailProductPage
