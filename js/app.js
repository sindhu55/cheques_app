$(document).ready(function(){
	
	
	getChequesData();
	
	// Function to fetch cheques list from json file
	function getChequesData(){
		$.ajax({
		url:'data/data.json'
	}).done(function(data){

		if(data.length > 0){
			cheques_data = data;

			cheques_data = cheques_data.sort(function (a, b) {
    			//return b.date.localeCompare( a.date );
    			var a_date_split = a.date.split('/');
    			var b_date_split = b.date.split('/');
    			 return new Date(b_date_split[1]+","+b_date_split[0]+","+b_date_split[2]) > new Date(a_date_split[1]+","+a_date_split[0]+","+a_date_split[2]);
			});
			$('#cheques_body').html('');
			for(var k in data){
				var cheque_data = '';
				cheque_data = '<tr><td>'+data[k].id+'</td><td>'+data[k].name+'</td><td>'+data[k].date+'</td><td>$ '+data[k].amount+'</td><td><a href="cheque_details.html?id='+data[k].id+'" class="btn btn-info">View</a></td></tr>';
				$('#cheques_body').append(cheque_data);
			}
		}
		
	});
	}

	
	
});