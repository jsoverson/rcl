
var FOO = {
  clog : {
    info : function(){}
  }
};

function a(){
  clog.info("BAR");
  FOO.clog.info("FOOOBJ");
}

FOO.clog.log("FOOOBJ");

a();
