<template>
	<div v-if="tabs.length">
		<nav>
			<div class="nav nav-tabs" id="nav-tab" role="tablist">
				<a v-for="tab of tabs"
				   @click="onTabSelect(tab)"
				   class="nav-item nav-link"
				   data-toggle="tab"
				   role="tab"
				   v-bind:class="{active: tab === selectedTab}"
				>
					{{tab.short_title}}
				</a>
			</div>
		</nav>
		<div v-if="contentItems.length" class="tab-content">
			<div class="tab-pane active">
				<ul class="list-group list-group-flush">
					<li v-for="item in contentItems" class="list-group-item">
						<span v-if="isSelectedCheckbox(item)">{{initials}}</span>
						<input v-if="!isSelectedCheckbox(item) && item.need_initials"
						       v-model="checkedInitials"
						       :value="item"
						       type="checkbox"
						       class="form-check-input"
						>
						{{item.content}}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	  name: 'consent-forms-tabs',
		props: ['tabs', 'initials'],
		data() {
	    return  {
	      selectedTab: null,
		    contentItems: [],
		    checkedInitials: []
	    }
		},
		created() {
	    this.setFirstTab();
		},
		watch: {
	    tabs() {
        this.setFirstTab();
      }
		},
    methods: {
	    setFirstTab() {
        if (!this.tabs || !this.tabs.length) {
          this.selectedTab = null;
        }

        this.selectedTab = this.tabs[0];
        this.loadTabContent();
	    },
      onTabSelect(tab) {
	      this.selectedTab = tab;
	      this.loadTabContent();
      },
	    loadTabContent() {
	      // TODO make api calls instead
		    const promise = ((code) => {
          switch (code) {
            case 'extraction':
              return import(`../../../data/consent-form-details/extraction.json`);
            case 'implant':
              return import(`../../../data/consent-form-details/implant.json`);
            case 'bone_graft':
              return import(`../../../data/consent-form-details/bone_graft.json`);
            case 'sinus_lift':
              return import(`../../../data/consent-form-details/sinus_lift.json`);
          }
		    })(this.selectedTab.code);

        promise.then(res => this.contentItems = res.default);
	    },
      isSelectedCheckbox(item) {
	      return this.checkedInitials.includes(item);
      }
    }
	}
</script>

<style lang="sass">

</style>
