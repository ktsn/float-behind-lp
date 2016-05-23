import './brand.scss';
import template from './brand.html';

export default {
  template,

  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  }
};
