$('#drupalgap_comment_edit').on('pagebeforeshow',function(){
	try {
	  drupalgap_form_render('comment', '#drupalgap_comment_edit .content');
		/*if (drupalgap.comment_edit.cid) {
			// Editing existing comment.
			$('#drupalgap_comment_edit h1').html('Edit Comment');
		}
		else {
			// Adding new comment.
			$('#drupalgap_comment_edit h1').html('Add Comment');
			$('#comment_delete').hide();
		}
		$('#drupalgap_comment_edit h2').html(drupalgap.node.title);*/
	}
	catch (error) {
		alert('comment_edit - pagebeforeshow - ' + error);
	}
});

$('#drupalgap_comment_edit').on('pageshow',function(){
	try {
	}
	catch (error) {
		alert('comment_edit - pageshow - ' + error);
	}
});

$('#comment_submit').on('click',function(){
	try {
		var subject = $('#comment_subject').val();
	  	var body = $('#comment_body').val();
	  	if (drupalgap.comment_edit.cid) {
			// Existing comment.
	  		drupalgap.services.comment.update.call({
	  			'comment':{
	  				'cid':drupalgap.comment_edit.cid,
					'subject':subject,
					'body':body,
	  			},
				'success':function(result){
					$.mobile.changePage('node.html');
				},
			});
		}
		else {
			// New comment.
			drupalgap.services.comment.create.call({
				'comment':{
					'nid':drupalgap.node.nid,
					'subject':subject,
					'body':body,
				},
				'success':function(result){
					$.mobile.changePage('node.html');
				},
			});
		}
	}
	catch (error) {
		alert('comment_submit - ' + error);
	}
	
	return false;
});

$('#edit-comment-edit-cancel').on('click',function(){
    alert('comment cancel');
});

$('#edit-comment-edit-').on('click',function(){
	try {
		if (confirm('Are you sure you want to delete "' + drupalgap.comment_edit.subject + '"? This cannot be undone.')) {
			drupalgap.services.comment.del.call({
				'cid':drupalgap.comment_edit.cid,
				'success':function(result){
					if (result[0]) {
						alert('Comment deleted!');
					}
					$.mobile.changePage(drupalgap.settings.front);
				},
			});
		}
	}
	catch (error) {
		alert('comment_delete - ' + error);
	}
	return false;
});
