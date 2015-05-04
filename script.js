/**
 * Created by KellyShimkoJohnson on 5/1/15.
 */
var domain = 'https://api.github.com/users/';
var i;
var rowCount = 0;
var $row;
var apiKey = '?client_id=f8a4b95805c9804c9eb7&client_secret=4b1bff35a5b8b802fe4bb4e1204afd2f56fc8d8d';

function dataDisplay(data){
    // User object is returned within responseJSON property
    var user = data;
    // Dynamically create container
    var $column = $('<div class="col-sm-4"></div>');
    var $userDiv = $('<div class="well well-sm"></div>');
    var $name = $('<div class="user-name"></div>');
    var $repos = $('<div class="user-repos"></div>');
    // Build img + username header
    $name.append("<img src='" + user.avatar_url + "'>");
    $name.append('<h3><a href="' + user.html_url + '">' + user.login + '</a></h3>');
    // Decide if we need a new row
    if (rowCount % 3 == 0) {
        $row = $('<div class="row"></div>');
        $('.container').append($row);
    }
    rowCount++;
    // Build repo information
    $.ajax({
        type: 'GET',
        datatype: 'json',
        crossDomain: true,
        url: user.repos_url + apiKey,
        success:function(data){
            // Loop thru top 5 repos
            for (i=0; i<data.length && i<5; i++) {
                var $newRepo = $('<div></div>');
                $newRepo.append('<h4><a href="' + data[i].svn_url + '">' + data[i].name + '</a></h4>');
                if (data[i].description != "") {
                    $newRepo.append('<p><strong>' + data[i].language + ':</strong> <em>'  + data[i].description + '</em></p>');
                }
                else {
                    $newRepo.append('<p><strong>' + data[i].language + ':</strong> <em>Description unavailable.</em></p>');
                }
                $repos.append($newRepo);
            }
            // Then: Append everything to userDiv and append that to the global $row variable
            $userDiv.append($name);
            $userDiv.append($repos);
            // Hide column so we can animate it
            $column.append($userDiv).hide();
            // Append invisible column to row
            $row.append($column);
            // Fade in column using the same variable that refers to the jquery object we made earlier
            // It remembers the column it was referring to, so we only slide down the one element
            $column.slideDown();
        }
    })
}

$(document).ready(function(){

    $('.js-search').click(function(){
        $.ajax({
        type:'GET',
        datatype:'json',
        crossDomain: true,
        url: encodeURI(domain + $('.js-query').val() + apiKey),
        success: function(data) {
            console.log(data);
            dataDisplay(data);
        }
        });

    });

    $('.js-query').keyup(function(key){
        console.log(key);

        if(key.keyCode ==13){
            $('.js-search').click();
        }
    });

});