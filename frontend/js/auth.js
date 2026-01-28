const API = "http://localhost:4000";

async function register(){
  const name = document.getElementById("name")?.value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/api/auth/register`,{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  alert(data.msg || "Registered");
  if(res.ok) location.href="login.html";
}

async function login(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/api/auth/login`,{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if(data.token){
    localStorage.setItem("token", data.token);
    location.href="feed.html";
  }else{
    alert(data.msg);
  }
}
