
// GET REQUEST
function getTodos() {

  // axios({
  //   method:'get',
  //   url:'https://jsonplaceholder.typicode.com/todos',
  //   params:{_limit:10},
  // })
  // .then((m)=>showOutput(m))
  // .catch((m)=>console.log(m))

  axios('https://jsonplaceholder.typicode.com/todos',{params:{_limit:5}})
  .then((m)=>showOutput(m))
  .catch((m)=>console.log(m))

  
}

// POST REQUEST
function addTodo() {
  // axios({
  //   method:'post',
  //   url:'https://jsonplaceholder.typicode.com/todos',
  //   data:{
  //     title:"This is Mr. Lucifer",
  //     completed:false,
  //   }
  // })
  axios.post('https://jsonplaceholder.typicode.com/todos',{title:'This is Lucifer',completed:false})
  .then((m)=>showOutput(m))
  .catch((m)=>console.log(m))
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios.patch('https://jsonplaceholder.typicode.com/todos/1',{title:'This is Lucifer',completed:false})
  .then((m)=>showOutput(m))
  .catch((m)=>console.log(m))
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
  .then((m)=>showOutput(m))
  .catch((m)=>console.log(m))
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios('https://jsonplaceholder.typicode.com/todos',{params:{_limit:5}}),
    axios.post('https://jsonplaceholder.typicode.com/todos',{title:'This is Lucifer',completed:false})
  ])
  .then(axios.spread((get,post)=>{
    console.log(get);
    console.log(post)
  }))
  // .then((values)=>{
  //   console.log(values[0])
  //   console.log(values[1])
  //   showOutput(values[0])
  // })
}

// CUSTOM HEADERS
function customHeaders() {
  config={
    headers:{
      'Content-Type':'application/json',
      Authorization:'Some kind of token'
    }
  }
  axios.post('https://jsonplaceholder.typicode.com/todos',{title:'This is Lucifer',completed:false},config)
  .then((m)=>showOutput(m))
  .catch((m)=>console.log(m))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
   const options={
    method:'post',
    url:'https://jsonplaceholder.typicode.com/todos',
    data:{
      title:'Hello There'
    },
    transformResponse:axios.defaults.transformResponse.concat(data=>{
      data.title=data.title.toUpperCase();
      return data
    })
   }

   axios(options).then(data=>showOutput(data))
}

// ERROR HANDLING
function errorHandling() {
  axios('https://jsonplaceholder.typicode.com/todoss',{params:{_limit:5}})
  .then((m)=>showOutput(m))
  .catch((error)=>{
    console.log(error)
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)

    if(error.response.status==404){
      alert("Page not found")
    }
  })
}

// CANCEL TOKEN
function cancelToken() {
  const source=axios.CancelToken.source();
  axios.get('https://jsonplaceholder.typicode.com/todos',
  {cancelToken:source.token})
  .then((m)=>showOutput(m))
  .catch((error)=>{
    if(axios.isCancel(error)){
      console.log("Request canceled")
    }
  })

  if(true){
    source.cancel("Request Canceled");
  }
}

// INTERCEPTING REQUESTS & RESPONSES

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
