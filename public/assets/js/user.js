var displayDiv = document.getElementById("displayDiv");
const currentDate = new Date();
const options = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'Africa/Nouakchott',

};
var formattedDate = currentDate.toLocaleDateString('en-US', options);
var today=new Date(Date.parse(formattedDate));

// const lastDuration= lastDuration.trim();
if(today.getTime() == lastDuration.getTime()){
  displayDiv.innerHTML = '<div class="container mx-auto my-auto" style="width: 50%; height: 50%;"><div class="card"><div class="card-body"><img src="assets/images/users/deadline.png" alt="deadline"></div></div></div>';

}
else if(today.getTime()< lastDuration.getTime()){
 displayDiv.style.display="block"
}
else{
  displayDiv.innerHTML = '<div class="container mx-auto my-auto" style="width: 50%; height: 50%;"><div class="card"><div class="card-body"><img src="assets/images/users/deadline.png" alt="deadline"></div></div></div>';
}