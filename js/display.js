$(document).ready(function(){
	
	var cheques_data = [];
	var cheque_id = 0;
    var cheque_display_data = {};
    getChequesData();

	
	
	// Function to fetch cheques list from json file
	function getChequesData(){
		$.ajax({
		url:'data/data.json'
	}).done(function(data){

		if(data.length > 0){
			cheques_data = data;
			cheque_id = getParameterByName('id');
			displayChequeDetails(cheque_id);
	
		}
		
	});
	}

	// Function to show cheque details
	function displayChequeDetails(id){
		for(var k in cheques_data){
			if(id == cheques_data[k].id){
				cheque_display_data = cheques_data[k];
				var cheque_details = '<span><strong><span class="text_underline">ID</span> :</strong> '+cheque_display_data.id+'</span><br><br><span><strong><span class="text_underline">Name</span> :</strong>  '+cheque_display_data.name+'</span><br><br><span><strong><span class="text_underline">Date</span> :</strong>  '+cheque_display_data.date+'</span><br><br><span><strong><span class="text_underline">Amount</span> :$ </strong>  '+cheque_display_data.amount+'</span><br><strong><span class="text_underline">Pay</span> :</strong><br> '+showNumberInWords(cheque_display_data.amount);
				$('#cheque_details_body').html(cheque_details);
				break;
			}
		}
	}

	// Function to get query params from the URL
	function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
   }

   // Converting Number to Words

   function showNumberInWords(amount){
	var num_split = amount.split('.');
	var last_string = '';
	if(num_split.length == 2){
		last_string += ' and '+inWords(num_split[1])+'cents';
	}
	var number_in_words = inWords(num_split[0].replace(',',''))+'dollars'+last_string;
	return number_in_words.toUpperCase();

   }

function inWords (num) {
	
	var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
	var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '' : '';
    return str;
}
	
});