const img = document.getElementById("bear-photo");
console.dir(img);
const inputs = document.getElementsByTagName("input");
for (let input of inputs) {
  console.dir(input);
}
const arr = [...inputs];
console.log(arr);

const listItems = document.getElementsByClassName("special");
console.dir(listItems);

console.dir(document.querySelector("#bear-photo"));

const nodes = document.querySelectorAll(".special");
for (let node of nodes) {
  console.dir(node);
}

const nodesArr = [...nodes];
console.log(nodesArr);

const password = document.querySelector('input[type="password"]');
console.dir(password);

document.body.innerHTML;
const range = document.querySelector('input[type="range"]');

nodes.forEach(element => console.log(element));

const todos = document.querySelectorAll(".todo");
{
    {
      {
        {
          
        }
      }
    }
  }