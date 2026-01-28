const API = "http://localhost:4000";
const token = localStorage.getItem("token");

if(!token){
  location.href="login.html";
}

async function loadFeed(){
  const res = await fetch(`${API}/api/posts`,{
    headers:{ Authorization: token }
  });

  const posts = await res.json();
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach(p=>{
    feed.innerHTML += `
      <div class="post">
        <b>${p.userId.name}</b><br>
        ${p.content}<br>
        ❤️ ${p.likes.length}
        <button onclick="likePost('${p._id}')">Like</button>
      </div>
    `;
  });
}

async function createPost(){
  const content = document.getElementById("content").value;

  await fetch(`${API}/api/posts`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization: token
    },
    body: JSON.stringify({ content })
  });

  document.getElementById("content").value="";
  loadFeed();
}

async function likePost(id){
  await fetch(`${API}/api/posts/like/${id}`,{
    method:"PUT",
    headers:{ Authorization: token }
  });
  loadFeed();
}

loadFeed();
