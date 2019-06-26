import Vue from 'vue';
import  template from './consent-forms.html';
import consentForms from '../../../data/consent-forms.json'; // TODO: make real API call
import './consent-forms.scss';

export default Vue.component('consent-forms', {
  template,
  props: [],
  data() {
    return {
      forms: consentForms,
      selected: [consentForms[0]]
    }
  },
  computed: {
    selectAll: {
      get() {
        return this.forms.length === this.selected.length;
      },
      set(value) {
        this.selected = value ? this.forms : [];
      }
    }
  }
})
