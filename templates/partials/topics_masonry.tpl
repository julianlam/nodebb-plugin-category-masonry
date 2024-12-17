<div class="row" data-masonry='{"percentPosition": true }'>
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
			</div>
		</div>
	</div>
	{{{ end }}}
</div>