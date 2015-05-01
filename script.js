/**
 * Created by KellyShimkoJohnson on 5/1/15.
 */
var domain = 'https://api.github.com/users'

$(document).ready(function(){

    $.ajax({
        type:'GET',
        datatype:'json',
        crossDomain: true,
        url: 'https://api.github.com/users/kellysjohnson',
        //url: encodeURI(domain + '/kellysjohnson'),
        complete: function(data) {
            console.log(data);
            }
        });

    //
    //$.ajax({
    //    type:'GET',
    //    datatype:'json',
    //    crossDomain: true,
    //    url: encodeURI(domain+ $('.searchBox').val()),
    //    complete: function(data){
    //        console.log(data);
    //    }
    //});


});