let total_x = [];
let total_y = [];
let trace_add = false
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


d3.select("#img0").append("image").attr("xlink:href","assets/page0_0.jpg")
.attr("height",500).attr("weight",500).on("mouseover",function(){
    d3.select(this).attr("xlink:href","assets/page0_1.jpg")
}).on("mouseout",function(){
    d3.select(this).attr("xlink:href","assets/page0_0.jpg")
})

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
            .text("Y: " + -(parseInt(dy) - 200)).raise();
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
            .text("centeroid Y: " + -(parseInt(dy) - 200)).raise();
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
let lastKnownScrollPosition = 0;
let ticking = false;

document.addEventListener("scroll", (event) => {
    lastKnownScrollPosition = -550 + window.scrollY;
    /*console.log(lastKnownScrollPosition)*/
  
    if (!ticking) {
      window.requestAnimationFrame(() => {
        transitionTextElements();
        transition_page1()
        transition_page2()
        ticking = false;
      });
  
      ticking = true;
    }
});





let hasgrindline2 = false;


function transition_page1(){
    if (lastKnownScrollPosition > 300) {
        d3.select(".discription").transition().style("opacity",0)
        d3.select("#clear_data").transition().style("opacity",0)
        var d = document.getElementById("page1text1");
        d.classList.remove("otherclass");
    } else {
        d3.select(".discription").transition().style("opacity",1)
        d3.select("#clear_data").transition().style("opacity",1)
        var d = document.getElementById("page1text1");
        d.classList.add("otherclass");
        if (img2_animation === true) {
            img2_animation = false
            d3.select("#window2").remove()
            d3.select("#windowcenter2").remove()
            d3.select("#tooltipimg2").remove()
            addwindow = 0
            img2_centeroid_x = -100
            img2_centeroid_y = 100
        }
    }
}

function transitionTextElements() {
    const elements = [
        { id: 'page1text1', triggerPoint: 280 - 550 },
        { id: 'page1text2', triggerPoint: 300 - 550 },
        { id: 'page1text3', triggerPoint: 320 - 550 },
        { id: 'page1text4', triggerPoint: 340 - 550 },
        { id: 'page1text5', triggerPoint: 360 - 550 },
        { id: 'page1text6', triggerPoint: 380 - 550 },
    ];

    elements.forEach(element => {
        const textElement = document.getElementById(element.id);
        if (lastKnownScrollPosition > element.triggerPoint) {
            textElement.style.opacity = 1;
            textElement.style.transform = 'translateX(0px)'; // Move into view
        } else {
            textElement.style.opacity = 0;
            textElement.style.transform = 'translateX(-100px)'; // Move out of view
        }
    });
}

let frame2 = d3.select("#img2").append("rect").attr("id","background2").attr("height",600).attr("width",1200)
.attr("fill","rgb(255,255,255)").attr("opacity",0).attr("pointer-events", "none")
d3.select("#img2-1").append("text").attr("id","discriptiontext3").attr("x",0).attr("y",300).text("woc").attr("pointer-events", "none")
let frame2_1 = d3.select("#img2-1").append("rect").attr("id","background2-1").attr("height",600).attr("width",1200)
.attr("fill","rgb(255,255,255)").attr("opacity",0).on('mousemove', function(event) {
        colorscale = d3.scaleLinear([0, 0.8,1], ["lightblue", "lightblue","orange"])
        const [x, y] = d3.pointer(event); 
        d3.select("#discriptiontext3").text(`x : ${x - 300} \n y: ${300 - parseInt(y)}`).raise().transition().attr("x",x).attr("y",y)
        d3.select("#img2-1").selectAll(".img2_1_data").transition().attr("fill",function(d){
            console.log(parseInt(d.x)+" "+parseInt(x))
            return colorscale(-(((300 + parseInt(d.x) - parseInt(x))**2 + (-300 + parseInt(d.y) + parseInt(y))**2)/(400**2)) + 1.8)

        })
        .attr("opacity",function(d){
            console.log(parseInt(d.x)+" "+parseInt(x))
            return 0.5

        })
  })

