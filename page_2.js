
let addwindow = 0
let array = generateGaussianData([800, 100], [300, 200], 40);
console.log(array);
let img2_centeroid_x = -100
let img2_centeroid_y = 100
let img2_animation = false
let centeroid_x_list = [-100]
let centeroid_y_list = [100]

function initialize_animation() {
    img2 = d3.select("#img2")
    if( addwindow === 0) {
    img2.append("g").append("circle").attr("id","window2")
    .attr("cx", 300+img2_centeroid_x)
    .attr("cy", 300-img2_centeroid_y)
    .attr("r", 600)
    .attr("fill","rgb(222, 242, 249)")
    .attr("opacity",0.5)
    img2.append("circle").attr("id","windowcenter2")
    .attr("cx", 300+img2_centeroid_x)
    .attr("cy", 300-img2_centeroid_y)
    .attr("r", 20)
    .attr("fill","red")
    .attr("opacity", 1).raise()
    addwindow = 1
    img2.append("g").attr("id","data2").selectAll("circle").data(array).join("circle").attr("class","img2data")
    .attr("cx",function(d,i){return 300 + d.x})
    .attr("cy",function(d,i){return 300 - d.y})
    .attr("r",4)
    initializeTooltip();
    img2.append("g").append("text").attr("x",50).attr("y",500).attr("font-size",25)
    .text("During the mean shift process,")
    img2.append("text").attr("x",0).attr("y",540).attr("font-size",25)
    .text("The window shift towards the center of data utimately")
    }
}

function initializeTooltip() {
    const svg = d3.select("#img2");  // Ensure this is your correct SVG selector
    svg.append("g").append("text")
       .attr("id", "tooltipimg2")
       .attr("x", 10)  // Padding from the left edge
       .attr("y", 20)  // Padding from the top edge
       .attr("font-family", "sans-serif")
       .attr("font-size", "16px")
       .attr("fill", "black")
       .text("Initializing...")
       
}


async function mean_shift_visualization() {
    if (!img2_animation) {
        img2_animation = true;  // To prevent overlapping executions

        for (let i = 0; i < 3; i++) {
            let data_within_window = array.filter(d => 
                ((d.x - img2_centeroid_x) ** 2 + (d.y - img2_centeroid_y) ** 2) <= 360000
            );

            let new_centeroid_x = d3.mean(data_within_window, d => d.x);
            let new_centeroid_y = d3.mean(data_within_window, d => d.y);
            centeroid_x_list.push(new_centeroid_x)
            centeroid_y_list.push(new_centeroid_y)
            updateTooltip(i, img2_centeroid_x, img2_centeroid_y, new_centeroid_x, new_centeroid_y);

            if (new_centeroid_x && new_centeroid_y) {  // Check for valid centroids
                console.log(new_centeroid_x, new_centeroid_y);
                await move_window(data_within_window, new_centeroid_x, new_centeroid_y);
                img2_centeroid_x = new_centeroid_x;
                img2_centeroid_y = new_centeroid_y;
            } else {
                console.log("No valid new centroids found. Using previous centroids.");
            }

            await new Promise(resolve => setTimeout(resolve, 2000));  // Delay for visualization
        }

        img2_animation = false;  // Reset animation lock
    }
}

function updateTooltip(epoch, oldX, oldY, newX, newY) {
    let tooltip = d3.select("#tooltipimg2");
    tooltip.raise();
    tooltip.text(`Epoch: ${epoch + 1}, Old: (${oldX.toFixed(2)}, ${oldY.toFixed(2)}), New: (${newX.toFixed(2)}, ${newY.toFixed(2)})`);
}



async function move_window(data_within_window, new_centeroid_x, new_centeroid_y) {
    for (let i = 0; i < data_within_window.length; i++) {
        d3.select("#img2").append("circle")
            .attr("class", "contour")
            .attr("cx", 300 + parseInt(data_within_window[i].x))
            .attr("cy", 300 - parseInt(data_within_window[i].y))
            .attr("r", 20)
            .attr("fill", "red")
            .attr("opacity", 0.2)
            .transition().duration(1000)
            .attr("cx", 300 + new_centeroid_x)
            .attr("cy", 300 - new_centeroid_y)
            .transition().duration(500)
            .attr("opacity", 0)
            .remove();
    }

    return new Promise(resolve => {
        // Delay to allow circle transitions to complete
        setTimeout(() => {
            d3.select("#window2").transition().duration(600)
                .attr("cx", 300 + parseInt(new_centeroid_x))
                .attr("cy", 300 - parseInt(new_centeroid_y));

            d3.select("#windowcenter2").transition().duration(600)
                .attr("cx", 300 + parseInt(new_centeroid_x))
                .attr("cy", 300 - parseInt(new_centeroid_y))
                .on("end", () => {
                    resolve({new_centeroid_x, new_centeroid_y});
                });
        }, 1500); // Wait for the last circle to start fading before starting the window transition
    });
}



function generateGaussianData(mean, sigma, count) {
    // Create random number generators for x and y coordinates
    const randomX = d3.randomNormal(mean[0], sigma[0]);
    const randomY = d3.randomNormal(mean[1], sigma[1]);

    let data = [];

    // Generate data points
    for (let i = 0; i < count; i++) {
        let x, y;
        // Ensure the generated x is within the range [-600, 600]
        do {
            x = randomX();
        } while (x < -600 || x > 800);

        // Ensure the generated y is within the range [-300, 300]
        do {
            y = randomY();
        } while (y < -300 || y > 300);

        // Append the generated point to the data array
        data.push({ x: x, y: y });
    }

    return data;
}

// Example usage: Generate 100 points with mean [0, 0] and sigma [100, 50]


