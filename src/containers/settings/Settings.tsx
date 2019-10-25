
import React, { Component } from 'react';
import RadioButton, { RadioButtonProps } from '../../components/radiobutton/RadioButton';

import { Button } from 'antd';
import { StoreState } from '../../types/StoreState';
import { changeSettings } from '../../actions/index';
import { connect } from 'react-redux';
import './Settings.scss';


/** 
 * This is a container page basicaly all the heavy logic is here for the settings page
 * @component container
*/
class SettingsPage extends Component<any, any> {

    constructor(props: any) {
        super(props);
        console.log(this.props.states.messages.options);
        this.state = {
            messageCounter: 0
        }
    }

    /**
     * Component did update to check if we should save the settings 
     * @param prevProps 
     */
    componentDidUpdate(prevProps: any) {
        if (this.props.states.messages.options !== prevProps.options) {
            this.saveOnLocalStorage();

        }

    }

    private themeOptionRadioButton: RadioButtonProps = {
        options: [{ label: 'Light', value: 0 }, { label: 'Dark', value: 1 }],
        label: 'Interface Color',
        value: 0,
        onChangeRadio: (value: number) => {
            this.props.changeSettings({ theme: value })
            this.themeOptionRadioButton.value = value;
        }
    }

    private clockDisplayRadioButton: RadioButtonProps = {
        options: [{ label: '12 Hours', value: 0 }, { label: '24 Hours', value: 1 }],
        label: 'Clock Display',
        value: 0,
        onChangeRadio: (value: number) => {
            this.props.changeSettings({ clockDisplay: value })
            this.clockDisplayRadioButton.value = value;
        }

    }

    private sendMessagesRadioButton: RadioButtonProps = {
        options: [{ label: 'On', value: 0 }, { label: 'Off', value: 1 }],
        label: 'Send on CTRL+ENTER',
        value: 0,
        onChangeRadio: (value: any) => {
            this.props.changeSettings({ sendOnEnter: Number(value) })
            this.sendMessagesRadioButton.value = value;
        }
    }

    private saveOnLocalStorage() {
        localStorage.setItem('options', JSON.stringify(this.props.states.messages.options));
    }

    private resetSettingsToDefault = () => {

    }



    render = () => {
        return (

            <div className='settings'>
                <div className='options'>
                    <RadioButton onChangeRadio={this.themeOptionRadioButton.onChangeRadio} options={this.themeOptionRadioButton.options} label={this.themeOptionRadioButton.label} value={this.props.states.messages.options.theme} />
                </div>
                <div className='options'>
                    <RadioButton onChangeRadio={this.clockDisplayRadioButton.onChangeRadio} options={this.clockDisplayRadioButton.options} label={this.clockDisplayRadioButton.label} value={this.props.states.messages.options.clockDisplay} />
                </div>
                <div className='options'>
                    <RadioButton onChangeRadio={this.sendMessagesRadioButton.onChangeRadio} options={this.sendMessagesRadioButton.options} label={this.sendMessagesRadioButton.label} value={this.props.states.messages.options.sendOnEnter} />
                </div>
                <div className='options'>
                    <Button onClick={this.resetSettingsToDefault} type="danger">Reset to defaults</Button>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state: StoreState, ownProps: any) => ({
    states: state
});

const mapDispatchToProps = {
    changeSettings: changeSettings
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
