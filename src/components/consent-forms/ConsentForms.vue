<template>
	<div>
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
  import consentForms from '../../../data/consent-forms.json'; // TODO: make real API call
  import ConsentFormsCheckboxes from './ConsentFormsCheckboxes.vue';
  import ConsentFormsTabs from './ConsentFormsTabs.vue';

	export default {
	  name: 'consent-forms',
		components: {ConsentFormsCheckboxes, ConsentFormsTabs},
		props: ['appointment'],
    data() {
      return {
        forms: consentForms,
	      isTabsVisible: false,
        selected: []
      }
    },
		computed: {
      initials() {
        const {first_name, last_name} = this.appointment;
        return [first_name.charAt(0).toUpperCase() + last_name.charAt(0).toUpperCase()].join();
      }
		},
    methods: {
	    onSelect($event) {
	      this.selected = $event;
      },
      onSign() {
	      this.isTabsVisible = !this.isTabsVisible;
      }
    }
	}
</script>
