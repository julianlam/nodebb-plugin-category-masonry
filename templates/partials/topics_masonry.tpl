<div component="category-masonry" class="row">
	{{{ each topics }}}
	<div class="col-sm-6 col-lg-4 mb-4">
		<div class="card">
			{{{ each ./thumbs }}}
			{{{ if @first }}}
			<img src="{./url}" class="img-card-top" />
			{{{ end }}}
			{{{ end }}}
			<div class="card-body">
				<h5 class="card-title">
					<a href="{config.relative_path}/topic/{./slug}" class="stretched-link text-reset text-decoration-none">{./title}</a>
				</h5>
				{{{ if ./teaser.content }}}
				<p class="card-text">{./teaser.content}</p>
				{{{ end }}}
				<p class="card-text">
					<small class="text-body-secondary timeago" title="{./timestampISO}">&nbsp;</small>
				</p>
			</div>
		</div>
	</div>
	{{{ end }}}
</div>