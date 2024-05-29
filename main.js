let total_x = [];
let total_y = [];
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let svg = d3.select("#img1");
let centeroid_x = 0;
let centeroid_y = 0;

const drag = d3.drag();

svg.append("circle").attr("id","centeroid1")
    .attr("cx", 200)
    .attr("cy", 200)
    .attr("r", 4)
    .attr("fill","red")
    .attr("opacity", 0.9)


let cr = svg.append("circle").attr("id","window1")
    .attr("cx", 200)
    .attr("cy", 200)
    .attr("r", 200)
    .attr("opacity", 0.1);

svg.append("circle").attr("id","windowcenter")
    .attr("cx", 200)
    .attr("cy", 200)
    .attr("r", 4)
    .attr("fill","red")
    .attr("opacity", 0.6)

// Create tooltip container
let tooltip = svg.append("rect")
    .attr("id", "tooltip1")
    .attr("width", 80)
    .attr("height", 60)
    .attr("rx", 15)
    .attr("ry", 15)
    .style("fill", "white")
    .style("visibility", "hidden")
    .attr("opacity", 0.8);

svg.append("text")
    .attr("id", "tooltiptext1")
    .style("visibility", "hidden")

svg.append("text")
    .attr("id", "tooltiptext2")
    .style("visibility", "hidden")


svg.append("line").attr("id","shiftline")
.attr("x1",200).attr("y1",200)
.attr("x2",200).attr("y2",200)
.attr("stroke", "red")
.attr("stroke-width", 8)






cr.on("click", function(event) {
    const [x, y] = d3.pointer(event);
    let data_point = svg.append("circle").attr("class","datapoint")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 0)
        .attr("fill", "blue")
        .attr("opacity", 0);
    

    total_x.push(parseInt(x) - 200);
    total_y.push(parseInt(y) - 200);

    let centeroid_x = d3.mean(total_x)
    let centeroid_y = d3.mean(total_y)
    d3.select("#centeroid1").transition().delay(20).attr("cx",centeroid_x + 200).attr("cy",centeroid_y + 200)
    d3.select("#shiftline").transition().delay(20).attr("x1",200).attr("y1",200)
    .attr("x2",centeroid_x + 200).attr("y2",centeroid_y + 200)



    

    data_point.transition().duration(100).attr("r", 10).attr("opacity", 0.3);


    data_point.on("mouseover", function() {
        let dx = d3.select(this).attr("cx");
        let dy = d3.select(this).attr("cy");

        d3.select("#tooltip1")
            .style("visibility", "visible")
            .attr("x", parseInt(dx) + 18)
            .attr("y", parseInt(dy) - 45).raise()
            ;
        d3.select("#tooltiptext2")
            .style("visibility", "visible")
            .attr("x", parseInt(dx) + 30)
            .attr("y", parseInt(dy) + 3)
            .text("Y: " + (parseInt(dy) - 200)).raise();
        d3.select("#tooltiptext1")
            .style("visibility", "visible")
            .attr("x", parseInt(dx) + 30)
            .attr("y", parseInt(dy) - 23)
            .text("X: " + (parseInt(dx) - 200)).raise();
    });

    data_point.on("mouseout", function() {
        d3.select("#tooltip1")
            .style("visibility", "hidden");
        d3.select("#tooltiptext1")
            .style("visibility", "hidden")
        d3.select("#tooltiptext2")
            .style("visibility", "hidden")
    });
    data_point.call(d3.drag().on("drag",function dragged(event, d) {
        previous_x = d3.select(this).attr("cx")
        previous_y = d3.select(this).attr("cy")
        if((200 - event.x)**2 + (200 - event.y)**2 >= 40000){
            return;
        }
        d3.select(this).attr("cx", event.x).attr("cy", event.y);
        total_x[0] += (-parseInt(previous_x))
        total_y[0] += (-parseInt(previous_y))
        total_x[0] += (parseInt(event.x))
        total_y[0] += (parseInt(event.y))
        let centeroid_x = d3.mean(total_x)
        let centeroid_y = d3.mean(total_y)
        d3.select("#centeroid1").transition().delay(1).attr("cx",centeroid_x + 200).attr("cy",centeroid_y + 200)
        d3.select("#shiftline").transition().delay(1).attr("x1",200).attr("y1",200)
    .attr("x2",centeroid_x + 200).attr("y2",centeroid_y + 200)
        

      }))

    
});

d3.select("#shiftline").on("mouseover",function(){
    let dx = d3.select(this).attr("x2");
        let dy = d3.select(this).attr("y2");

        d3.select("#tooltip1").style("fill","yellow")
            .style("visibility", "visible")
            .attr("x", parseInt(dx) + 18)
            .attr("y", parseInt(dy) - 45)
            .attr("width", 160)
            .attr("height", 60)
            .raise()
            ; // Adjust tooltip position
        d3.select("#tooltiptext2")
            .style("visibility", "visible")
            .attr("x", parseInt(dx) + 30)
            .attr("y", parseInt(dy) + 3)
            .text("centeroid Y: " + (parseInt(dy) - 200)).raise();
        d3.select("#tooltiptext1")
            .style("visibility", "visible")
            .attr("x", parseInt(dx) + 30)
            .attr("y", parseInt(dy) - 23)
            .text("centeroid X: " + (parseInt(dx) - 200)).raise();
})

d3.select("#shiftline").on("mouseout",function(){
    d3.select("#tooltip1").style("fill","rgb(255,255,255)").attr("width", 80)
    .attr("height", 60)
            .style("visibility", "hidden");
        d3.select("#tooltiptext1")
            .style("visibility", "hidden")
        d3.select("#tooltiptext2")
            .style("visibility", "hidden")
    });



function clear_graph1() {
    if(total_x.length ==0){
        return;
    }
    let centeroid_x = d3.mean(total_x)
    let centeroid_y = d3.mean(total_y)
    cr.transition().delay(400).attr("cx",centeroid_x + 200).attr("cy",centeroid_y + 200).transition()
    .delay(400).attr("cx",200).attr("cy",200)
    d3.select("#windowcenter").transition().delay(400).attr("cx",centeroid_x + 200).attr("cy",centeroid_y + 200).transition()
    .delay(400).attr("cx",200).attr("cy",200)
    d3.selectAll("#img1").selectAll(".datapoint").transition().delay(1000)
    .attr("opacity",0).remove()
    d3.select("#centeroid1").transition().delay(400).attr("cx",centeroid_x + 200).attr("cy",centeroid_y + 200).transition()
    .delay(400).attr("cx",200).attr("cy",200)
    d3.select("#shiftline").transition().attr("x1",200).attr("y1",200)
    .attr("x2",200).attr("y2",200)
    total_y = []
    total_x = []
    centeroid_x = 0;
    centeroid_y = 0;
    
}











