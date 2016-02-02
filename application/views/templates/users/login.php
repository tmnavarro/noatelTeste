<!doctype html>
<html class="no-js" lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Login / User</title>
	<link rel="stylesheet" href="<?= base_url()?>public/stylesheets/app.css" />
	<link rel="stylesheet" href="<?= base_url()?>public/stylesheets/font-awesome.min.css" />
	<script src="<?= base_url()?>public/bower_components/jquery/dist/jquery.min.js"></script>
	<script src="<?= base_url()?>public/bower_components/modernizr/modernizr.js"></script>

</head>
<body>

	<div class="content-login">
		<div class="row">
			<div class="small-12 medium-6 medium-centered columns centered">
				<div class="mensagem-erro">
					<?php echo validation_errors(); ?>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="small-12 medium-6 medium-centered columns centered">
				<form action="<?= base_url()?>ci_users/authe_user" method="POST">
					<div class="row">
						<div class="large-12 columns">
							<label>User Name
								<input type="text" placeholder="Username" name="username" />
							</label>
						</div>
					</div>
					<div class="row">
						<div class="large-12 columns">
							<label>Password
								<input type="password" placeholder="*******" name="password"/>
							</label>
						</div>
					</div>
					<div class="row">
						<div class="large-12 columns text-right">
							<button>LOGIN</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	<script src="<?= base_url()?>public/bower_components/foundation/js/foundation.min.js"></script>
	<script src="<?= base_url()?>public/js/jquery-ui.min.js"></script>
	<script src="<?= base_url()?>public/js/app.js"></script>

</body>
</html>