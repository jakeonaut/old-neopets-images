oldNeopetsChrome.OldSidebar = () => {
  document.querySelector("#ban").style.display = "none";
  const headerNew = document.createElement("div");
  headerNew.id = "header_new";
  const headerNewImage = document.createElement("img");
  // TODO(jaketrower): set by theme
  headerNewImage.src = "http://images.neopets.com/t/hdr.gif";
  headerNew.appendChild(headerNewImage);
  
  const header = document.querySelector("#header");
  header.style.display = "none";
  $(headerNew).insertBefore(header);
  
  const sidebar = document.querySelector(".sidebar");
  sidebar.setAttribute("width", "128");
  sidebar.style.paddingTop = "0";
  sidebar.style.backgroundColor = "#ffd026";
  sidebar.style.borderRight = "2px solid black";
  
  const sidenav = document.createElement("div");
  const sidenavImage = document.createElement("img");
  // TODO(jaketrower): set by theme
  sidenavImage.src = "http://images.neopets.com/t/m5.gif";
  sidenav.appendChild(sidenavImage);
  
  $(sidenav).insertBefore($(document.querySelector(".sidebarModule")));
  
  const sidebarModules = Array.from(document.querySelectorAll(".sidebarModule"));
  sidebarModules[0].style.display = "none";
  sidebarModules[1].style.display = "none";
  sidebarModules[2].style.display = "none";
  // sidebarModules[4].style.display = "none";
  
  // sidebarModules[3].style.border = "none";
  // TODO(jaketrower): a little flaky possibly.. but what isn't on this website.
  // sidebarModules[3].childNodes[0].setAttribute("width", 128);
  // sidebarModules[3].childNodes[0].style.border = "none";
  
  // TODO(jaketrower): Can I edit css directly?
  // Array.from(document.querySelectorAll(".sidebarHeader")).forEach((x) => { 
    // x.style.border = "none"; 
    // x.style.fontWeight = "normal";
  // });
  // Array.from(document.querySelectorAl(".neofriend")).forEach((x) => {
    // x.style.backgroundColor = "inherit";
  // });
}