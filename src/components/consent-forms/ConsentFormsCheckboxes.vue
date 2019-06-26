<template>
	<div>
		<div class="form-check">
			<input class="form-check-input" type="checkbox" v-model="selectAll" id="selectAll">
			<label class="form-check-label" for="selectAll">
				<span v-if="selectAll">Deselect</span>
				<span v-if="!selectAll">Select</span>
				all
			</label>
		</div>

		<ul class="consent-forms-checkboxes mb-3">
			<li v-for="form in forms" class="consent-forms-list__item">
				<div class="form-check">
					<input v-model="selected"
					       v-on:change="emitSelected"
					       :value="form"
					       v-bind:id="form.id"
					       class="form-check-input"
					       type="checkbox"
					>
					<label class="form-check-label" v-bind:for="form.id">
						{{form.title}}
					</label>
				</div>
			</li>
		</ul>
	</div>

</template>
<script>
	export default {
	  name: 'consent-forms-checkboxes',
		props: ['forms'],
    data() {
      return {
        selected: []
      }
    },
    computed: {
      selectAll: {
        get() {
          return this.forms.length === this.selected.length;
        },
        set(value) {
          this.selected = value ? this.forms : [];
          this.emitSelected();
        }
      }
    },
    methods: {
      onTabSelect(tab) {
        console.log(tab);
      },
	    emitSelected() {
        this.$emit('select', this.selected);
	    }
    }
	}
</script>

<style lang="scss">
	.consent-forms-checkboxes {
		list-style: none;
		padding: 0;

		&__item {
			margin-bottom: 0.5rem;
		}
	}
</style>
