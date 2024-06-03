
function initialize_trace() {
    
    img2 = d3.select("#img2-1")
    img2.append("g").attr("id","data2-1").selectAll(".img2_1_data").data(array).join("circle").attr("class","img2_1_data")
    .attr("cx",function(d,i){return 300 + d.x})
    .attr("cy",function(d,i){return 300 - d.y})
    .attr("r",8)
    .attr("fill","lightblue")
    img2.append("g").attr("id","tooltip3").append("rect").attr("id","tooltiprect3").attr("x",100).attr('y',100).attr("width",200).attr("height",130)
    .attr("rx",10).attr("ry",10).attr("fill","lightblue")
    .style("visibility","hidden")
    d3.select("#tooltip3").append("text").attr("id","tooltiptext3").attr("x",100).attr('y',100).style("visibility","hidden").text("woc").raise()
    centeroid_array = []

    for(let i =0; i< centeroid_x_list.length;i++){
        centeroid_array.push({"x":centeroid_x_list[i],"y":centeroid_y_list[i]})

    }
    console.log(centeroid_array)
    d3.select("#data2-1").selectAll(".img2_1_centeroid").data(centeroid_array).join("circle").attr("class","img2_1_centeroid")
    .attr("cx",function(d,i){return 300 + d.x})
    .attr("cy",function(d,i){return 300 - d.y})
    .attr("r",12)
    .attr("fill","red").attr("opacity",0).transition().delay(200).attr("opacity",0.7).attr("pointer-events", "none")
    const line = d3.line().x((d) => 300 + d.x).y((d) => 300 - d.y)
    img2.append("path").attr("d", line(centeroid_array))
    .attr("stroke", "red")
    .attr("stroke-width",10).attr("fill","none")
    .attr("opacity",0).transition().delay(400).attr("opacity",0.7).attr("pointer-events", "none")

    img2.append("text").attr("x",20).attr("y",500).attr("font-size",25)
    .text("As the data scatter as a cluster")
    img2.append("text").attr("x",20).attr("y",540).attr("font-size",25)
    .text("The centeroid of data is the point best \"representing\" the total data")
    img2.append("text").attr("x",20).attr("y",580).attr("font-size",25)
    .text("Which can be found by the Mean Shift algorithm")

    



    

   

    }
