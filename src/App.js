import React, { Component } from 'react';
import './App.css';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { updateDiscounts } from './actions/user-actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item1: {
        subTotal: 102.96,
        pickupSavings: 3.85,
        taxes: 8.92,
        estTotal: 108.03,
        pickupTooltip: "Picking this up will save you some money"
      },
      total: 108.03,
      hide: false,
      promoHide: false
    }

    this.hideItemDetails = this.hideItemDetails.bind(this);
    this.showItemDetails = this.showItemDetails.bind(this);
    this.showPromoDetails = this.showPromoDetails.bind(this);
    this.hidePromoDetails = this.hidePromoDetails.bind(this);
    this.onUpdateDiscounts = this.onUpdateDiscounts.bind(this);
    this.verifyDiscount = this.verifyDiscount.bind(this);
  }

  verifyDiscount() {
    if(this.props.code === "DISCOUNT") {
      let verifyTempTotal = this.state.item1.estTotal * 0.9;
      let newTotal = this.state.total * 0.9;
      if (verifyTempTotal === newTotal){
        this.setState({total: newTotal})
      }
    }
  }

  onUpdateDiscounts(event) {
    this.props.onUpdateDiscounts(event.target.value);
  }
  
  showItemDetails(){
    this.setState({hide: true})
  }

  hideItemDetails(){
    this.setState({hide: false})
  }

  showPromoDetails(){
    this.setState({promoHide: true})
  }

  hidePromoDetails(){
    this.setState({promoHide: false})
  }

  render() {
    return (
      <div className="App">
        console.log('repaint');
        <div>
          <div className="wrapper">
            <div><span>Subtotal: </span><span className="right">${this.state.item1.subTotal}</span></div>
            <div><span><Tooltip message={this.state.item1.pickupTooltip} position={'bottom'}>Pickup Savings: </Tooltip></span><span className="savings right">${this.state.item1.pickupSavings}</span></div>
            <div><span>Est Taxes & Fees </span><span className="right">${this.state.item1.taxes}</span></div>
          </div>
          <div className="estTotal"><span>Est. total </span><span className="right">${this.state.total}</span></div>
          <div>
            <div>
              {!this.state.hide && (
                 <div className="itemDetails" onClick={this.showItemDetails}>See Item Details +</div>
              )}
              {this.state.hide && (
                <div>
                  <div className="itemDetails" onClick={this.hideItemDetails}>Hide Item Details - </div>
                  <div>
                  <div className="picture"></div>
                  <div className="description">OFM Essentials Racecar-Style Leather Gaming Chair, Multiple Colors</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
              {!this.state.promoHide && (
                 <div className="promo" onClick={this.showPromoDetails}>Apply promo code +</div>
              )}
              {this.state.promoHide && (
                <div>
                  <div className="promo" onClick={this.hidePromoDetails}>Hide promo code - </div>
                  <div>Promo Code</div>
                  <input onChange={this.onUpdateDiscounts} />
                  <button onClick={this.verifyDiscount}>Apply</button>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    products: state.products,
    code: state.code,
  }
}

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onUpdateDiscounts: updateDiscounts
  }, dispatch);
};

class Tooltip extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayTooltip: false
    }
    this.hideTooltip = this.hideTooltip.bind(this)
    this.showTooltip = this.showTooltip.bind(this)
  }
  
  hideTooltip () {
    this.setState({displayTooltip: false})
    
  }
  showTooltip () {
    this.setState({displayTooltip: true})
  }

  render() {
    let message = this.props.message
    let position = this.props.position
    return (
      <span className='tooltip'
          onMouseLeave={this.hideTooltip}
        >
        {this.state.displayTooltip &&
        <div className={`tooltip-bubble tooltip-${position}`}>
          <div className='tooltip-message'>{message}</div>
        </div>
        }
        <span 
          className='tooltip-trigger'
          onMouseOver={this.showTooltip}
          >
          {this.props.children}
        </span>
      </span>
    )
  }
}

export default connect(mapStateToProps, mapActionsToProps)(App);
