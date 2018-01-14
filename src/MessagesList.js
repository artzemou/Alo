import React, { Component } from 'react';
import io from "socket.io-client";



export default class MessagesList extends Component{
  constructor(props){
      super(props);

      this.state = {
          username: false,
          avatarColor: '',
          message: '',
          messages: [],
          opened: false
      };

      //this.socket = io( window.location.hostname );
      this.socket = io( 'localhost:5000');

      this.socket.on('RECEIVE_MESSAGE', function(data){
          addMessage(data);
      });

      const addMessage = data => {
          this.setState({messages: [...this.state.messages, data]});
      };

      this.sendMessage = ev => {
          ev.preventDefault();
          !this.state.username ? this.setState({username:"?"}) : null
          this.socket.emit('SEND_MESSAGE', {
              author: this.state.username,
              message: this.state.message,
              avatarColor: this.state.avatarColor
          })
          this.setState({message: ''});

      }

      this.getRandomColor = this.getRandomColor.bind(this)
  }

  getRandomColor() {
    const colorCodes = [
      {color:'#333333', background:'#2196F3'},
      {color:'#ffffff', background:'#9C27B0'},


    ];

    var color = colorCodes[Math.floor(Math.random() * Math.floor(colorCodes.length))]

    this.setState({avatarColor: color})
  }


  componentDidUpdate() {

      document.querySelector('.scrollableContent').scrollTop = document.querySelector('.scrollable').offsetHeight

  }



  render(){
    return(
      <div>
        <div className="messagesList">
            <div className="messagesListContent">
              <div className="scrollableContent">
                <div className="scrollable">
                    {this.state.messages.map((message, index) => {
                        return (
                            <div className="bubble"
                                 key={index}
                                 >
                                <div  style={{background : message.avatarColor.background, color: message.avatarColor.color}}
                                      className ={message.author ? `${message.author.charAt(0).toUpperCase()} avatar` : "avatar"}
                                  >
                                  <span>{message.author ? `${message.author.charAt(0).toUpperCase()}` : "?" }</span>
                                </div>
                                <div  className = "message"
                                      style={{background : message.avatarColor.background, color: message.avatarColor.color}}
                                    >
                                    <span className="innerText">{message.message}</span>
                                    <span className="date">le {new Date().toLocaleString()}</span>
                                </div>
                            </div>
                        )
                    })}
                  </div>
                </div>
            </div>

        </div>
        <form onSubmit={this.sendMessage}>
            <input  type="text"
                    placeholder="Username"
                    value={this.state.username ? this.state.username : ''}
                    onChange={ev => this.setState({username: ev.target.value})}
                    className={this.state.username ? "hidden" : ""}
            />
            <div style={{display:'flex'}}>
              <input  placeholder="Message"
                      value={this.state.message}
                      onChange={ev => this.setState({message: ev.target.value})}
                      className={this.state.username ? "" : "hidden"}
                      ref={(input) => input != null ? input.focus() : null }
                      style={{width:300}}
              />
              <input  type="submit"
                      value="Send"
                      className={this.state.username ? "" : "hidden"}
                      ref={this.getRandomColor}
                      style={{ marginLeft:'1rem'}}
              />
            </div>
        </form>
      </div>

    )
  }
}
