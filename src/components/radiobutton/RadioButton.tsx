import React from 'react';
import { Radio } from 'antd';
import './RadioButton.scss'
export interface RadioButtonProps {
    options: Array<any>;
    label: string,
    value: number,
    onChangeRadio: Function
}



const renderOptions = (options: Array<any>) => {
    if (!options) {
        return;
    };

    return (
        options.map((option: any) => {
            return <Radio.Button key={option.value} value={option.value}>{option.label}</Radio.Button>
        })

    )

}


const RadioButton: React.FC<RadioButtonProps> = ({ options, label, onChangeRadio, value }) => {
    return (
        <div className="radio-button">
            <h4>{label}</h4>
            <Radio.Group defaultValue={value} onChange={e => onChangeRadio(e.target.value)} >
                {renderOptions(options)}
            </Radio.Group>
        </div>
    );
}

export default RadioButton;
