
import React, { Component } from 'react';
import Bubbles from '../../components/bubbles/Bubbles';
import { StoreState } from '../../types/StoreState';
import { addMessages } from '../../actions/index';
import { connect } from 'react-redux';
import SocketService from '../../services/socket.service';
import { message, Input, Row, Col, Button } from 'antd';
import './Chat.scss';


/**
 * This container is responsible for the chat page
 * @component container
 * @param none
 */
class Chat extends Component<any, any> {


    constructor(props: any) {
        super(props);
        this.state = {
            messageToSend: ''
        }
    }

    onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        this.setState({ messageToSend: newValue });
    }

    sendMessage = () => {
        this.props.send({ message: this.state.messageToSend })
        SocketService.emitNewMessage({ message: this.state.messageToSend, sender: this.props.states.messages.options.userName, date: new Date() })
        this.setState({ messageToSend: '' });
    }

    handleKeywordKeyPress = (e: React.KeyboardEvent<any>) => {
        if (e.key === 'Enter' && e.ctrlKey && this.props.states.messages.options.sendOnEnter === 0) {
            console.log(this.props);
            this.sendMessage()
        }

        if (e.key === 'Enter' && e.ctrlKey && this.props.states.messages.options.sendOnEnter !== 0) {
            message.warn(`Please enable on settings the CTRL+ENTER option`);
        }

    };


    render = () => {
        const { clockDisplay } = this.props.states.messages.options;
        console.log(clockDisplay);
        return (
            <div>
                <div className="chat">
                    {this.props.messages.map((message: any, index: number) => {
                        return <Bubbles key={index} message={message.message} sender={message.sender} date={message.date} dateFormat={clockDisplay} />
                    })}
                </div>
                <Row>
                    <Col xs={15} lg={21}><Input onKeyPress={this.handleKeywordKeyPress} onChange={this.onChange} value={this.state.messageToSend} className="input-message" />
                    </Col>
                    <Col offset={1} xs={8} lg={2}><Button onClick={this.sendMessage} shape="round" size={'large'} type="primary" block>Send</Button></Col>
                </Row>
            </div>
        );
    }
}


const mapStateToProps = (state: StoreState, ownProps: any) => ({
    states: state
});

const mapDispatchToProps = {
    receive: addMessages,
    send: addMessages
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
