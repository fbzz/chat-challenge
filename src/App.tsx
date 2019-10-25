import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom'
import Chat from '../src/containers/chat/Chat'
import SettingsPage from '../src/containers/settings/Settings'

import NameInputModal from './components/modal';
import { message, Row, Col, Tabs, Badge, } from 'antd';
import { StoreState } from './types/StoreState';
import { addMessages, createUser } from './actions';
import { connect } from 'react-redux';
import SocketService from './services/socket.service';


const { TabPane } = Tabs;


interface State {
  currentTab: string
  messageCounter: number
};

interface Props {
  createUser?: Function;
}



class App extends Component<any, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      currentTab: "1",
      messageCounter: 0
    }
  }


  callback = (tabValue: any) => {
    this.setState({ currentTab: tabValue });
  }

  componentDidMount() {



    SocketService.socketConnection.on("newMessage", (message: any) => {
      this.props.receive(message);
      if (this.state.currentTab !== '1') {
        this.setState({ messageCounter: this.state.messageCounter + 1 });
      }
    });


    SocketService.socketConnection.on("newUserJoined", (userName: any) => {
      message.info(`User ${userName} has joined on us :), Welcome`);
    });




  }

  /**
   * This method is responsible to receive and send the username to the server
   * @param username string
   */
  onReceiveUserName = (userName: string) => {
    SocketService.emitNewUser(userName)
    message.info(`Welcome ${userName} start chat right now! :)`);
    this.props.createUser({ userName });
    console.log(this.props);
  }

  render() {
    const { messageCounter } = this.state
    return (
      <Router>
        <div >
          <NameInputModal onSubmit={this.onReceiveUserName} />
          <div>
            <Row>
              <Col offset={4} span={16}  >
                <Tabs size={'large'} defaultActiveKey="1" onChange={this.callback}>
                  <TabPane tab={<Badge count={messageCounter}> Chat  </Badge>} key="1">
                    <Chat messages={this.props.states.messages.messages} ></Chat>
                  </TabPane>
                  <TabPane tab="Settings" key="2">
                    <SettingsPage />
                  </TabPane>
                </Tabs>,
                </Col>
            </Row>
          </div>
        </div>
      </Router>
    );
  }
}


const mapStateToProps = (state: StoreState, ownProps: Props) => ({
  states: state
});

const mapDispatchToProps = {
  receive: addMessages,
  send: addMessages,
  createUser: createUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);