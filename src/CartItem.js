import React, { Component } from 'react';

class CartItem extends Component{
    
        constructor(props) {
          super(props)
          this.state = {
            
            count : 0
          }
        }
        increment = (count) => {
            
            this.setState({count: count + 1})
            
        
          }
          decrement = (count) => {
        
            
            this.setState({count: count - 1 })
            
          }
    render(){
        return(
            <div>
                <span
                className="btn btn-black mx-1"
                onClick={ this.decrement()}>
                -
              </span>
              <span className="btn btn-black mx-1">{this.state.count}</span>
              <span
                className="btn btn-black mx-1"
                onClick={ this.increment()} >
                +
              </span>
            </div>
        );

    }
}

export default CartItem;