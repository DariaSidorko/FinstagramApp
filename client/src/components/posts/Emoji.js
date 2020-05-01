import React, {Component} from 'react';
import { getPosts } from '../../actions/postActions';
import ReactDOM, {render}from 'react-dom';


class Emoji extends React.Component  {

    render() {
      const {title, code} = this.props;
      return <span className="emoji" title={title}>{code}</span> 
    }
  }
  
  class App extends React.Component {
  
  renderEmojis() {
    const rangeEmojis = Array.from({length: 256}, (v, k) => (k + 9728).toString(16));
    
    return rangeEmojis.map((code, index) => <Emoji code={unescape ('%u' + code)} title={"My code is :"+code} key={'emj'+index} />) 
  
  } 
  
  render() {
  
    return (
    
      <div>
        {this.renderEmojis()}
   
      </div>
    )
  }
  
  }
  
  ReactDOM.render(<Emoji />, document.querySelector('post'))

