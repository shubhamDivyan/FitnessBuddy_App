document.addEventListener("DOMContentLoaded", () => {
  // Navbar icon
  const menuIcon = document.getElementById("menuIcon");
  const navLinks = document.getElementById("navLinks");
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  if (menuIcon) {
    menuIcon.addEventListener("click", () => {
      console.log("Menu clicked");
      navLinks.classList.toggle("show");
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }
  
  // evern listern in sing button

  // const signInBtn=document.getElementById("sing");
  // signInBtn.addEventListener("click",()=>{
  //   window.location.href="signIn.html"
  // })
  // // Sign In page JS
  // const submitBtn = document.getElementById("signup");

  // if (submitBtn) {
  //   submitBtn.addEventListener("click", (e) => {
  //     e.preventDefault(); // prevent form from submitting

  //     const name = document.getElementById("User-Name").value;
  //     const email = document.getElementById("signup-email").value;
  //     const password = document.getElementById("signup-password").value;

  //     console.log("Name:", name);
  //     console.log("Email:", email);
  //     console.log("Password:", password);
  //   });
  // }
});


//BMI Calculator
let workouts = [];

function calculateBMIs() {
  const height = parseFloat(document.getElementById("height").value) / 100;
  const weight = parseFloat(document.getElementById("weight").value);
  const targetBMI = parseFloat(document.getElementById("targetBMI").value);

  if (!height || !weight || !targetBMI) {
    document.getElementById("bmiOutput").textContent = "Please enter all fields.";
    return;
  }

  const currentBMI = weight / (height * height);
  document.getElementById("bmiOutput").textContent =
    `Your current BMI is ${currentBMI.toFixed(2)}. Target BMI: ${targetBMI}`;

  updateProgress(currentBMI, targetBMI, weight, height);
}

function logWorkout() {
  const type = document.getElementById("workoutType").value;
  const duration = parseFloat(document.getElementById("duration").value);

  if (!duration || duration <= 0) {
    document.getElementById("workoutResult").textContent = "Please enter valid duration.";
    return;
  }

  const caloriesBurned = calculateCalories(type, duration);

  workouts.push({ type, duration, caloriesBurned });
  displayWorkouts();
  updateProgress();
}

function calculateCalories(type, duration) {
  const caloriesPerMin = {
    running: 10,
    cycling: 8,
    swimming: 11,
    walking: 4,
  };
  return caloriesPerMin[type] * duration;
}

function displayWorkouts() {
  const tbody = document.getElementById("workoutTableBody");
  tbody.innerHTML = "";

  workouts.forEach((w) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${w.type}</td><td>${w.duration} min</td><td>${w.caloriesBurned} kcal</td>`;
    tbody.appendChild(row);
  });

  const totalCalories = workouts.reduce((sum, w) => sum + w.caloriesBurned, 0);
  document.getElementById("workoutResult").textContent =
    `Total Calories Burned: ${totalCalories.toFixed(0)} kcal`;
}

function updateProgress(currentBMI = null, targetBMI = null, weight = null, height = null) {
  const totalCalories = workouts.reduce((sum, w) => sum + w.caloriesBurned, 0);
  const caloriesPerKg = 7700;
  const weightLoss = totalCalories / caloriesPerKg;

  const heightInput = parseFloat(document.getElementById("height").value) / 100;
  const currentWeight = parseFloat(document.getElementById("weight").value);
  const targetBmi = parseFloat(document.getElementById("targetBMI").value);

  if (!heightInput || !currentWeight || !targetBmi) {
    document.getElementById("progressReport").textContent = "Enter BMI values to track progress.";
    return;
  }

  const targetWeight = targetBmi * (heightInput * heightInput);
  const remainingWeight = currentWeight - weightLoss - targetWeight;
  const daysEstimate = Math.ceil((remainingWeight * caloriesPerKg) / (totalCalories / workouts.length || 1));

  let progressMessage = `You’ve lost approx <b>${weightLoss.toFixed(2)} kg</b> through workouts.<br>`;
  progressMessage += `Your target weight is <b>${targetWeight.toFixed(2)} kg</b>. You are approx <b>${remainingWeight.toFixed(2)} kg</b> away.<br>`;
  if (remainingWeight > 0) {
    progressMessage += `At this rate, you’ll reach your target in approx <b>${daysEstimate} days</b>.`;
  } else {
    progressMessage += `<b>Congratulations! You've likely hit your BMI goal.</b>`;
  }

  document.getElementById("progressReport").innerHTML = progressMessage;
}


//GYM Location finder
 function displayGyms(data) {
        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";

        if (!data.elements.length) {
          resultsDiv.innerHTML = "<p>No gyms found.</p>";
          return;
        }

        data.elements.forEach((gym) => {
          const name = gym.tags?.name || "Unnamed Gym";
          const address =
            gym.tags?.["addr:street"] ||
            gym.tags?.["addr:full"] ||
            gym.tags?.["addr:city"] ||
            "Address not available";
          const lat = gym.lat || gym.center?.lat;
          const lon = gym.lon || gym.center?.lon;
          const directionLink = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;

          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <h3>${name}</h3>
            <p><strong>Address:</strong> ${address}</p>
            <a href="${directionLink}" target="_blank">Get Directions</a>
          `;
          resultsDiv.appendChild(card);
        });
      }

      async function queryGyms(lat, lon) {
        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "<p>Loading gyms...</p>";

        const overpassQuery = `
          [out:json];
          (
            node["leisure"="fitness_centre"](around:5000,${lat},${lon});
            way["leisure"="fitness_centre"](around:5000,${lat},${lon});
            relation["leisure"="fitness_centre"](around:5000,${lat},${lon});
          );
          out center;
        `;

        try {
          const res = await fetch("https://overpass-api.de/api/interpreter", {
            method: "POST",
            body: overpassQuery,
          });
          const data = await res.json();
          displayGyms(data);
        } catch (err) {
          console.error(err);
          resultsDiv.innerHTML = "<p>Error fetching gym data. Please try again later.</p>";
        }
      }

      async function findGymsByLocation() {
        const input = document.getElementById("locationInput").value.trim();
        const resultsDiv = document.getElementById("results");

        if (!input) {
          alert("Please enter a city or postal code.");
          return;
        }

        resultsDiv.innerHTML = "<p>Finding location...</p>";

        try {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${input}`
          );
          const geoData = await geoRes.json();

          if (!geoData.length) {
            resultsDiv.innerHTML = "<p>Location not found.</p>";
            return;
          }

          const { lat, lon } = geoData[0];
          queryGyms(lat, lon);
        } catch (err) {
          console.error(err);
          resultsDiv.innerHTML = "<p>Error finding location. Try again later.</p>";
        }
      }

      function findGymsNearMe() {
        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "<p>Getting your location...</p>";

        if (!navigator.geolocation) {
          resultsDiv.innerHTML = "<p>Geolocation is not supported by your browser.</p>";
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            queryGyms(latitude, longitude);
          },
          (error) => {
            console.error(error);
            resultsDiv.innerHTML =
              "<p>Could not get your location. Make sure location access is enabled.</p>";
          }
        );
}


//Social Media page
// social-script.js

// Submit user post
// social-script.js

// DOM Elements
const postFeed = document.getElementById("postFeed");
const trainerList = document.getElementById("trainerList");
const gymPartnerList = document.getElementById("gymPartnerList");
const notificationContainer = document.getElementById("notificationContainer");

// Utility: Show Notification
function showNotification(message, type = "success") {
  const container = document.getElementById("notificationContainer");
  container.textContent = message;
  container.style.backgroundColor = type === "success" ? "#4caf50" : "#f44336";
  container.style.display = "block";

  setTimeout(() => {
    container.style.display = "none";
  }, 3000);
}


// Submit a Post
function submitPost() {
  const content = document.getElementById("postContent").value;
  if (!content.trim()) {
    showNotification("Post cannot be empty!", "error");
    return;
  }
  const div = document.createElement("div");
  div.className = "post-card";
  div.innerHTML = `<p>${content}</p><small>Just now</small>`;
  postFeed.prepend(div);
  document.getElementById("postContent").value = "";
  showNotification("Post shared successfully!", "success");
}

// Submit Trainer Profile
function submitTrainerProfile() {
  const name = document.getElementById("trainerName").value;
  const speciality = document.getElementById("speciality").value;
  const experience = document.getElementById("experience").value;
  const bio = document.getElementById("bio").value;

  if (!name || !speciality || !experience || !bio) {
    showNotification("Please fill in all trainer fields.", "error");
    return;
  }

  const card = document.createElement("div");
  card.className = "trainer-card";
  card.innerHTML = `
    <h4>${name}</h4>
    <p><strong>Speciality:</strong> ${speciality}</p>
    <p><strong>Experience:</strong> ${experience} years</p>
    <p>${bio}</p>
    <button onclick="messageTrainer('${name}')">Message</button>
  `;

  trainerList.appendChild(card);

  document.getElementById("trainerName").value = "";
  document.getElementById("speciality").value = "";
  document.getElementById("experience").value = "";
  document.getElementById("bio").value = "";

  showNotification("Trainer profile created!", "success");
}

// Message Trainer
function messageTrainer(name) {
  showNotification(`Messaging ${name} feature coming soon...`, "info");
}

// Find Gym Partner
function findGymPartner() {
  gymPartnerList.innerHTML = "";
  const mockPartners = [
    { name: "Amit Singh", goal: "Muscle Gain" },
    { name: "Pooja Verma", goal: "Weight Loss" },
  ];

  mockPartners.forEach((partner) => {
    const div = document.createElement("div");
    div.className = "partner-card";
    div.innerHTML = `
      <h4>${partner.name}</h4>
      <p>Goal: ${partner.goal}</p>
      <button onclick="messagePartner('${partner.name}')">Message</button>
    `;
    gymPartnerList.appendChild(div);
  });

  showNotification("Nearby partners loaded.", "success");
}

// Message Partner
function messagePartner(name) {
  showNotification(`Messaging ${name} feature coming soon...`, "info");
}


// HOME page js

document.querySelector('.member-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const successDiv = document.getElementById('successMessage');
  successDiv.style.display = 'block';

  // Hide after 4 seconds
  setTimeout(() => {
    successDiv.style.display = 'none';
  }, 4000);

  this.reset(); // Clear form
});
