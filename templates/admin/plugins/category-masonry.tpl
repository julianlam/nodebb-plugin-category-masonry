<div class="acp-page-container">
	<!-- IMPORT admin/partials/settings/header.tpl -->

	<div class="row m-0">
		<div id="spy-container" class="col-12 col-md-8 px-0 mb-4" tabindex="0">
			<form role="form" class="category-masonry-settings">
				<div class="mb-4">
					<h5 class="fw-bold tracking-tight settings-header">Triggers</h5>

					<p class="lead">
						Here you can adjust the triggers for when a category switches to Masonry layout.
					</p>
					<div class="mb-3">
						<label class="form-label" for="thumbPercentage">Thumbnail Percentage</label>
						<input type="range" max="100" min="0" id="thumbPercentage" name="thumbPercentage" title="Thumbnail Percentage" class="form-range" placeholder="(default: 0)" />
						<p class="form-text">
							(default: 0) If the percentage of topics on that given page exceeds a certain percentage (e.g. 80%),
							then the layout will switch to Masonry-style automatically. Set to 0 to disable.
						</p>
					</div>
					<div class="mb-3">
						<label class="form-label" for="cids">Category</label>
						<select class="form-select" name="cids" id="cids" multiple="multiple" size="20">
							{{{ each categories }}}
							<option value="{./cid}">{./name}</option>
							{{{ end }}}
						</select>
						<p class="form-text">
							If selected, these categories will always render using the Masonry-style layout.
						</p>
					</div>
				</div>
			</form>
		</div>

		<!-- IMPORT admin/partials/settings/toc.tpl -->
	</div>
</div>
