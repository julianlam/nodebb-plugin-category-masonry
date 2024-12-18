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
				<div class="card-text d-flex align-items-center justify-content-between">
					<small class="text-body-secondary timeago" title="{./timestampISO}">&nbsp;</small>
					<div>
						<i class="fa fa-fw text-xs text-secondary opacity-75 fa-thumbs-up"></i>
						<small class="text-secondary" title="{./votes}">{humanReadableNumber(./votes, 0)}</small>
					</div>
					<div>
						<i class="fa fa-fw text-xs text-secondary opacity-75 fa-message"></i>
						<small class="text-secondary" title="{./postcount}">{humanReadableNumber(./postcount, 0)}</small>
					</div>
					<div>
						<i class="fa fa-fw text-xs text-secondary opacity-75 fa-eye"></i>
						<small class="text-secondary" title="{./viewcount}">{humanReadableNumber(./viewcount, 0)}</small>
					</div>
				</div>
			</div>
		</div>
	</div>
	{{{ end }}}
</div>