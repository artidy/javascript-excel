import $ from '../../core/dom';

export default class Loader {
  getRoot() {
    return $.create('div', 'loader').html(`
      <div class="loadingio-spinner-ripple-20c9z14hhtl">
        <div class="ldio-4dm4h2084gd">
          <div></div>
          <div></div>
        </div>
      </div>
    `).$el
  }
}
