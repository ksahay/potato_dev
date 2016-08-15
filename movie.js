var base_url = 'http://image.tmdb.org/t/p/';
var backdrop_sizes = "w92";

function example()
{
    var response = "";
    startScroll();

    $.ajax({
        type: "GET", 
        url: "http://api.themoviedb.org/3/movie/upcoming?api_key=a7f4e7531c0abfef4ade0b794873f5ce", 	//calling the api
        success: function(response)
        {

            console.log(response);
            var output="";
            for (var i in response.results) 
            {
            	//console.log(response.results[i]);
            	movieinfo=" onmouseover=\"showInfo('"+response.results[i].title+"', '"+response.results[i].release_date+"', '"+response.results[i].overview+"');\"h"	
                output+="<div><a href='movdetail.html?movieid="+response.results[i].id+"'><img src="+"'"+base_url+backdrop_sizes+response.results[i].poster_path+"' alt='" + response.results[i].title + "' "+movieinfo+"></a></div>"; //display information
                 $('.scroller').slick('slickAdd',output);
            }
            //output+="";
            
           // $('.scroller').html(output);
        },
        dataType: "json"//datatype set to JSON    
    })

    //setTimeout(startScroll(), 1000);   
    
}

function startScroll(){
	      $('.scroller').slick({
        infinite: true,
  		slidesToShow: 8,
  		slidesToScroll: 1,
  		autoplaySpeed: 1000,
      });
}

function showInfo(a, b, c){
	var output = "<div><h2>"+a+"</h2><br><h3>"+b+"</h3><br><p>"+c+"</p></div>";
    $('.movieInfo').html(output);
}

function movieDetail(movieid)		//detailed page function
{

    $.ajax({
        type: "GET", 
        url: "http://api.themoviedb.org/3/movie/"+movieid+"?api_key=a7f4e7531c0abfef4ade0b794873f5ce", 
        success: function(response)
        {

            console.log(response);
            var output="";
            $('#movietiltle').text(response.title);
            $('#backdropimg').html("<img src="+"'"+base_url+"w300"+response.backdrop_path+"'>"); 
            $('#releasedate').text("Release Date: "+response.release_date);
            $('#overview').text(response.overview);
        },
        dataType: "json"//set to JSON    
    })  ;
    credits(movieid);
    
}


function credits(movieid)		//detailed page cast and crew display function
{
    var response = "";

    $.ajax({
        type: "GET", 
        url: "http://api.themoviedb.org/3/movie/"+movieid+"/credits?api_key=a7f4e7531c0abfef4ade0b794873f5ce", 
        success: function(response)
        {

            console.log(response);
            var output="<h2>cast</h2><ul>";
            for (var i in response.cast) 
            {
            	//console.log(response.results[i]);
            	
                output+="<li><b>"+response.cast[i].name+"</b> : "+response.cast[i].character+"</li>";
            }
            output+="</ul>";
            
           $('#cast').html(output);
             var output2="<h2>Crew</h2><ul>";
            for (var i in response.crew) 
            {
            	//console.log(response.results[i]);
            	
                output2+="<li><b>"+response.crew[i].job+"</b> : "+response.crew[i].name+"</li>";
            }
            output2+="</ul>";
            
           $('#crew').html(output2);
        },
        dataType: "json"//set to JSON    
    })

    //setTimeout(startScroll(), 1000);   
    
}
