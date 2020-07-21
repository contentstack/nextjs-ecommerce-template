search.addWidgets([
	instantsearch.widgets.searchBox({
		container: "#search-input-container",
		placeholder: "Search",
	}),
	
	instantsearch.widgets.configure({
		hitsPerPage: 6,
	}),

	instantsearch.widgets.hits({
		container: "#search-hit-container",
		templates: {
			item: `
				<a class="search-hit-item-container" href={{window.location.hostname}}{{url}}>
					<h3 class="theme--heading-font">{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}</h3>
					<p class="search-hit-item-description">{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</p>
				</a>
			`,
			empty: '<p class="search-hit-empty">No results were found for "{{ query }}."</p>'
		},
	}),
]);
  
search.start();
