import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleClickBackdrop = e => {
    if (e.target === e.currentTarget) this.props.onClose();
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.handleClickBackdrop}>
        <div className="Modal">{children}</div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
};

export default Modal;
