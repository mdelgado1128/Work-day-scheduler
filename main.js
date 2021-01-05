
var convert = function(time){
if(time < 12){
    time += "AM"
}
else if (time === 12){
    time += "PM"
}
else {
    time -= 12 
    time += "PM"
}
return time;
};


var renderBlocks = function(){
var container =$(".container")

for(var i=9; i <= 17; i++ ){
var timeBlock =$("<div>").addClass("time-block row").attr("id", i)
var time =$("<div>").addClass("hour col-lg-1").text(convert(i))
var storage = JSON.parse(localStorage.getItem(convert(i))) || " "
var text =$("<textarea>").addClass("description col-lg-10").val(storage)
var btn =$("<button>").addClass("saveBtn btn col-lg-1").on("click", function(){ 
    var value = $(this).siblings(".description").val()
    var curr = $(this).siblings(".hour").text()
    localStorage.setItem(curr, JSON.stringify(value))
})
var icon = $("<i>").addClass("fas fa-save ")

btn.append(icon)
timeBlock.append(time)
timeBlock.append(text)
timeBlock.append(btn)
container.append(timeBlock)

}
};

var setColor = function(){
    $(".time-block").each(function(){
        var timeblockTime = parseInt($(this).attr("id"))
        var currentTime = moment().hours()
   
        if(timeblockTime < currentTime){
            $(this).addClass("past")
            $(this).removeClass("future")
        }
        else if (timeblockTime === currentTime){
            $(this).removeClass("past")
            $(this).addClass("present")
        }
        else {
            $(this).removeClass("present")
            $(this).addClass("future")
        }



    })
}
$("#currentDay").text(moment().format("dddd, MMMM Do"))


renderBlocks()
setColor()

var updater = setInterval(setColor, 60000)





