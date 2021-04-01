import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd'
import Axios from 'axios'

function FileUpload(props) {
    const [Images, setImages] = useState([]);

    const onDropHandler = (files) => {
        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append('file', files[0])
        // 파일 보낼 땐 form 데이터와 config를 함께 보내줘야 함
        Axios.post('/api/product/image', formData, config)
            .then(res => {
                if (res.data.success) {
                    // 원래 Images가 가지고 있는 것을 넣고 합침 spread operator
                    setImages([...Images, res.data.filePath]);
                    props.refreshFunction(Images);
                } else {
                    alert('파일 저장 실패');
                }
            })
    }

    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image);
        let newImages = [...Images];
        newImages.splice(currentIndex, 1);
        setImages(newImages);
        props.refreshFunction(newImages);
    }

    return (

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={onDropHandler}>
                {({ getRootProps, getInputProps }) => (



                    <div style={{
                        width: 300, height: 240, border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />
                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                {Images.map((image, index) => (
                    <div onClick={() => deleteHandler(image)} key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`http://localhost:5000/${image}`}
                        />
                    </div>
                ))}



            </div>
        </div>
    )
}

export default FileUpload
