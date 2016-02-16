import './card-wrapper.scss';
import template from './card-wrapper.html';
import card from '../card/card';
import cardData from './card-data';
import {getAbsolutePosition} from '../../utils/position';

export default {
  template,

  data() {
    return {
      cards: null
    };
  },

  created() {
    // the data for storing dragging component
    this.drag = {
      target: null,
      moved: false
    };
  },

  ready() {
    this.width = this.$el.clientWidth;
    this.height = this.$el.clientHeight;

    this.cards = cardData;
  },

  attached() {
    window.addEventListener('resize', this.onWindowResize);
  },

  detached() {
    window.removeEventListener('resize', this.onWindowResize);
  },

  methods: {
    dragStart(cardVM, x, y) {
      cardVM.dragStart(x, y);
    },

    dragMove(cardVM, x, y) {
      cardVM.dragMove(x, y);
    },

    dragEnd(cardVM, moved) {
      if (moved) {
        cardVM.dragEnd();
      }
    },

    onMouseMove(event) {
      if (this.drag.target === null) {
        return;
      }
      this.drag.moved = true;

      // detect mouse position
      const elPosition = getAbsolutePosition(this.$el);
      const x = event.pageX - elPosition.x;
      const y = event.pageY - elPosition.y;

      this.dragMove(this.drag.target, x, y);
    },

    onMouseUp(event) {
      if (this.drag.target === null) {
        return;
      }

      this.dragEnd(this.drag.target, this.drag.moved);

      this.drag.target = null;
      this.drag.moved = false;
    },

    onWindowResize() {
      this.width = this.$el.clientWidth;
      this.height = this.$el.clientHeight;
    }
  },

  events: {
    mouseDownCard(event, cardVM) {
      // detect mouse position
      const elPosition = getAbsolutePosition(this.$el);
      const x = event.pageX - elPosition.x;
      const y = event.pageY - elPosition.y;

      this.drag.target = cardVM;
      this.drag.moved = false;
      this.dragStart(cardVM, x, y);
    }
  },

  components: { card }
};
