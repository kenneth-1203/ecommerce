import React, { Component } from "react";

import Toast from "react-bootstrap/Toast";
import { connect } from "react-redux";

class MenuNotifications extends Component {
  state = {
    onLoad: false,
    toast: false,
    count: 0,
    favorites: [],
    message: "",
  };

  componentDidMount() {
    this.setState({ count: this.props.count, favorites: this.props.favorites });
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.count, this.props.count)
    if (prevProps.count !== this.props.count) this.cartToast(prevProps.count);
    if (
      prevProps.favorites &&
      prevProps.favorites.length !== 0 &&
      prevProps.favorites.length !== this.props.favorites.length
    )
      this.favToast(prevProps.favorites.length);
  }

  cartToast = (count) => {
    if (count !== undefined && (this.props.count + 2) % (count + 2) === 1) {
      this.setState({ toast: true, message: "Added to cart" });
      setTimeout(() => {
        this.setState({ toast: false });
      }, 2000);
    }
  };

  favToast = (count) => {
    if (count !== undefined && this.props.favorites.length - 2 === count - 1) {
      this.setState({ toast: true, message: "Added to favorites" });
      setTimeout(() => {
        this.setState({ toast: false });
      }, 2000);
    }
  };

  render() {
    return (
      <Toast className="menu-notification my-2" show={this.state.toast}>
        <Toast.Header>
          <i className="fas fa-shopping-bag" style={{ marginRight: "1em" }}></i>
          <strong className="float-start">{this.state.message}</strong>
        </Toast.Header>
        {/* <Toast.Body>See? Just like this.</Toast.Body> */}
      </Toast>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    count: state.shop.count,
    favorites: state.firebase.profile.favorites,
  };
};

export default connect(mapStateToProps)(MenuNotifications);
