function testAjax(){
        // jQuery ajax
        $.ajax({url:"http://echo.jsontest.com/insert-key-here/insert-value-here/key/value",success:function(result){
            alert('[1]'+JSON.stringify(result));
        }});

        // jQuery getJSON
        $.getJSON("http://echo.jsontest.com/insert-key-here/insert-value-here/key/value",function(result){
            alert('[2]'+JSON.stringify(result));
        });
        
        /* XHR */
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function()
          {
          if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
              alert('[3]'+xmlhttp.responseText);
            }
          //else {
          //  alert(xmlhttp.status);
          //}
        }
        xmlhttp.open("GET","http://echo.jsontest.com/insert-key-here/insert-value-here/key/value",true);
        xmlhttp.send();
        
      }
