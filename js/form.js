var form=function(e){"use strict";return e.useForm=()=>{document.getElementById("form");const e=document.getElementById("form-button"),t=document.querySelector(".reveal-overlay"),n=document.getElementById("name"),o=document.getElementById("phone"),d=document.getElementById("html"),l={};document.addEventListener("click",m=>{l.fullName=n.value,l.phone=o.value,m.target==e&&""!=l.fullName&&""!=l.phone&&(m.preventDefault(),t.style.display="none",d.classList.remove("zf-has-scroll","is-reveal-open"),(e=>{const t=document.createElement("div"),n=document.createElement("h2");n.innerText=`Спасибо, ${e}, мы скоро с вами свяжемся!`,t.classList.add("modal","animate__animated","animate__backInUp"),n.classList.add("modal__text"),t.appendChild(n),document.body.appendChild(t),t.style.bottom="0px",setTimeout(()=>{document.body.removeChild(t)},4e3)})(l.fullName),fetch("send.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:JSON.stringify(l)}).catch(e=>console.error(e)))})},e}({});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZXMiOlsic3JjL2pzL2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBjb25zdCB1c2VGb3JtID0gKCkgPT4ge1xuICBjb25zdCAkZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybVwiKTtcbiAgY29uc3QgJGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybS1idXR0b25cIik7XG4gIGNvbnN0ICRvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXZlYWwtb3ZlcmxheVwiKTtcbiAgY29uc3QgJG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hbWVcIik7XG4gIGNvbnN0ICRwaG9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGhvbmVcIik7XG4gIGNvbnN0ICRodG1sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJodG1sXCIpO1xuXG4gIGNvbnN0IGZvcm1fRGF0YSA9IHt9O1xuXG4gIGNvbnN0IHNob3dUaGFua3MgPSAobmFtZSkgPT4ge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHRleHQuaW5uZXJUZXh0ID0gYNCh0L/QsNGB0LjQsdC+LCAke25hbWV9LCDQvNGLINGB0LrQvtGA0L4g0YEg0LLQsNC80Lgg0YHQstGP0LbQtdC80YHRjyFgO1xuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJtb2RhbFwiLCBcImFuaW1hdGVfX2FuaW1hdGVkXCIsIFwiYW5pbWF0ZV9fYmFja0luVXBcIik7XG4gICAgdGV4dC5jbGFzc0xpc3QuYWRkKFwibW9kYWxfX3RleHRcIik7XG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RhbCk7XG4gICAgbW9kYWwuc3R5bGUuYm90dG9tID0gYDBweGA7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobW9kYWwpO1xuICAgIH0sIDQwMDApO1xuICB9O1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBmb3JtX0RhdGEuZnVsbE5hbWUgPSAkbmFtZS52YWx1ZTtcbiAgICBmb3JtX0RhdGEucGhvbmUgPSAkcGhvbmUudmFsdWU7XG4gICAgaWYgKFxuICAgICAgZXZlbnQudGFyZ2V0ID09ICRidXR0b24gJiZcbiAgICAgIGZvcm1fRGF0YS5mdWxsTmFtZSAhPSBcIlwiICYmXG4gICAgICBmb3JtX0RhdGEucGhvbmUgIT0gXCJcIlxuICAgICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICRodG1sLmNsYXNzTGlzdC5yZW1vdmUoXCJ6Zi1oYXMtc2Nyb2xsXCIsIFwiaXMtcmV2ZWFsLW9wZW5cIik7XG4gICAgICBzaG93VGhhbmtzKGZvcm1fRGF0YS5mdWxsTmFtZSk7XG4gICAgICBmZXRjaChcInNlbmQucGhwXCIsIHtcbiAgICAgICAgLy8g0YTQsNC50Lst0L7QsdGA0LDQsdC+0YLRh9C40LpcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsIC8vINC+0YLQv9GA0LDQstC70Y/QtdC80YvQtSDQtNCw0L3QvdGL0LVcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZm9ybV9EYXRhKSxcbiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xuICAgIH1cbiAgfSk7XG59O1xuIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCIkYnV0dG9uIiwiJG92ZXJsYXkiLCJxdWVyeVNlbGVjdG9yIiwiJG5hbWUiLCIkcGhvbmUiLCIkaHRtbCIsImZvcm1fRGF0YSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImZ1bGxOYW1lIiwidmFsdWUiLCJwaG9uZSIsInRhcmdldCIsInByZXZlbnREZWZhdWx0Iiwic3R5bGUiLCJkaXNwbGF5IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwibmFtZSIsIm1vZGFsIiwiY3JlYXRlRWxlbWVudCIsInRleHQiLCJpbm5lclRleHQiLCJhZGQiLCJhcHBlbmRDaGlsZCIsImJvZHkiLCJib3R0b20iLCJzZXRUaW1lb3V0IiwicmVtb3ZlQ2hpbGQiLCJzaG93VGhhbmtzIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiSlNPTiIsInN0cmluZ2lmeSIsImNhdGNoIiwiZXJyb3IiLCJjb25zb2xlIl0sIm1hcHBpbmdzIjoibURBRXVCLEtBQ1BBLFNBQVNDLGVBQWUsY0FDaENDLEVBQVVGLFNBQVNDLGVBQWUsZUFDbENFLEVBQVdILFNBQVNJLGNBQWMsbUJBQ2xDQyxFQUFRTCxTQUFTQyxlQUFlLFFBQ2hDSyxFQUFTTixTQUFTQyxlQUFlLFNBQ2pDTSxFQUFRUCxTQUFTQyxlQUFlLFFBRWhDTyxFQUFZLEdBaUJsQlIsU0FBU1MsaUJBQWlCLFFBQVVDLElBQ2xDRixFQUFVRyxTQUFXTixFQUFNTyxNQUMzQkosRUFBVUssTUFBUVAsRUFBT00sTUFFdkJGLEVBQU1JLFFBQVVaLEdBQ00sSUFBdEJNLEVBQVVHLFVBQ1MsSUFBbkJILEVBQVVLLFFBRVZILEVBQU1LLGlCQUNOWixFQUFTYSxNQUFNQyxRQUFVLE9BQ3pCVixFQUFNVyxVQUFVQyxPQUFPLGdCQUFpQixrQkF6QnhCQyxDQUFBQSxVQUNaQyxFQUFRckIsU0FBU3NCLGNBQWMsT0FDL0JDLEVBQU92QixTQUFTc0IsY0FBYyxNQUNwQ0MsRUFBS0MsVUFBYSxZQUFXSiwrQkFDN0JDLEVBQU1ILFVBQVVPLElBQUksUUFBUyxvQkFBcUIscUJBQ2xERixFQUFLTCxVQUFVTyxJQUFJLGVBQ25CSixFQUFNSyxZQUFZSCxHQUNsQnZCLFNBQVMyQixLQUFLRCxZQUFZTCxHQUMxQkEsRUFBTUwsTUFBTVksT0FBVSxNQUV0QkMsV0FBVyxLQUNUN0IsU0FBUzJCLEtBQUtHLFlBQVlULElBQ3pCLE1BY0RVLENBQVd2QixFQUFVRyxVQUNyQnFCLE1BQU0sV0FBWSxDQUVoQkMsT0FBUSxPQUNSQyxRQUFTLGdCQUNTLHFDQUVsQlAsS0FBTVEsS0FBS0MsVUFBVTVCLEtBQ3BCNkIsTUFBT0MsR0FBVUMsUUFBUUQsTUFBTUEifQ==
