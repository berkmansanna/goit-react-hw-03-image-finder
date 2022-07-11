import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handelKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelKeydown);
  }

  handelKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handelBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { imgLarge, alt } = this.props;
    return createPortal(
      <div className={s.overlay} onClick={this.handelBackdropClick}>
        <div className={s.modal}>
          <img src={imgLarge} alt={alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  imgLarge: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
