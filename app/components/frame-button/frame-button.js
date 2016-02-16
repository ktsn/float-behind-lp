import './frame-button.scss';
import template from './frame-button.html';
import macIcon from '../mac-icon/mac-icon';
import windowsIcon from '../windows-icon/windows-icon';

export default {
  template,

  props: ['disabled', 'theme', 'icon', 'label'],

  components: { macIcon, windowsIcon }
};
