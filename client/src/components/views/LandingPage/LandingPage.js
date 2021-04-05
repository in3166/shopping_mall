import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Icon, Col, Card, Row, } from "antd";
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchBar from './Sections/SearchBar';
import { continents, price } from './Sections/Datas';

function LandingPage() {
    const [Product, setProduct] = useState([]);
    const [Skip, setSkip] = useState(0); // Mongo db에서 어디서 부터 가져올지
    const [Limit, setLimit] = useState(8); // 최대 몇개 씩 가져올지
    const [PostSize, setPostSize] = useState(0); // 갖고 오는 상품들의 개수가 limit 보다 작으면 더 가져올게 없는거임
    const [Filters, setFilters] = useState({
        continents: [],
        price: [],
    })
    const [SearchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // 8개만 가져오기
        let body = {
            skip: Skip,
            limit: 0
        }

        getProducts(body);
    }, [])

    const getProducts = (body) => {
        Axios.post('/api/product/products', body)
            .then(res => {
                if (res.data.success) {
                    if (body.loadMore) {
                        console.log(res.data.productInfo)
                        setProduct([...Product, ...res.data.productInfo]);
                    } else {
                        console.log(res.data.productInfo)
                        setProduct(res.data.productInfo.slice(0, 8)); // if가 없으면 원래 있던 리스트 없어짐 -> 다음 페이지처럼
                        if (body.limit === 0)
                            setPostSize(res.data.postSize);
                    }
                } else {
                    alert('상품 정보 가져오기 실패')
                }
            })
            .catch(err => console.log(err))
    };
    // 더보기 버튼 클릭
    const loadmoreHandler = () => {
        let skip = Skip + Limit;
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters
        }
        console.log("skip: ", skip, " / limit: ", body.limit)
        getProducts(body);
        setSkip(skip);
    }

    const renderCards = Product.map((product, index) => {
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                cover={<ImageSlider images={product.images} />}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />

            </Card>
        </Col>
    })

    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: 0,
            filters: filters
        }
        getProducts(body);
        setSkip(0);
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array
    }

    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters };
        newFilters[category] = filters;

        if (category === 'price') { // price는 filters에 id를 넘겨줌
            let priceValues = handlePrice(filters);
            newFilters[category] = priceValues;

        }
        showFilteredResults(newFilters);
        setFilters(newFilters);
    }

    const updateSearchTerm = (newSearchTerm) => {
        let newLimit = newSearchTerm === "" ? 0 : Limit;
        let body = {
            skip: 0,
            limit: newLimit,
            filter: Filters,
            searchTerm: newSearchTerm
        }
        setSkip(0);
        setSearchTerm(newSearchTerm);
        getProducts(body);
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel Anywhere <Icon type="rocket" /></h2>
            </div>

            {/* Filter */}
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* Check box */}
                    <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continents")} />
                </Col>
                <Col lg={12} xs={24}>
                    {/* Radio Box */}
                    <RadioBox list={price} handleFilters={filters => handleFilters(filters, "price")} />
                </Col>
            </Row>

            {/* Search */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <SearchBar refreshFunction={updateSearchTerm} />
            </div>

            {/* Cards */}
            <Row gutter={16, 16}>
                {renderCards}
            </Row>


            <br />
            {PostSize > Skip + Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadmoreHandler}>더보기</button>
                </div>
            }
        </div>
    )
}

export default LandingPage
