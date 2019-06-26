<template>
	<div v-if="forms.length">
		<consent-forms-checkboxes
				v-bind:forms="forms"
				v-on:select="onSelect"
		></consent-forms-checkboxes>

		<button v-if="selected.length"
		        v-on:click="onSign"
		        type="button"
		        class="btn btn-primary px-4 mb-4"
		>
			Sign
		</button>

		<consent-forms-tabs v-if="selected.length && isTabsVisible"
		                    v-bind:tabs="selected"
		                    v-bind:initials="initials"
		></consent-forms-tabs>
	</div>

</template>
<script>
  import ConsentFormsCheckboxes from './ConsentFormsCheckboxes.vue';
  import ConsentFormsTabs from './ConsentFormsTabs.vue';
  import { getConsentForms } from "../../services/api";

	export default {
	  name: 'consent-forms',
		components: {ConsentFormsCheckboxes, ConsentFormsTabs},
		props: ['appointment'],
    data() {
      return {
        forms: [],
	      isTabsVisible: false,
        selected: []
      }
    },
		created() {
	    this.loadConsentForms();
		},
		computed: {
      initials() {
        const {first_name, last_name} = this.appointment;
        return [first_name.charAt(0).toUpperCase() + last_name.charAt(0).toUpperCase()].join();
      }
		},
    methods: {
	    async loadConsentForms() {
	      const forms = await getConsentForms();
	       if (forms && forms.length) {
	         this.forms = forms;
	       }
	    },
	    onSelect($event) {
	      this.selected = $event;
      },
      onSign() {
	      this.isTabsVisible = !this.isTabsVisible;
      }
    }
	}
</script>
