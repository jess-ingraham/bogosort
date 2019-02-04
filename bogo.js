document.addEventListener("DOMContentLoaded", function(){
    
    //get the description element and unhide it when the i is clicked
    document.querySelector("#info-open").addEventListener("click", function(){
        document.querySelector("div.desc").classList.remove("hidden");
    });
    
    document.querySelector("#info-close").addEventListener("click", function(){
        document.querySelector("div.desc").classList.add("hidden");
    });
    
    //on the button click begin the function
    document.querySelector("#go").addEventListener("click", run);
    
    
});


function run(){
    
    clear_output_field(); //remove any error messages or previous runs
    
    let values = document.querySelector("#user-input").value.split(" ");
    
    if(!verify_numbers(values)){
        //if not every input is a number, tell the user to try again
        
        add_text_to_document("Opps, some of the list aren't numbers. Check the input and try again.");
    }
    
    else if (sorted(values)){
        add_text_to_document("This list is already sorted. Try rearranging the numbers.");
    }
    else{        
        
        document.querySelector("#go").disabled = true;
        
        let isSorted = false;
        let shuffled, color, interval, permutations=1;
        
        
        //if the stop button is pressed, stop the algorithm
        document.querySelector("#stop").addEventListener("click", function(){
            clearInterval(interval);
            document.querySelector("#go").disabled = false;
        });
                
        interval = setInterval(function(){
            //every second the array should be shuffled and check to see if the array is sorted, then add the text to the document
            
            //if the array is sorted, we clear the interval
            
            values = shuffle(values);
            isSorted = sorted(values);
            color = isSorted ? "green" : "red";
            
            //console.log(values, isSorted, color);
            
            if (isSorted){
                clearInterval(interval);
                add_text_to_document(values.join(", "), color);
                add_text_to_document(`Bogosort found the correct order in ${permutations} tries`)
                document.querySelector("#go").disabled = false;
            }
            
            else{
                add_text_to_document(values.join(", "), color);
                permutations++;
            }
            
        }, 500);
        
           
    }

}
            
function shuffle(values){
    let count = values.length;
    let temp, index;

    while(count > 0){
        
        index = Math.floor(Math.random() * count);
        count--;

        //swap the two elements
        temp = values[count];
        values[count] = values[index];
        values[index] = temp;
    }

    return values;
}

function sorted(values){
    
    //check whether the list is sorted or not
    for (let i = 0; i < values.length; i++){
        if (parseFloat(values[i]) > parseFloat(values[i+1])){
            return false;
        }
    }
    
    return true;
}

function verify_numbers(values){
    
    //find any values in the array that are not numbers, return false if they are not numbers
    for (i in values){   
        
        if (isNaN(values[i])){
            return false;
        }
    }
    return true
}



function add_text_to_document(text, color="black", scrolled){
    //add a 
    
    const pNode = document.createElement("p");
    
    pNode.appendChild(document.createTextNode(text));
    pNode.classList.add(color);
    
    let output = document.querySelector(".output")
    
    output.appendChild(pNode);
    
    
    //updateScroll(output, scrolled);
}

function updateScroll(div, scrolled){
    
    if(!scrolled){
        div.scrollTop = div.scrollHeight;
    }
}

function clear_output_field(){
    //remove anything from the output div
    document.querySelector(".output").innerHTML = "";
}

