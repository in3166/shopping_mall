import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';
import RadioGroup from 'antd/lib/radio/group';

const { Panel } = Collapse;

function RadioBox(props) {
    const [Value, setValue] = useState(0); // 체크된 값의 아이디 가짐

    const renderRadioboxLists = () => (props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Radio value={value._id} />
            <span>{value.name}</span>
        </React.Fragment>
    )))

    const handleChange = (e) => {
        setValue(e.target.value);
        props.handleFilters(e.target.value);
    }

    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="가격" key="1">
                    <RadioGroup onChange={handleChange} value={Value}>
                        {renderRadioboxLists()}
                    </RadioGroup>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox
