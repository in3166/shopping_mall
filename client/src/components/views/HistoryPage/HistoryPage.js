import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd';
function HistoryPage(props) {
    const [History, setHistory] = useState([]);

    useEffect(() => {
        // Axios.get('/api/user/history')
        //     .then(res => {
        //         if (res.data.success) {

        //         } else {
        //             alert('History 정보 가져오기 실패');
        //         }
        //     })
        // redux에 히스토리 정보 있음
    }, [])

    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>History</h1>
            </div>
            <br />

            <table>
                <thead>
                    <tr>
                        <th>Payment Id</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date Of Purchase</th>
                    </tr>
                </thead>
                <tbody>
                    {props.user.userData && props.user.userData.history.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.dateOfPurchase}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryPage
