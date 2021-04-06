import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery';


function ProuductImage(props) {

    const [Images, setImages] = useState([]);

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            let images = []
            props.detail.images.map(item => {
                images.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`
                })
            })
            setImages(images);
        }
    }, [props.detail]) // 빈칸이면 렌더링 후 처음 작동할 땐 props.detail.images가 아무것도 없음
    // props.detail이 바뀔 때마다 useEffect 실행

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default ProuductImage
