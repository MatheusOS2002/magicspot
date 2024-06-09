function hideHeader() {
    div_header.style.display = "none";
    span_arrow_down.style.display = "block";
    div_content.style.height = "100%";
}

function showHeader() {
    div_header.style.display = "flex";
    span_arrow_down.style.display = "none";
    div_content.style.height = "90%";
}