import React, { Component } from 'react';
import { Modal } from 'antd';

interface Props {
    onSubmit: Function;
}

export default class NameInputModal extends Component<Props> {
    state = { visible: true, userName: '' };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        this.props.onSubmit(this.state.userName);
    };

    handleCancel = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        this.setState({ userName: newValue });
    }

    render() {
        return (
            <div>
                <Modal
                    title="Welcome to our chat app"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Please input your username</p>
                    <input value={this.state.userName} onChange={this.onChange} />

                </Modal>
            </div>
        );
    }
}

