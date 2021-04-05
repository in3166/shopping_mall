import React, { useState } from 'react';
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {

    const [Checked, setChecked] = useState([]); // 체크된 값을 배열에 저장
    const handleToggle = (value) => {
        // 누른 것의 Index를 구하고
        const currentIndex = Checked.indexOf(value);
        // 전체 checked된 state에서 현재 누른 checkbox가 이미 
        const newChecked = [...Checked];
        if (currentIndex === -1) {
            // 없으면 state 넣어줌
            newChecked.push(value);
        } else {
            // 있으면 빼주고
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        props.handleFilters(newChecked); // 부모 전달
    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox onChange={() => handleToggle(value._id)} checked={Checked.indexOf(value._id) === -1 ? false : true} />
            <span>{value.name}</span>
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="This is panel header 1" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
