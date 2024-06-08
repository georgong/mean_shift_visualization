
let resolve_time = 80
d3.select("#img5").append("image").attr("xlink:href","assets/Img15_-1.jpg")
.attr("height",405).attr("weight",405).on("mouseover",async function(){
    for(let i = 0; i<=10;i++){
    d3.select(this).attr("xlink:href","assets/Img15_"+ i + ".jpg")
    await new Promise(resolve => setTimeout(resolve, resolve_time));
    }
}).on("mouseout",async function(){
    for(let i = 10; i>=-1;i--){
    d3.select(this).attr("xlink:href","assets/Img15_"+ i + ".jpg")
    await new Promise(resolve => setTimeout(resolve, resolve_time));
    }
   
})

d3.select("#img6").append("image").attr("xlink:href","assets/Img18_-1.jpg")
.attr("height",200).attr("weight",200).on("mouseover",async function(){
    for(let i = 0; i<=10;i++){
    d3.select(this).attr("xlink:href","assets/Img18_"+ i + ".jpg")
    await new Promise(resolve => setTimeout(resolve, resolve_time));
    }
}).on("mouseout",async function(){
    for(let i = 10; i>=-1;i--){
        d3.select(this).attr("xlink:href","assets/Img18_"+ i + ".jpg")
        await new Promise(resolve => setTimeout(resolve, resolve_time));
        }
})

d3.select("#img7").append("image").attr("xlink:href","assets/Img13_-1.jpg")
.attr("height",200).attr("weight",200).on("mouseover",async function(){
    for(let i = 0; i<=10;i++){
    d3.select(this).attr("xlink:href","assets/Img13_"+ i + ".jpg")
    await new Promise(resolve => setTimeout(resolve, resolve_time));
    }
}).on("mouseout",async function(){
    for(let i = 10; i>=-1;i--){
        d3.select(this).attr("xlink:href","assets/Img13_"+ i + ".jpg")
        await new Promise(resolve => setTimeout(resolve, resolve_time));
        }
})

d3.select("#img8").append("image").attr("xlink:href","assets/Img29_-1.jpg")
.attr("height",210).attr("weight",210).on("mouseover",async function(){
    for(let i = 0; i<=10;i++){
    d3.select(this).attr("xlink:href","assets/Img29_"+ i + ".jpg")
    await new Promise(resolve => setTimeout(resolve, resolve_time));
    }
}).on("mouseout",async function(){
    for(let i = 10; i>=-1;i--){
        d3.select(this).attr("xlink:href","assets/Img29_"+ i + ".jpg")
        await new Promise(resolve => setTimeout(resolve, resolve_time));
        }
})

d3.select("#img9").append("image").attr("xlink:href","assets/Img1_-1.jpg")
.attr("height",210).attr("weight",210).on("mouseover",async function(){
    for(let i = 0; i<=10;i++){
    d3.select(this).attr("xlink:href","assets/Img1_"+ i + ".jpg")
    await new Promise(resolve => setTimeout(resolve, resolve_time));
    }
}).on("mouseout",async function(){
    for(let i = 10; i>=-1;i--){
        d3.select(this).attr("xlink:href","assets/Img1_"+ i + ".jpg")
        await new Promise(resolve => setTimeout(resolve, resolve_time));
        }
})

d3.select("#img10").append("image").attr("xlink:href","assets/Img11_-1.jpg")
.attr("height",410).attr("weight",410).on("mouseover",async function(){
    for(let i = 0; i<=10;i++){
    d3.select(this).attr("xlink:href","assets/Img11_"+ i + ".jpg")
    await new Promise(resolve => setTimeout(resolve, resolve_time));
    }
}).on("mouseout",async function(){
    for(let i = 10; i>=-1;i--){
        d3.select(this).attr("xlink:href","assets/Img11_"+ i + ".jpg")
        await new Promise(resolve => setTimeout(resolve, resolve_time));
        }
})



