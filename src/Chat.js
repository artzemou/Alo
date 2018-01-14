import React, { Component } from 'react';
import io from "socket.io-client";
import MessagesList from './MessagesList.js';


export default class Chat extends Component{
    constructor(props){
        super(props);

        this.state = {

            opened: false
        };
        this.openLauncher = this.openLauncher.bind(this)
    }
    openLauncher(){
      console.log('????')
      this.state.opened ? this.setState({opened: false}) : this.setState({opened: true})
    }
    render(){
        return (

                <div className="row">
                    <div>
                        <div className={this.state.opened ? "Launcher opened": "Launcher"}>
                            <MessagesList/>
                        </div>
                        <div className="open_Launcher btn">
                          <span onClick={this.openLauncher}>Start</span>
                        </div>
                    </div>
                </div>
        );
    }
}
