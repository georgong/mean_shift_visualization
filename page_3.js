bind_generate = false
bind_shown = false
reset = true
current_bindwidth = 10
async function generate_cluster(){
    class1  = generateGaussianData([0, 0], [70, 20], 20)
    class2 = generateGaussianData([100, -200], [30, 10], 20)
    class3 = generateGaussianData([200, 100], [50, 50], 20)
    d3.select("#img3").append("g").attr("id","bindwidth_visualization")
    /*console.log(class1)*/
    

    d3.select("#img3").append("g").append("rect").attr("id","background3").attr("height",600).attr("width",600)
    .attr("fill","rgba(255,255,255,1)")

    g1 = d3.select("#img3").append("g").attr("class","p4class1")
    g1.selectAll("circle").data(class1).join("circle").attr("class","p4data")
    .attr("cx",function(d,i){return 300 + d.x})
    .attr("cy",function(d,i){return 300 - d.y})
    .attr("fill","purple")
    .attr("r",4).raise()
    g2 = d3.select("#img3").append("g").attr("class","p4class2")
    g2.selectAll("circle").data(class2).join("circle").attr("class","p4data")
    .attr("cx",function(d,i){return 300 + d.x})
    .attr("cy",function(d,i){return 300 - d.y})
    .attr("fill","blue")
    .attr("r",4).raise()
    g3 = d3.select("#img3").append("g").attr("class","p4class3")
    g3.selectAll("circle").data(class3).join("circle").attr("class","p4data")
    .attr("cx",function(d,i){return 300 + d.x})
    .attr("cy",function(d,i){return 300 - d.y})
    .attr("fill","green")
    .attr("r",4).raise()

}

generate_cluster()

async function perform_mean_shift(){
    if (bind_shown){
        show_bindwidth()
        bind_shown = false
    }
    if(reset === false){
        d3.select("#windowlist").remove()

    }
    total_data = class1.concat(class2).concat(class3)
    console.log(total_data)
    bind_width = parseInt(d3.select("#bindwidth").property("value"))
    iteration_time = parseInt(d3.select("#iteration_set").property("value"))
    d3.select("#img3").append("g").attr("id","windowlist").selectAll(".p4window").data(total_data).join("circle").attr("class","p4window")
    .attr("cx",function(d,i){return 300 + parseInt(d.x)})
    .attr("cy",function(d,i){return 300 - parseInt(d.y)})
    .attr("fill","red").attr("opacity",0.1)
    .attr("r",10).transition().delay(100).attr("opacity",0.2)

    
    for(let i=0; i< iteration_time;i++){
        new_data = []
        console.log("loop" + i)
        d3.select("#windowlist").selectAll(".p4window").transition().delay(200).attr("cx",function(d,i){
            window_x_list = []
            window_y_list = []
            
            for(let j=0;j<total_data.length;j++){
                if(((parseInt(d.x) - parseInt(total_data[j].x))**2 + (parseInt(d.y) - parseInt(total_data[j].y))**2) < (parseInt(bind_width)**2)){
                    window_x_list.push(total_data[j].x)
                    window_y_list.push(total_data[j].y)
                } 
            }
            new_data.push({"x":d3.mean(window_x_list),"y":d3.mean(window_y_list)})
            return 300 + d3.mean(window_x_list)

        }).attr("cy",function(d,i){
            window_x_list = []
            window_y_list = []
            for(let j=0;j<total_data.length;j++){
                if(((parseInt(d.x) - parseInt(total_data[j].x))**2 + (parseInt(d.y) - parseInt(total_data[j].y))**2) < (bind_width**2)){
                    window_x_list.push(total_data[j].x)
                    window_y_list.push(total_data[j].y)
                }
                
                
            }
            return 300 - d3.mean(window_y_list)

        })
        d3.select("#windowlist").selectAll(".p4window").data(new_data)
        await new Promise(resolve => setTimeout(resolve, 400));
    }

    
    reset = false
}

async function show_bindwidth(){
    if(bind_generate === false){
    total_data = class1.concat(class2).concat(class3)
    bind_width = parseInt(d3.select("#bindwidth").property("value"))
    g1 = d3.select("#img3").append("g").selectAll("circle").data(total_data).join("circle").attr("class","bindwidth_visualization")
    .attr("cx",function(d,i){return 300 + d.x})
    .attr("cy",function(d,i){return 300 - d.y})
    .attr("fill","red").attr("opacity",8/bind_width)
    .attr("r",bind_width)
    bind_generate = true
    bind_shown = true
    }else {
        if(bind_shown != true){
            bind_width = parseInt(d3.select("#bindwidth").property("value"))
            d3.select("#img3").selectAll(".bindwidth_visualization").transition().attr("r",bind_width).attr("opacity",8/bind_width)
            bind_shown = true
        }else{
            bind_width = parseInt(d3.select("#bindwidth").property("value"))
            d3.select("#img3").selectAll(".bindwidth_visualization").transition().attr("opacity",0).attr("r",bind_width)
            bind_shown = false

        }
    }
}