function transition_page2() {
    if (lastKnownScrollPosition > 200) {
        d3.select("#background2").transition().delay(30).attr("opacity",(lastKnownScrollPosition-200)/300)
        d3.select("#window2").transition().attr("opacity",(lastKnownScrollPosition-200)/600)
        d3.select("#windowcenter2").transition().attr("opacity",(lastKnownScrollPosition-200)/600)
        d3.select("#tooltipimg2").transition().attr("opacity",(lastKnownScrollPosition-200)/600)
        d3.select("#img2").selectAll(".gridline2").transition().attr("opacity",(lastKnownScrollPosition-200)/600)
        d3.select("#img2").selectAll(".img2data").transition().attr("opacity",(lastKnownScrollPosition-200)/600)
        d3.select("#background2-1").transition().delay(30).attr("opacity",(lastKnownScrollPosition-600)/600)
        if (lastKnownScrollPosition > 500) {
            if( hasgrindline2 === false){
                drawGridLines();
                hasgrindline2 = true;
            }
            if (lastKnownScrollPosition > 550) {
                if (lastKnownScrollPosition < 700){
                    initialize_animation()
                    mean_shift_visualization()
                }
            }else {
                if (img2_animation === true) {
                    img2_animation = false
                    d3.select("#window2").remove()
                    d3.select("#windowcenter2").remove()
                    d3.select("#tooltipimg2").remove()
                    addwindow = 0
                    img2_centeroid_x = -100
                    img2_centeroid_y = 100
                    centeroid_x_list = [-100]
                    centeroid_y_list = [100]
                }
            }
    }
    if (lastKnownScrollPosition > 1250) {
        if (trace_add === false){
            initialize_trace()
            trace_add = true
        }
        
    }
    }
}
let svgWidth = 1200;
const svgHeight = 600;
const gridUnit = 50;
graph2 = d3.select("#img2")
function drawGridLines() {
    // Draw vertical grid lines
    for (let x = 0; x <= svgWidth; x += gridUnit) {
        graph2.append("line").attr("class","gridline2")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", 0)
            .attr("y2", svgHeight)
            .attr("stroke", "#e0e0e0")  // Light grey color for the grid lines
            .attr("stroke-width", "1")
    }

    // Draw horizontal grid lines
    for (let y = 0; y <= svgHeight; y += gridUnit) {
        graph2.append("line").attr("class","gridline2")
            .attr("y1", y)
            .attr("y2", y)
            .attr("x1", 0)
            .attr("x2", svgWidth)
            .attr("stroke", "#e0e0e0")  // Light grey color for the grid lines
            .attr("stroke-width", "1")
    }
}
graph2_1 = d3.select("#img2-1")
function drawGridLines2_1() {
    // Draw vertical grid lines
    for (let x = 0; x <= svgWidth; x += gridUnit) {
        graph2_1.append("line").attr("class","gridline2-1")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", 0)
            .attr("y2", svgHeight)
            .attr("stroke", "#e0e0e0")  // Light grey color for the grid lines
            .attr("stroke-width", "1")
    }

    // Draw horizontal grid lines
    for (let y = 0; y <= svgHeight; y += gridUnit) {
        graph2_1.append("line").attr("class","gridline2-1")
            .attr("y1", y)
            .attr("y2", y)
            .attr("x1", 0)
            .attr("x2", svgWidth)
            .attr("stroke", "#e0e0e0")  // Light grey color for the grid lines
            .attr("stroke-width", "1")
    }
}
drawGridLines2_1()
graph3 = d3.select("#img3")
function drawGridLines3() {
    // Draw vertical grid lines
    for (let x = 0; x <= svgWidth; x += gridUnit) {
        graph3.append("line").attr("class","gridline3")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", 0)
            .attr("y2", svgHeight)
            .attr("stroke", "#e0e0e0")  // Light grey color for the grid lines
            .attr("stroke-width", "1")
    }

    // Draw horizontal grid lines
    for (let y = 0; y <= svgHeight; y += gridUnit) {
        graph3.append("line").attr("class","gridline3")
            .attr("y1", y)
            .attr("y2", y)
            .attr("x1", 0)
            .attr("x2", svgWidth)
            .attr("stroke", "#e0e0e0")  // Light grey color for the grid lines
            .attr("stroke-width", "1")
    }
}

drawGridLines3()


// Call function to draw grid lines





















