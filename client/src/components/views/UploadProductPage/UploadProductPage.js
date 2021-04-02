import React, { useEffect, useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;
const Continents = [
    { key: 1, value: 'Africa' },
    { key: 2, value: 'Europe' },
    { key: 3, value: 'Asia' },
    { key: 4, value: 'North America' },
    { key: 5, value: 'South America' },
    { key: 6, value: 'Australia' },
    { key: 7, value: 'Antarctica' },
];

function UploadProductPage(props) {
    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState(0);
    const [Continent, setContinent] = useState(1);
    const [Images, setImages] = useState([]);

    const nameChangeHandler = (e) => {
        setName(e.currentTarget.value);
    }
    const descriptionChangeHandler = (e) => {
        setDescription(e.currentTarget.value);
    }
    const priceChangeHandler = (e) => {
        setPrice(e.currentTarget.value);
    }
    const continentChangeHandler = (e) => {
        setContinent(e.currentTarget.value);
    }
    const updateImages = (newImages) => {
        console.log(newImages)
        setImages(newImages)
    }
    const submitHandler = (e) => {
        e.preventDefault();

        if (!Name || !Description || !Price || !Continent || !Images) {
            alert('모든 값을 넣어주세요.');
        } else {



            const body = {
                writer: props.user.userData._id, // 상위 컴포넌트 auth에서 가져옴
                title: Name,
                description: Description,
                price: Price,
                images: Images,
                continenets: Continent
            }

            Axios.post("/api/product", body)
                .then(res => {
                    if (res.data.success) {
                        alert('상품 업로드 성공');
                        props.history.push('/');
                    } else {
                        alert('상품 업로드 실패')
                    }
                })
        }
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>여행 상품 업로드</Title>
            </div>

            <Form onSubmit={submitHandler}>
                {/* Drop Zone: 업로드 부분 util에 컴포넌트로 분리 */}
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <label>이름</label>
                <Input onChange={nameChangeHandler} value={Name} />
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description}></TextArea>
                <br />
                <br />
                <label>가격($)</label>
                <Input onChange={priceChangeHandler} value={Price} />
                <br />
                <br />
                <select onChange={continentChangeHandler} value={Continent}>
                    {
                        Continents.map((item) => (
                            <option key={item.key} value={item.key}>{item.value}</option>
                        ))
                    }
                </select>
                <br />
                <br />
                <Button htmlType="submit">
                    확인
                </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage
