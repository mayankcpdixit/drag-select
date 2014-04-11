/*
	Used for testing.
	Needs Improvement in performence and readability.
*/
jQuery(function($){
	$( document )
		/*
			On DRAG Start
		*/
		.drag("start",function( ev, dd ){
			if(!isCtrl && !isShift){
				console.log("new drag - disSelectAll")
				disSelectAll();
			}
			return $('<div class="selection" />')
				.css('opacity', .65 )
				.appendTo( document.body );
		})
		.drag(function( ev, dd ){
			$( dd.proxy ).css({
				top: Math.min( ev.pageY, dd.startY ),
				left: Math.min( ev.pageX, dd.startX ),
				height: Math.abs( ev.pageY - dd.startY ),
				width: Math.abs( ev.pageX - dd.startX )
			});
		})
		.drag("end",function( ev, dd ){
			$( dd.proxy ).remove();
		});
	$('.drop')
		.drop("start",function(){
			$( this ).addClass("active");
		})
		.drop(function( ev, dd ){
			$( this ).addClass("dropped");
			$(".dropped").children("input").attr("checked", "checked");
		})
		.drop("end",function(){
			$( this ).removeClass("active");
		});
	$.drop({ multi: true });
	/*
		on clicking each div => Div should be selected
	*/
	$(".drop").on('click', function(){
		if(isCtrl){
			toggleThis(this);
		}else{
			selectThis(this);
			
		}
	})
});
